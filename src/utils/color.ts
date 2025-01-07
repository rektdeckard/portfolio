export type RGB = { r: number; g: number; b: number };
export type RGBA = RGB & { opacity: number };
export type Interpolator = (t: number) => RGB;

function basisImpl(t1: number, v0: number, v1: number, v2: number, v3: number) {
  const t2 = t1 * t1,
    t3 = t2 * t1;
  return (
    ((1 - 3 * t1 + 3 * t2 - t3) * v0 +
      (4 - 6 * t2 + 3 * t3) * v1 +
      (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2 +
      t3 * v3) /
    6
  );
}

export function basis(values: number[]) {
  const n = values.length - 1;
  return function (t: number) {
    let i = t <= 0 ? (t = 0) : t >= 1 ? ((t = 1), n - 1) : Math.floor(t * n),
      v1 = values[i],
      v2 = values[i + 1],
      v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
      v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basisImpl((t - i / n) * n, v0, v1, v2, v3);
  };
}

export function rgbSpline(spline: (value: number[]) => (t: number) => number) {
  return function (colors: RGB[]) {
    const n = colors.length;
    let r = new Array<number>(n);
    let g = new Array<number>(n);
    let b = new Array<number>(n);
    let color: RGB;

    for (let i = 0; i < n; ++i) {
      color = colors[i];
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }

    const red = spline(r);
    const green = spline(g);
    const blue = spline(b);

    return function (t: number) {
      color.r = red(t);
      color.g = green(t);
      color.b = blue(t);
      return color;
    };
  };
}

export const rgbBasis = rgbSpline(basis);

export function hexToRGB(hex: string): RGB {
  if (hex.length === 4) {
    hex = hex.replace(
      /#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/g,
      "#$1$1$2$2$3$3",
    );
  }

  let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

export function ramp<T>(range: T[]) {
  const n = range.length;
  return function (t: number) {
    return range[Math.max(0, Math.min(n - 1, Math.floor(t * n)))];
  };
}

export const INTERPOLATORS = {
  MellifluousDark: rgbBasis(["#1A1A1A", "#828040", "#b3b393"].map(hexToRGB)),
  MellifluousSpectal: rgbBasis(
    ["#020202", "#5a6599", "#9c6995", "#c95954", "#a6794c"].map(hexToRGB),
  ),
} as const;
