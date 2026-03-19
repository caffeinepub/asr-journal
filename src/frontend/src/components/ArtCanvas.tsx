import { useEffect, useRef, useState } from "react";

interface Props {
  initialData?: string;
  onChange?: (data: string) => void;
  photoBackground?: string | null;
  fullHeight?: boolean;
}

export default function ArtCanvas({
  initialData,
  onChange,
  photoBackground,
  fullHeight = false,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initializedRef = useRef(false);
  const bgAppliedRef = useRef<string | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#7c5c3e");
  const [brushSize, setBrushSize] = useState(4);
  const lastPos = useRef<{ x: number; y: number } | null>(null);
  const historyRef = useRef<ImageData[]>([]);
  const historyIndexRef = useRef(-1);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const canvasHeight = fullHeight ? 560 : 320;

  const saveSnapshot = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const snapshot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    historyRef.current = historyRef.current.slice(
      0,
      historyIndexRef.current + 1,
    );
    historyRef.current.push(snapshot);
    if (historyRef.current.length > 40) historyRef.current.shift();
    historyIndexRef.current = historyRef.current.length - 1;
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: run once on mount, saveSnapshot is stable
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFFAF4";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (initialData) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        saveSnapshot();
      };
      img.src = initialData;
    } else {
      saveSnapshot();
    }
  }, []);

  // Apply photo background when it changes
  // biome-ignore lint/correctness/useExhaustiveDependencies: saveSnapshot is defined in component and stable
  useEffect(() => {
    if (!photoBackground || photoBackground === bgAppliedRef.current) return;
    bgAppliedRef.current = photoBackground;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const img = new Image();
    img.onload = () => {
      saveSnapshot();
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      saveSnapshot();
      if (onChange) onChange(canvas.toDataURL("image/png"));
    };
    img.src = photoBackground;
  }, [photoBackground, onChange]);

  const getPos = (
    e: React.MouseEvent | React.TouchEvent,
    canvas: HTMLCanvasElement,
  ) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ("touches" in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDraw = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    saveSnapshot();
    setIsDrawing(true);
    lastPos.current = getPos(e, canvas);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx || !lastPos.current) return;
    const pos = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(pos.x, pos.y);
    ctx.strokeStyle = color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    lastPos.current = pos;
  };

  const stopDraw = () => {
    setIsDrawing(false);
    lastPos.current = null;
    const canvas = canvasRef.current;
    if (canvas && onChange) {
      onChange(canvas.toDataURL("image/png"));
    }
  };

  const undo = () => {
    if (historyIndexRef.current <= 0) return;
    historyIndexRef.current -= 1;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.putImageData(historyRef.current[historyIndexRef.current], 0, 0);
    if (onChange) onChange(canvas.toDataURL("image/png"));
  };

  const redo = () => {
    if (historyIndexRef.current >= historyRef.current.length - 1) return;
    historyIndexRef.current += 1;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.putImageData(historyRef.current[historyIndexRef.current], 0, 0);
    if (onChange) onChange(canvas.toDataURL("image/png"));
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#FFFAF4";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    bgAppliedRef.current = null;
    saveSnapshot();
    if (onChange) onChange(canvas.toDataURL("image/png"));
  };

  const exportCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "asr-journal-art.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  const handleBgFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target?.result as string;
      if (!base64) return;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const img = new Image();
      img.onload = () => {
        saveSnapshot();
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        saveSnapshot();
        if (onChange) onChange(canvas.toDataURL("image/png"));
      };
      img.src = base64;
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const COLORS = [
    "#7c5c3e",
    "#3d6b4f",
    "#6b3d6b",
    "#c2783a",
    "#4a6fa5",
    "#c24a3a",
    "#2d2d2d",
    "#888888",
    "#ffffff",
  ];

  return (
    <div className="space-y-3">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex gap-1.5 flex-wrap">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              title={c}
              style={{ background: c }}
              className={`w-6 h-6 rounded-full border-2 transition-transform ${
                color === c
                  ? "border-amber-700 scale-110"
                  : "border-transparent hover:scale-105"
              }`}
            />
          ))}
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            title="Custom color"
            className="w-6 h-6 rounded-full border-2 border-transparent cursor-pointer"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Size:</span>
          <input
            type="range"
            min={1}
            max={20}
            value={brushSize}
            onChange={(e) => setBrushSize(Number(e.target.value))}
            className="w-20 accent-amber-600"
          />
          <span className="text-xs text-muted-foreground">{brushSize}px</span>
        </div>
        <div className="ml-auto flex items-center gap-1.5 flex-wrap">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBgFileUpload}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs text-sage-700 hover:text-foreground border border-border rounded-md px-2.5 py-1 transition-colors"
            title="Set photo as background layer"
          >
            🖼 Add Photo BG
          </button>
          <button
            type="button"
            onClick={undo}
            title="Undo"
            className="text-xs text-muted-foreground hover:text-foreground border border-border rounded-md px-2.5 py-1 transition-colors"
          >
            ↩ Undo
          </button>
          <button
            type="button"
            onClick={redo}
            title="Redo"
            className="text-xs text-muted-foreground hover:text-foreground border border-border rounded-md px-2.5 py-1 transition-colors"
          >
            ↪ Redo
          </button>
          <button
            type="button"
            onClick={clearCanvas}
            className="text-xs text-muted-foreground hover:text-foreground border border-border rounded-md px-2.5 py-1 transition-colors"
          >
            Clear
          </button>
          <button
            type="button"
            onClick={exportCanvas}
            title="Save image to your device"
            className="text-xs text-amber-700 hover:text-amber-900 border border-amber-300/60 rounded-md px-2.5 py-1 transition-colors"
          >
            ↓ Save
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div className="rounded-2xl overflow-hidden border border-amber-200/60 shadow-inner bg-[#FFFAF4]">
        <canvas
          ref={canvasRef}
          width={800}
          height={canvasHeight}
          className="w-full cursor-crosshair touch-none block"
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
      </div>
      <p className="text-xs text-muted-foreground/60 text-center italic">
        Your canvas — begin wherever you are
      </p>
    </div>
  );
}
