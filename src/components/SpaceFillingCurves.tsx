import { createSignal, onCleanup, onMount, untrack } from "solid-js";
import Two from "two.js";

import { ActionButton } from "@components/ActionButton";
import { Slider } from "@components/Slider";

const ITER_MAX = 6;
const START_RULESET = "Hilbert";

type RuleSet = {
  /** The starting string axiom */
  axiom: string;
  /** The L-System rules */
  rules: Record<string, string>;
  /** The optional command definitions */
  defs?: { draw?: string[]; move?: string[] };
  /** The turning angle in degrees */
  angle: number;
  /** Whether the curve is closed or not */
  closed?: boolean;
  /** The initial heading in degrees */
  heading?: number;
  /** The maximum number of iterations */
  iterMax: number;
  /** The starting position */
  pos?: { x?: number; y?: number };
  /** The scaling factor for each iteration */
  scaleFactor?: (i: number) => number;
};

const RULESETS: Record<string, RuleSet> = {
  Dragon: {
    axiom: "FX",
    rules: {
      F: "F+G",
      G: "F-G",
    },
    defs: { draw: ["F", "G"] },
    angle: 90,
    iterMax: 13,
    pos: {
      x: 1 / 2,
      y: 1 / 3,
    },
    scaleFactor: () => 60,
  },
  Gosper: {
    axiom: "A",
    rules: {
      A: "A-B--B+A++AA+B-",
      B: "+A-BB--B-A++A+B",
    },
    defs: { draw: ["A", "B"] },
    angle: 60,
    iterMax: 6,
    pos: {
      x: 1 / 2,
      y: 2 / 3,
    },
    scaleFactor: (i) => 2 * 3 ** i,
  },
  Hilbert: {
    axiom: "X",
    rules: {
      X: "+YF-XFX-FY+",
      Y: "-XF+YFY+FX-",
    },
    angle: 90,
    iterMax: 8,
    scaleFactor: (i) => 2 ** i - 1,
  },
  "Kit Wallace": {
    // https://x.com/kitwallace/status/1190917301010391045
    axiom: "F--XF--F--XF",
    rules: { X: "XF+F+XF--F--XF+F+X" },
    angle: 45,
    closed: true,
    iterMax: 8,
    pos: {
      x: 0.49,
      y: 0.99,
    },
    scaleFactor: (i) => 4 * 2 ** i - 1,
  },
  "Koch Snowflake": {
    axiom: "F",
    rules: { F: "F-F++F-F" },
    angle: 60,
    iterMax: 8,
    scaleFactor: (i) => 3 * 3 ** (i - 1),
    pos: { y: 2 / 3 },
  },
  "Koch Island": {
    axiom: "F-F-F-F",
    rules: { F: "F+F-F-FF+F+F-F" },
    angle: 90,
    closed: true,
    iterMax: 6,
    pos: { y: 1 / 2 },
    scaleFactor: (i) => 3 ** i,
  },
  "Koch Quadratic": {
    axiom: "F",
    rules: { F: "F-F+F+F-F" },
    angle: 90,
    iterMax: 8,
    pos: { y: 2 / 3 },
    scaleFactor: (i) => 3 * 3 ** (i - 1),
  },
  Levy: {
    axiom: "F",
    rules: { F: "+F--F+" },
    angle: 45,
    iterMax: 10,
    // scaleFactor: (i) => (Math.pow(2, Math.floor((i + 1) / 2) + 1) - 2) * Math.pow(Math.SQRT2, i % 2),
    pos: {
      x: 1 / 3,
      y: 1 / 2,
    },
    scaleFactor: (i) => i ** 2,
  },
  "Peano Basic": {
    axiom: "F",
    rules: { F: "F+F-F-F-F+F+F+F-F" },
    angle: 90,
    iterMax: 5,
    pos: { y: 1 / 2 },
    scaleFactor: (i) => 3 ** i,
  },
  Peano: {
    axiom: "X",
    rules: {
      X: "XFYFX+F+YFXFY-F-XFYFX",
      Y: "YFXFY-F-XFYFX+F+YFXFY",
    },
    angle: 90,
    heading: 0,
    iterMax: 5,
    scaleFactor: (i) => 3 ** i - 1,
  },
  "Sierpinski Triangle": {
    axiom: "F-G-G",
    rules: {
      F: "F-G+F+G-F",
      G: "GG",
    },
    defs: { draw: ["F", "G"] },
    angle: 120,
    closed: true,
    heading: 0,
    iterMax: 8,
    pos: { y: 0.9 },
    scaleFactor: (i) => 2 ** i,
  },
  "Sierpinski Arrowhead": {
    axiom: "A",
    rules: {
      A: "B-A-B",
      B: "A+B+A",
    },
    defs: { draw: ["A", "B"] },
    angle: 60,
    heading: 0,
    iterMax: 10,
    pos: {
      x: 1 / 4,
      y: 1 / 2,
    },
    scaleFactor: (i) => 2 * 2 ** i,
  },
};

