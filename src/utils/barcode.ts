import {
  NumberSet,
  AuxiliaryCharacter,
  EAN13EncodingPatterns,
  type DecimalDigit,
} from "./numbersets";

export interface Renderable {
  renderToCanvas(
    canvas: HTMLCanvasElement | OffscreenCanvas | string,
    opts?: RenderOptions,
  ): void;
}

export interface RenderOptions {
  /** Scale factor for rendering */
  scale?: number | "auto";
  /** Whether to render human-readable interpretation */
  withHRI?: boolean;
  /** Whether to render the quiet zone (default `true`) */
  withQuietZone?: boolean;
}

export const DEFAULT_RENDER_OPTIONS = {
  scale: 3,
  withHRI: false,
  withQuietZone: false,
} satisfies RenderOptions;

function numberAsDecimalPlaces(
  data: number,
  places: number,
  pad: number = 0,
): DecimalDigit[] {
  let str = data.toString(10).padStart(places, pad.toString(10));
  return [...str].map((ch) => parseInt(ch, 10) as DecimalDigit);
}

export class UPCA implements Renderable {
  #chars: DecimalDigit[];

  static VALUE_WIDTH = NumberSet.A.width;
  static QUIET_ZONE_LEFT_WIDTH = 9;
  static QUIET_ZONE_RIGHT_WIDTH = 9;
  static TOTAL_WIDTH =
    UPCA.QUIET_ZONE_LEFT_WIDTH +
    AuxiliaryCharacter.NormalGuardBar.width +
    6 * UPCA.VALUE_WIDTH +
    AuxiliaryCharacter.CentreGuardBar.width +
    6 * UPCA.VALUE_WIDTH +
    AuxiliaryCharacter.NormalGuardBar.width +
    UPCA.QUIET_ZONE_RIGHT_WIDTH;

  constructor(data: number | number[]) {
    // If data is number, convert to decimal places
    if (typeof data === "number") {
      if (data < 0) throw new Error("data must be positive");
      this.#chars = numberAsDecimalPlaces(data, 11);
    }
    // If data is array, validate and use directly
    else if (Array.isArray(data)) {
      if (data.length !== 11)
        throw new Error("data must be an array of 11 numbers");
      if (!data.every((n) => Number.isInteger(n) && n >= 0 && n <= 9))
        throw new Error("data must be an array of 11 numbers between 0 and 9");
      this.#chars = data as DecimalDigit[];
    } else {
      throw new Error("data must be a number or an array of numbers");
    }
  }

