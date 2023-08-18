import { useEffect, useRef } from "react";

function MatrixBG({ timeout = 50 }) {
  const canvas = useRef();

  useEffect(() => {
    const context = canvas.current.getContext("2d");

    const updateCanvasDimensions = () => {
      const width = Math.max(5120, document.body.offsetWidth);
      const height = Math.max(2437, document.body.offsetHeight);
      canvas.current.width = width;
      canvas.current.height = height;

      context.fillStyle = "#000";
      context.fillRect(0, 0, width, height);

      const columns = Math.floor(width / 20) + 1;
      const yPositions = Array.from({ length: columns }).fill(0);

      const matrixEffect = () => {
        context.fillStyle = "#0001";
        context.fillRect(0, 0, width, height);

        context.fillStyle = "#0f0";
        context.font = "15pt monospace";

        yPositions.forEach((y, index) => {
          const text = String.fromCharCode(Math.random() * 128);
          const x = index * 20;
          context.fillText(text, x, y);

          if (y > 100 + Math.random() * 10000) {
            yPositions[index] = 0;
          } else {
            yPositions[index] = y + 20;
          }
        });
      };

      const interval = setInterval(matrixEffect, timeout);
      return () => {
        clearInterval(interval);
      };
    };

    updateCanvasDimensions();
  }, [timeout]);

  return (
    <div
      style={{
        background: "#000000",
        overflow: "hidden",
        position: "absolute",
        height: "100%",
        width: "100%",
        zIndex: -1,
        left: "0",
        top: "0",
      }}
    >
      <canvas ref={canvas} />
    </div>
  );
}

export default MatrixBG;