class LSystem {
  two: Two;
  ruleset: RuleSet;
  angle: number;
  lineWidth: number;
  strokeStyle: string;
  curved: boolean;
  x: number;
  y: number;

  constructor(
    {
      two,
      ruleset = RULESETS[START_RULESET],
      lineWidth = 1,
      strokeStyle = "currentcolor",
    }: {
      two: Two;
      ruleset?: RuleSet;
      lineWidth?: number;
      strokeStyle?: string;
    } = { two: new Two() },
  ) {
    this.two = two;
    this.ruleset = ruleset;
    this.angle = (this.ruleset.heading || 0) * (Math.PI / 180);
    this.lineWidth = lineWidth;
    this.strokeStyle = strokeStyle;
    this.curved = false;
    this.x = (this.ruleset.pos?.x || 0) * this.two.width + lineWidth / 2;
    this.y = (this.ruleset.pos?.y || 0) * this.two.height + lineWidth / 2;
  }

  setRuleset(ruleset: RuleSet) {
    this.ruleset = ruleset;
    this.angle = (this.ruleset.heading || 0) * (Math.PI / 180);
    this.x = (this.ruleset.pos?.x || 0) * this.two.width + this.lineWidth / 2;
    this.y =
      (this.ruleset.pos?.y || 0) * this.two.height + this.lineWidth / 2;
  }

  setLineWidth(lineWidth: number) {
    this.lineWidth = lineWidth;
  }

  setCurved(curved: boolean) {
    this.curved = curved;
  }

  reset() {
    this.x = (this.ruleset.pos?.x || 0) * this.two.width + this.lineWidth / 2;
    this.y =
      (this.ruleset.pos?.y || 0) * this.two.height + this.lineWidth / 2;
    this.angle = (this.ruleset.heading || 0) * (Math.PI / 180);
  }

  rewrite(iter: number) {
    let str = this.ruleset.axiom;
    for (
      let i = 0;
      i < Math.min(this.ruleset.iterMax || ITER_MAX, iter);
      i++
    ) {
      let tmp = "";
      for (const ch of [...str]) {
        const rule = this.ruleset.rules[ch];
        if (rule) {
          tmp += rule;
        } else {
          tmp += ch;
        }
      }
      str = tmp;
    }
    return str;
  }

  execute(iterations: number) {
    this.two.clear();

    let points = [];

    for (const c of this.rewrite(iterations)) {
      const draw = this.ruleset.defs?.draw || ["F"];
      const move = this.ruleset.defs?.move || ["M"];

      if (draw.includes(c)) {
        if (points.length === 0) {
          points.push(this.firstPoint());
        }
        points.push(this.nextPoint(iterations));
      } else if (move.includes(c)) {
        this.move(iterations);
        this.renderPath(points);
        points = [];
      } else if (c === "+") {
        this.turn(this.ruleset.angle * (Math.PI / 180));
      } else if (c === "-") {
        this.turn(-this.ruleset.angle * (Math.PI / 180));
      }
    }

    if (points.length > 1) {
      this.renderPath(points);
    }
    this.two.update();
  }

  renderPath(points: any[]) {
    const path = new Two.Path(points, false);
    path.stroke = "var(--stroke)";
    path.fill = "transparent";
    path.linewidth = this.lineWidth;
    path.cap = "round";
    path.join = "round";
    path.curved = this.curved;
    path.closed = !!this.ruleset.closed;
    this.two.add(path);
  }

