import React, { useRef, useEffect } from "react";

const StaticField: React.FC<{}> = () => {
  const ref = useRef<HTMLCanvasElement>(null);

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
      canvas.width = offsetWidth;
      canvas.height = offsetHeight;
      idata = context.createImageData(offsetWidth, offsetHeight);
      buffer = new Uint32Array(idata.data.buffer);
    };

    window.addEventListener("resize", setup, { passive: true });
    setup();

    const noise = (context: CanvasRenderingContext2D) => {
      let len = buffer.length - 1;
      while (len--) {
        buffer[len] = Math.random() < 0.5 ? 0 : -1 >> 0;
      }
      context.putImageData(idata, 0, 0);
    };

    (function loop() {
      if (!isMounted) return;
      noise(context);
      requestAnimationFrame(loop);
    })();

    return () => {
      isMounted = false;
      canvas?.remove();
      window.removeEventListener("resize", setup);
    };
  }, [ref]);

  return (
    <canvas
      ref={ref}
      style={{ backgroundColor: "black", width: "100%", borderRadius: 6 }}
    />
  );
};

export default StaticField;
