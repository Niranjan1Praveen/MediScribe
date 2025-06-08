// components/AppSignaturePad.js
"use client";

import { useRef, useEffect } from "react";
import { Button } from "../ui/button";

export default function AppSignaturePad({
  onSave,
  width = 250,
  height = 100,
  penColor = "cyan",
  clearOnSave = false,
}) {
  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set up canvas
    ctx.strokeStyle = penColor;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    // Drawing functions
    const startDrawing = (e) => {
      isDrawingRef.current = true;
      draw(e);
    };

    const stopDrawing = () => {
      isDrawingRef.current = false;
      ctx.beginPath();
    };

    const draw = (e) => {
      if (!isDrawingRef.current) return;

      const rect = canvas.getBoundingClientRect();
      let clientX, clientY;

      if (e.touches) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.clientX;
        clientY = e.clientY;
      }

      ctx.lineTo(clientX - rect.left, clientY - rect.top);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(clientX - rect.left, clientY - rect.top);
    };

    // Event listeners
    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
    canvas.addEventListener("mouseout", stopDrawing);

    // Touch support
    canvas.addEventListener("touchstart", startDrawing);
    canvas.addEventListener("touchmove", draw);
    canvas.addEventListener("touchend", stopDrawing);

    return () => {
      canvas.removeEventListener("mousedown", startDrawing);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", stopDrawing);
      canvas.removeEventListener("mouseout", stopDrawing);
      canvas.removeEventListener("touchstart", startDrawing);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", stopDrawing);
    };
  }, [penColor]);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    onSave(dataUrl);

    if (clearOnSave) {
      clearCanvas();
    }
  };

  return (
    <div className="space-y-2">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="border rounded-md cursor-crosshair"
      />
      <div className="flex gap-2">
        <Button
          variant={"outline"}
          className="px-4 py-2 text-sm font-medium rounded-md border shadow-sm"
          onClick={clearCanvas}
        >
          Clear
        </Button>
        <Button
          className="px-4 py-2 text-sm font-medium rounded-md border shadow-sm bg-cyan-500 hover:bg-cyan-600"
          onClick={saveSignature}
        >
          Save Signature
        </Button>
      </div>
    </div>
  );
}
