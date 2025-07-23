import { onMount, createEffect } from "solid-js";

import { Slider } from "@components/Slider";
import { useStateParam } from "@utils/state";

const INITIAL_FOURIER_TERMS = 4;
const INITIAL_PERIOD = 10;
const INITIAL_COLOR_PERIOD = 1;
const INITIAL_SEED = 35;

export default function LoopsExperiment() {
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  const [fourierTerms, setFourierTerms] = useStateParam<number>("terms", INITIAL_FOURIER_TERMS);
  const [period, setPeriod] = useStateParam<number>("p", INITIAL_PERIOD);
  const [colorPeriod, setColorPeriod] = useStateParam<number>("cp", INITIAL_COLOR_PERIOD);
  const [seed, setSeed] = useStateParam<number>("seed", INITIAL_SEED);

  function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  function loopingRandomWalk(t: number, period: number, seed = 0) {
    let x = 0, y = 0;

    for (let i = 1; i <= fourierTerms(); i++) {
      const freq = (2 * Math.PI * i) / period;
      const phaseX = (Math.sin(seed * i * 1.3) * 2 * Math.PI) % (2 * Math.PI);
      const phaseY = (Math.cos(seed * i * 1.7) * 2 * Math.PI) % (2 * Math.PI);
      x += Math.sin(freq * t + phaseX) / i;
      y += Math.cos(freq * t + phaseY) / i;
    }
    return [x, y];
  }


  onMount(() => {
    ctx = canvas.getContext("2d")!;
    clear();
  });

  createEffect((cleanup: (() => void) | null) => {
    cleanup?.();
    clear();

    let raf: number;

    (function draw() {
      // ctx.fillStyle = "rgba(255, 255, 255, 0.01)";
      // ctx.fillRect(0, 0, canvas.width, canvas.height);
      const [x, y] = loopingRandomWalk(Date.now() / 1000, period(), seed());
      const [r, c] = loopingRandomWalk(Date.now() / 1000, period(), seed() + 1);
      const [g, b] = loopingRandomWalk(
        Date.now() / 1000,
        period() / colorPeriod(),
        seed() + 2,
      );

      try {
        const xPixel = ((x * 0.5 + 1) * canvas.width) / 2;
        const yPixel = ((y * 0.5 + 1) * canvas.height) / 2;

        ctx.beginPath();
        ctx.arc(xPixel, yPixel, (r + 2.5) * 16, 0, 2 * Math.PI);
        // ctx.rect(xPixel, yPixel, (r + 2.5) * 20, (r + 2.5) * 20);
        ctx.fillStyle = `rgb(${Math.floor((c + 1) * 256)} ${Math.floor((g + 1) * 256)} ${Math.floor((b + 1) * 256)})`;
        ctx.fill();

        // ctx.stroke();

        raf = requestAnimationFrame(draw);
      } catch (e) {
        console.error(e, {
          fourierTerms: fourierTerms(),
          period: period(),
          seed: seed(),
          colorPeriod: colorPeriod(),
          x,
          y,
          r,
          c,
          g,
          b,
        });
      }
    })();

    return () => cancelAnimationFrame(raf);
  }, null);

  return (
    <>
      <div id="container" class="relative">
        <canvas class="bg-experiment outline outline-1 outline-primary outline-dashed relative z-10" ref={(el) => canvas = el} id="canvas" width="600" height="600"></canvas>
        <div
          id="layer"
          class="absolute inset-0 opacity-60 bg-[20px 20px] mix-blend-multiply"
        >
        </div>
        <svg
          class="absolute inset-0 opacity-40 z-20"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 700 700"
          width="600"
          height="600"
        >
          <defs>
            <linearGradient
              gradientTransform="rotate(-156, 0.5, 0.5)"
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="gggrain-gradient2"
            >
              <stop
                stop-color="hsla(193, 87%, 52%, 1.00)"
                stop-opacity="1"
                offset="-0%"></stop>
              <stop
                stop-color="rgba(255,255,255,0)"
                stop-opacity="0"
                offset="100%"></stop>
            </linearGradient>
            <linearGradient
              gradientTransform="rotate(156, 0.5, 0.5)"
              x1="50%"
              y1="0%"
              x2="50%"
              y2="100%"
              id="gggrain-gradient3"
            >
              <stop stop-color="hsl(39, 92%, 54%)" stop-opacity="1"></stop>
              <stop
                stop-color="rgba(255,255,255,0)"
                stop-opacity="0"
                offset="100%"></stop>
            </linearGradient>
            <filter
              id="gggrain-filter"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              filterUnits="objectBoundingBox"
              primitiveUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.44"
                numOctaves="3"
                seed="0"
                stitchTiles="stitch"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                result="turbulence">
                <animate attributeName="seed"
                  values="0;1;2;3;4;5;6;7;8;9"
                  dur="200ms"
                  repeatCount="indefinite"
                  calcMode="discrete" />
              </feTurbulence>
              <feColorMatrix
                type="saturate"
                values="0"
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                in="turbulence"
                result="colormatrix"></feColorMatrix>
              <feComponentTransfer
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                in="colormatrix"
                result="componentTransfer"
              >
                <feFuncR type="linear" slope="3"></feFuncR>
                <feFuncG type="linear" slope="3"></feFuncG>
                <feFuncB type="linear" slope="3"></feFuncB>
              </feComponentTransfer>
              <feColorMatrix
                x="0%"
                y="0%"
                width="100%"
                height="100%"
                in="componentTransfer"
                result="colormatrix2"
                type="matrix"
                values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 22 -14"
              ></feColorMatrix>
            </filter>
          </defs>
          <g>
            <rect width="100%" height="100%" fill="hsl(321, 63%, 53%)"></rect>
            <rect width="100%" height="100%" fill="url(#gggrain-gradient3)"
            ></rect>
            <rect width="100%" height="100%" fill="url(#gggrain-gradient2)"
            ></rect>
            <rect
              width="100%"
              height="100%"
              fill="transparent"
              filter="url(#gggrain-filter)"
              opacity="1"
              style="mix-blend-mode: overlay"></rect>
          </g>
        </svg>
      </div>
      <div class="space-y-4 mt-4">
        <Slider
          id="fourier"
          label="Fourier terms"
          min={1} max={20}
          state={[fourierTerms, setFourierTerms]}
          onChange={setFourierTerms}
          class="grid grid-cols-[18ch_48ch] gap-2"
        />
        <Slider
          id="period"
          label="Period"
          min={1} max={100}
          state={[period, setPeriod]}
          onChange={setPeriod}
          class="grid grid-cols-[18ch_48ch] gap-2"
        />
        <Slider
          id="color"
          label="Color period"
          min={0.1} max={4} step={0.01}
          state={[colorPeriod, setColorPeriod]}
          onChange={setColorPeriod}
          class="grid grid-cols-[18ch_48ch] gap-2"
        />
        <Slider
          id="seed"
          label="Seed"
          min={0} max={100}
          step={1}
          state={[seed, setSeed]}
          onChange={setSeed}
          class="grid grid-cols-[18ch_48ch] gap-2"
        />
      </div>
    </>
  );
}