  renderToCanvas(
    canvas: HTMLCanvasElement | OffscreenCanvas | string,
    opts: RenderOptions = {},
  ) {
    const { scale, withHRI, withQuietZone } = {
      ...DEFAULT_RENDER_OPTIONS,
      ...opts,
    };
    const ctx =
      typeof canvas === "string"
        ? (
            document.querySelector(canvas) as HTMLCanvasElement | null
          )?.getContext?.("2d")
        : canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");
    ctx.fillStyle = "currentcolor";

    const height = ctx.canvas.height;
    const modules = withQuietZone
      ? UPCA.TOTAL_WIDTH
      : UPCA.TOTAL_WIDTH -
        UPCA.QUIET_ZONE_LEFT_WIDTH -
        UPCA.QUIET_ZONE_RIGHT_WIDTH;
    const moduleWidth =
      scale === "auto" ? Math.floor(ctx.canvas.width / modules) : scale;

    let x = withQuietZone ? UPCA.QUIET_ZONE_LEFT_WIDTH * moduleWidth : 0;
    const drawBit = (bit: number, width: number, isGuard: boolean = false) => {
      if (bit) {
        const barHeight =
          !withHRI || isGuard ? height : Math.trunc(height * 0.85);
        ctx.fillRect(x, 0, width * moduleWidth, barHeight);
      }
      x += width * moduleWidth;
    };

    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw left guard bar
    for (let i = AuxiliaryCharacter.NormalGuardBar.width - 1; i >= 0; i--) {
      drawBit((AuxiliaryCharacter.NormalGuardBar.LEFT >> i) & 1, 1, true);
    }

    // Draw left 6 digits using NumberSet A
    for (let i = 0; i < 6; i++) {
      let num = this.#chars[i];
      let pattern = NumberSet.A[num];
      for (let j = NumberSet.A.width - 1; j >= 0; j--) {
        drawBit((pattern >> j) & 1, 1, i === 0);
      }
    }

    // Draw center guard bar
    for (let i = AuxiliaryCharacter.CentreGuardBar.width - 1; i >= 0; i--) {
      drawBit((AuxiliaryCharacter.CentreGuardBar.CENTRE >> i) & 1, 1, true);
    }

    // Draw right 5 digits using NumberSet C
    for (let i = 6; i < 11; i++) {
      let num = this.#chars[i];
      let pattern = NumberSet.C[num];
      for (let j = NumberSet.C.width - 1; j >= 0; j--) {
        drawBit((pattern >> j) & 1, 1);
      }
    }

    // Calculate and draw checksum digit using NumberSet C
    const checksum = ((10 -
      (this.#chars
        .map((d, i) => d * (i % 2 === 0 ? 3 : 1))
        .reduce((a, b) => a + b, 0) %
        10)) %
      10) as DecimalDigit;
    let pattern = NumberSet.C[checksum];
    for (let j = NumberSet.C.width - 1; j >= 0; j--) {
      drawBit((pattern >> j) & 1, 1, true);
    }

    // Draw right guard bar
    for (let i = AuxiliaryCharacter.NormalGuardBar.width - 1; i >= 0; i--) {
      drawBit((AuxiliaryCharacter.NormalGuardBar.RIGHT >> i) & 1, 1, true);
    }

    // Optionally, draw the human-readable text below the barcode
    if (withHRI) {
      ctx.font = `${Math.trunc(height * 0.15)}px sans-serif`;
      ctx.textRendering = "geometricPrecision";
      ctx.fillText(
        this.#chars.join("") + checksum.toString(),
        (AuxiliaryCharacter.NormalGuardBar.width +
          NumberSet.A.width +
          (withQuietZone ? UPCA.QUIET_ZONE_LEFT_WIDTH : 0)) *
          moduleWidth,
        height - 1,
      );
    }
  }
}

export class EAN13 implements Renderable {
  #chars: DecimalDigit[];

  static VALUE_WIDTH = NumberSet.A.width;
  static QUIET_ZONE_LEFT_WIDTH = 11;
  static QUIET_ZONE_RIGHT_WIDTH = 7;
  static TOTAL_WIDTH =
    EAN13.QUIET_ZONE_LEFT_WIDTH +
    AuxiliaryCharacter.NormalGuardBar.width +
    6 * EAN13.VALUE_WIDTH +
    AuxiliaryCharacter.CentreGuardBar.width +
    6 * EAN13.VALUE_WIDTH +
    AuxiliaryCharacter.NormalGuardBar.width +
    EAN13.QUIET_ZONE_RIGHT_WIDTH;

  constructor(data: number | number[]) {
    // If data is number, convert to decimal places
    if (typeof data === "number") {
      if (data < 0) throw new Error("data must be positive");
      this.#chars = numberAsDecimalPlaces(data, 12);
    }
    // If data is array, validate and use directly
    else if (Array.isArray(data)) {
      if (data.length !== 12)
        throw new Error("data must be an array of 12 numbers");
      if (!data.every((n) => Number.isInteger(n) && n >= 0 && n <= 9))
        throw new Error("data must be an array of 12 numbers between 0 and 9");
      this.#chars = data as DecimalDigit[];
    } else {
      throw new Error("data must be a number or an array of numbers");
    }
  }

