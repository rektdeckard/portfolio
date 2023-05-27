import { useRef, useState, useEffect } from "react";

const MAX_ENTROPY = 2 ** 16;
const INFLECTION_POINT = 2 ** 31;

const StaticField = () => {
  const ref = useRef<HTMLCanvasElement>(null);
  const [running, setRunning] = useState<boolean>(true);
  const [crypt, setCrypt] = useState<boolean>(true);
  const [shouldNormalize, setShouldNormalize] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const canvas = ref.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    let idata: ImageData;
    let buffer: Uint32Array;

    const setup = () => {
      const { offsetHeight, offsetWidth } = canvas;
      if (!offsetWidth) return;
      canvas.width = offsetWidth;
      canvas.height = offsetHeight;
      idata = context.createImageData(offsetWidth, offsetHeight);
      buffer = new Uint32Array(idata.data.buffer);
    };

    window.addEventListener("resize", setup, { passive: true });
    setup();

    const normalize = (value: number, infl: number) => {
      if (!shouldNormalize) return value;
      return value < infl ? 0 : -1 >> 0;
    };

    const noise = crypt
      ? (context: CanvasRenderingContext2D) => {
          let rnd = crypto.getRandomValues(
            new Uint32Array(MAX_ENTROPY / Uint32Array.BYTES_PER_ELEMENT)
          );
          let len = buffer.length - 1;
          while (len--) {
            buffer[len] = normalize(rnd[len % rnd.length], INFLECTION_POINT);
            if (!(len % MAX_ENTROPY)) crypto.getRandomValues(rnd);
          }
          context.putImageData(idata, 0, 0);
        }
      : (context: CanvasRenderingContext2D) => {
          let len = buffer.length - 1;
          while (len--) {
            buffer[len] = Math.random() < 0.5 ? 0 : -1 >> 0;
          }
          context.putImageData(idata, 0, 0);
        };

    (function loop() {
      if (!isMounted) return;
      noise(context);
      if (running) requestAnimationFrame(loop);
    })();

    return () => {
      isMounted = false;
      window.removeEventListener("resize", setup);
    };
  }, [ref, running, crypt, shouldNormalize]);

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <div>
          <input
            id="static-run"
            type="checkbox"
            checked={running}
            onChange={() => setRunning((r) => !r)}
          />
          <label htmlFor="static-run">Run</label>
        </div>
        <div>
          <input
            id="static-crypto"
            type="checkbox"
            checked={crypt}
            onChange={() => setCrypt((c) => !c)}
          />
          <label htmlFor="static-crypto">Cryptographic</label>
        </div>
        <div>
          <input
            id="static-normalized"
            type="checkbox"
            disabled={!crypt}
            checked={!crypt || shouldNormalize}
            onChange={() => setShouldNormalize((n) => !n)}
          />
          <label htmlFor="static-normalized">Normalized</label>
        </div>
      </div>
      <canvas
        ref={ref}
        style={{ backgroundColor: "black", width: "100%", borderRadius: 6 }}
      />
    </>
  );
};

export default StaticField;