  firstPoint() {
    return new Two.Anchor(this.x, this.y);
  }

  nextPoint(iterations: number) {
    const factor = this.ruleset.scaleFactor?.(iterations) || iterations;
    const domain =
      Math.min(this.two.width, this.two.height) - this.lineWidth - 2;
    const x = this.x + (Math.cos(this.angle) * domain) / factor;
    const y = this.y + (Math.sin(this.angle) * domain) / factor;
    const a = new Two.Anchor(x, y);
    this.x = x;
    this.y = y;
    return a;
  }

  move(iterations: number) {
    const factor = this.ruleset.scaleFactor?.(iterations) || iterations;
    const domain =
      Math.min(this.two.width, this.two.height) - this.lineWidth - 2;
    const x = this.x + (Math.cos(this.angle) * domain) / factor;
    const y = this.y + (Math.sin(this.angle) * domain) / factor;
    this.x = x;
    this.y = y;
  }

  turn(angle: number) {
    this.angle = this.angle + (angle % (2 * Math.PI));
  }
}


export function SpaceFillingCurves() {
  const [iterations, setIterations] = createSignal(4);
  const [maxIterations, setMaxIterations] = createSignal(
    RULESETS[START_RULESET].iterMax || ITER_MAX
  );
  const [lineWidth, setLineWidth] = createSignal(3);
  const [strokeStyle, setStrokeStyle] = createSignal("currentcolor");
  const [fillStyle, setFillStyle] = createSignal("transparent");
  const [smoothing, setSmoothing] = createSignal(false);
  const [curve, setRuleset] = createSignal(RULESETS[START_RULESET]);
  const [speed, setSpeed] = createSignal(10);
  const [easing, setEasing] = createSignal("ease-in-out");

  let svgRef: SVGSVGElement | undefined;
  let lsystem: LSystem;

  onMount(() => {
    svgRef = document.getElementById("twosvg") as unknown as SVGSVGElement;
    svgRef!.addEventListener("click", () => walkSVGPaths(svgRef!));

    lsystem = new LSystem({
      two: new Two({
        type: Two.Types.svg,
        domElement: svgRef,
        width: 600,
        height: 600,
        autostart: false
      }),
      ruleset: untrack(() => curve()),
      strokeStyle: untrack(() => strokeStyle()),
      lineWidth: untrack(() => lineWidth()),
    });

    function handleKeyPress(e: KeyboardEvent) {
      if (e.key === "x") {
        const sm = !smoothing();
        setSmoothing(sm);
        lsystem.setCurved(sm);
        lsystem.reset();
        lsystem.execute(iterations());
      }
      if (e.key === " ") {
        e.preventDefault();
        walkSVGPaths(svgRef!);
      }
    }

    window.addEventListener("keypress", handleKeyPress);
    lsystem.execute(iterations());

    onCleanup(() => {
      window.removeEventListener("keypress", handleKeyPress);
    });
  });

  function randomizeColor() {
    function byteStr() {
      return Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, "0");
    }
    const fill = `#${byteStr()}${byteStr()}${byteStr()}`;
    const stroke = `#${byteStr()}${byteStr()}${byteStr()}`;
    document.documentElement.style.setProperty("--stroke", stroke);
    document.documentElement.style.setProperty("--fill", fill);
    setStrokeStyle(stroke);
    setFillStyle(fill);
  }

  function walkSVGPaths(svg: SVGSVGElement) {
    svg.querySelectorAll("path").forEach((path) => {
      const length = path.getTotalLength();
      path.style.transition = `stroke-dashoffset ${Math.floor(length) / speed()}ms ${easing()}`;

      if (path.dataset.walked !== "true") {
        path.style.strokeDasharray = `${length}`;
        path.style.strokeDashoffset = `${length}`;
        path.dataset.walked = "true";
      } else {
        path.style.strokeDashoffset = "0";
        path.dataset.walked = "false";
      }
    });
  }

  return (
    <>
      <div style={{ background: "var(--fill)" }} class="self-start relative z-10">
        <svg
          id="twosvg"
          width="600"
          height="600"
          class="stroke-primary border border-dashed relative z-10"
          onClick={(e) => walkSVGPaths(e.target as SVGSVGElement)}
        />
      </div>
      <ul>
        <li>
          <small>Press <kbd>space</kbd> to play animation forward/reverse</small>
        </li>
        <li>
          <small>Press <kbd>r</kbd> to randomize colors</small>
        </li>
        <li>
          <small>Press <kbd>x</kbd> to toggle smoothing</small>
        </li>
      </ul>
      <hr />
      <div class="grid grid-cols-[18ch_48ch] items-start gap-4">
        {/* RULESET */}
        <label for="ruleset" class="uppercase">Ruleset</label>
        <select id="ruleset" onChange={(e) => {
          const curve = RULESETS[e.target.value];
          setRuleset(curve);
          setMaxIterations(curve.iterMax || ITER_MAX);
          if (iterations() > maxIterations()) {
            setIterations(curve.iterMax || ITER_MAX);
          }

          lsystem.setRuleset(curve);
          lsystem.execute(iterations());

        }}>
          {Object.keys(RULESETS).map((key) => (
            <option value={key} selected={key === START_RULESET}>{key}</option>
          ))}
        </select>
        {/* ITERATIONS */}
        <Slider
          label="Iterations"
          id="iterations"
          min={1}
          max={maxIterations()}
          onInput={(val) => {
            setIterations(val);
            lsystem.reset();
            lsystem.execute(val);
          }}
          defaultValue={3}
          class="contents"
        />
        {/* SMOOTHING */}
        <label for="smoothing" class="uppercase">Smoothing</label>
        <input type="checkbox" id="smoothing" checked={smoothing()} onChange={(e) => {
          const sm = (e.target as HTMLInputElement).checked;
          setSmoothing(sm);
          lsystem.setCurved(sm);
          lsystem.reset();
          lsystem.execute(iterations());
        }} />
        {/* STROKE WIDTH */}
        <Slider
          label="Stroke width"
          id="linewidth"
          min={1}
          max={20}
          defaultValue={lineWidth()}
          onInput={(val) => {
            setLineWidth(val);
            document.documentElement.style.setProperty(
              "--stroke-width",
              `${val}`,
            );
            lsystem.setLineWidth(val);
            lsystem.reset();
            lsystem.execute(iterations());
          }}
          class="contents"
        />
        {/* STROKE COLOR */}
        <label for="strokestyle" class="uppercase">Stroke color</label>
        <input type="color" id="strokestyle" value={strokeStyle()} onInput={(e) => {
          const color = (e.target as HTMLInputElement).value;
          setStrokeStyle(color);
          document.documentElement.style.setProperty("--stroke", color);
        }} />
        {/* FILL COLOR */}
        <label for="fillstyle" class="uppercase">Fill color</label>
        <input type="color" id="fillstyle" value={fillStyle()} onInput={(e) => {
          const color = (e.target as HTMLInputElement).value;
          setFillStyle(color);
          document.documentElement.style.setProperty("--fill", color);
        }} />
        {/* ANIMATION FUNCTION */}
        <label for="easing" class="uppercase">Animation function</label>
        <select id="easing" onChange={(e) => setEasing((e.target as HTMLSelectElement).value)}>
          <option value="linear">linear</option>
          <option value="ease">ease</option>
          <option value="ease-in">ease-in</option>
          <option value="ease-out">ease-out</option>
          <option selected value="ease-in-out">ease-in-out</option>
          <option value="step-start">step</option>
        </select>
        {/* ANIMATION SPEED */}
        <Slider
          label="Animation Speed"
          id="speed"
          min={1}
          max={100}
          defaultValue={speed()}
          onChange={(val) => setSpeed(val)}
          class="contents"
        />
        {/* ACTIONS */}
        <ActionButton id="copybtn" label="Copy SVG" action={() => {
          navigator.clipboard.writeText(svgRef!.outerHTML).then(() => {
          });
        }} />
        <ActionButton id="savebtn" label="Save SVG" action={() => {
          const rule = (document.getElementById("ruleset") as HTMLSelectElement).value;
          const filename = rule + "-" + iterations() + ".svg";
          const blob = new Blob([svgRef!.outerHTML], { type: "image/svg+xml" });
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = filename;
          link.click();
        }} />
        <ActionButton key="r" label="Randomize" action={randomizeColor} />
      </div>
    </>
  );
}