  renderToCanvas(
    canvas: HTMLCanvasElement | OffscreenCanvas | string,
    opts: RenderOptions = {},
  ) {
    const { scale, withHRI, withQuietZone } = {
      ...DEFAULT_RENDER_OPTIONS,
      ...opts,
    };
    const ctx =
      typeof canvas === "string"
        ? (
            document.querySelector(canvas) as HTMLCanvasElement | null
          )?.getContext?.("2d")
        : canvas.getContext("2d");
    if (!ctx) throw new Error("Could not get canvas context");
    ctx.fillStyle = "currentcolor";

    const height = ctx.canvas.height;
    const modules = withQuietZone
      ? EAN13.TOTAL_WIDTH
      : EAN13.TOTAL_WIDTH -
        EAN13.QUIET_ZONE_LEFT_WIDTH -
        EAN13.QUIET_ZONE_RIGHT_WIDTH;
    const moduleWidth =
      scale === "auto" ? Math.floor(ctx.canvas.width / modules) : scale;

    let x = withQuietZone ? EAN13.QUIET_ZONE_LEFT_WIDTH * moduleWidth : 0;
    const drawBit = (bit: number, width: number, isGuard: boolean = false) => {
      if (bit) {
        const barHeight =
          !withHRI || isGuard ? height : Math.trunc(height * 0.85);
        ctx.fillRect(x, 0, width * moduleWidth, barHeight);
      }
      x += width * moduleWidth;
    };

    // Clear canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Draw left guard bar
    for (let i = AuxiliaryCharacter.NormalGuardBar.width - 1; i >= 0; i--) {
      drawBit((AuxiliaryCharacter.NormalGuardBar.LEFT >> i) & 1, 1, true);
    }

    // Determine the encoding pattern for the first digit
    const firstDigit = this.#chars[0];
    const encodingPattern = EAN13EncodingPatterns[firstDigit];
    if (!encodingPattern)
      throw new Error("Invalid first digit for EAN-13 encoding");
    // Draw left 6 digits using NumberSet A or B based on encoding pattern
    // Skip the first digit as it's represented by the encoding pattern
    // i.e., this.#chars[0] is not drawn here
    for (let i = 1; i < 7; i++) {
      let num = this.#chars[i];
      let pattern: number;
      if (encodingPattern[i - 1] === "A") {
        pattern = NumberSet.A[num];
      } else {
        pattern = NumberSet.B[num];
      }
      for (let j = NumberSet.A.width - 1; j >= 0; j--) {
        drawBit((pattern >> j) & 1, 1);
      }
    }

    // Draw center guard bar
    // Note: EAN-13 uses the same center guard as UPC-A
    for (let i = AuxiliaryCharacter.CentreGuardBar.width - 1; i >= 0; i--) {
      drawBit((AuxiliaryCharacter.CentreGuardBar.CENTRE >> i) & 1, 1, true);
    }

    // Draw right 5 digits using NumberSet C
    for (let i = 7; i < 12; i++) {
      let num = this.#chars[i];
      let pattern = NumberSet.C[num];
      for (let j = NumberSet.C.width - 1; j >= 0; j--) {
        drawBit((pattern >> j) & 1, 1);
      }
    }

    // Calculate and draw checksum digit using NumberSet C
    const checksum = ((10 -
      (this.#chars
        .map((d, i) => d * (i % 2 === 0 ? 1 : 3))
        .reduce((a, b) => a + b, 0) %
        10)) %
      10) as DecimalDigit;
    let pattern = NumberSet.C[checksum];
    for (let j = NumberSet.C.width - 1; j >= 0; j--) {
      drawBit((pattern >> j) & 1, 1);
    }

    // Draw right guard bar
    for (let i = AuxiliaryCharacter.NormalGuardBar.width - 1; i >= 0; i--) {
      drawBit((AuxiliaryCharacter.NormalGuardBar.RIGHT >> i) & 1, 1, true);
    }

    // Optionally, draw the human-readable text below the barcode
    if (withHRI) {
      ctx.font = `${Math.trunc(moduleWidth * 8)}px monospace`;
      ctx.textRendering = "geometricPrecision";

      const baseOffset =
        AuxiliaryCharacter.NormalGuardBar.width +
        (withQuietZone ? EAN13.QUIET_ZONE_LEFT_WIDTH : 0);
      ctx.fillText(
        this.#chars.slice(1, 7).join(""),
        baseOffset * moduleWidth,
        height,
      );

      const rightOffset =
        baseOffset +
        AuxiliaryCharacter.CentreGuardBar.width +
        6 * EAN13.VALUE_WIDTH;
      ctx.fillText(
        this.#chars.slice(7).join("") + checksum.toString(),
        rightOffset * moduleWidth,
        height,
      );
    }
  }
}

export class BarcodeElement extends HTMLElement {
  static get observedAttributes() {
    return ["type", "value", "width", "height", "scale", "hri", "qz"];
  }

  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #type: "upca" | "ean13" = "upca";
  #value: string = "";
  #scale: number = DEFAULT_RENDER_OPTIONS.scale;
  #withHRI: RenderOptions["withHRI"] = DEFAULT_RENDER_OPTIONS.withHRI;
  #withQuietZone: RenderOptions["withQuietZone"] =
    DEFAULT_RENDER_OPTIONS.withQuietZone;

  constructor() {
    super();
    this.#canvas = document.createElement("canvas");
    this.#canvas.style.imageRendering = "crisp-edges";
    this.#canvas.style.verticalAlign = "middle";
    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(this.#canvas);
    const ctx = this.#canvas.getContext("2d");
    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }
    this.#ctx = ctx;
  }

  attributeChangedCallback(
    name: string,
    oldValue: string | null,
    newValue: string | null,
  ) {
    if (oldValue === newValue) return;
    switch (name) {
      case "type":
        if (newValue === "upca" || newValue === "ean13") {
          this.#type = newValue;
        } else {
          console.warn(`Unsupported barcode type: ${newValue}`);
        }
        break;
      case "value":
        if (newValue !== null) {
          this.#value = newValue;
        }
        break;
      case "width":
        const width = newValue !== null ? parseInt(newValue, 10) : NaN;
        if (!isNaN(width) && width > 0) {
          this.#canvas.style.width = `${width}px`;
          this.#canvas.width = width;
        } else {
          console.warn(`Invalid width value: ${newValue}`);
        }
        break;
      case "height":
        const height = newValue !== null ? parseInt(newValue, 10) : NaN;
        if (!isNaN(height) && height > 0) {
          this.#canvas.style.height = `${height}px`;
          this.#canvas.height = height;
        } else {
          console.warn(`Invalid height value: ${newValue}`);
        }
        break;
      case "scale":
        const scale = newValue !== null ? parseInt(newValue, 10) : NaN;
        if (!isNaN(scale) && scale > 0) {
          this.#scale = scale;
        } else {
          console.warn(`Invalid scale value: ${newValue}`);
        }
        break;
      case "hri":
        this.#withHRI = newValue !== null;
        break;
      case "qz":
        this.#withQuietZone = newValue !== null;
        break;
    }
    this.render();
  }

  render() {
    const ctx = this.#ctx;
    ctx.fillStyle = "currentcolor";

    let barcode;
    const value = this.#value || this.getAttribute("value") || "0";
    if (this.#type === "upca") {
      barcode = new UPCA(parseInt(value, 10));
    } else if (this.#type === "ean13") {
      barcode = new EAN13(parseInt(value, 10));
    } else {
      console.error(`Unsupported barcode type: ${this.#type}`);
      return;
    }

    const height = ctx.canvas.height;
    const modules = this.#withQuietZone
      ? this.#type === "upca"
        ? UPCA.TOTAL_WIDTH
        : EAN13.TOTAL_WIDTH
      : this.#type === "upca"
        ? UPCA.TOTAL_WIDTH -
          UPCA.QUIET_ZONE_LEFT_WIDTH -
          UPCA.QUIET_ZONE_RIGHT_WIDTH
        : EAN13.TOTAL_WIDTH -
          EAN13.QUIET_ZONE_LEFT_WIDTH -
          EAN13.QUIET_ZONE_RIGHT_WIDTH;
    const width = modules * this.#scale;

    ctx.canvas.width = width;
    ctx.canvas.height = height;

    // Clear the canvas
    ctx.clearRect(0, 0, width, height);

    // Draw the barcode
    barcode.renderToCanvas(ctx.canvas, {
      scale: this.#scale,
      withHRI: this.#withHRI,
      withQuietZone: this.#withQuietZone,
    });
  }
}

export function init() {
  customElements.define("bar-code", BarcodeElement);
}
