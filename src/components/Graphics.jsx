import { useEffect, useRef } from "react";

function paint(ctx, w, h, variant) {
  ctx.fillStyle = "#070707";
  ctx.fillRect(0, 0, w, h);

  if (variant === "portrait") {
    const light = ctx.createLinearGradient(w * 0.2, h * 0.05, w * 0.95, h * 0.9);
    light.addColorStop(0, "#f7f7f2");
    light.addColorStop(0.45, "#bdbdb7");
    light.addColorStop(1, "#3a3a38");
    ctx.fillStyle = light;
    ctx.beginPath();
    ctx.moveTo(w * 0.58, h * 0.07);
    ctx.bezierCurveTo(w * 0.84, h * 0.02, w * 1.02, h * 0.16, w * 0.98, h * 0.34);
    ctx.bezierCurveTo(w * 0.94, h * 0.48, w * 0.86, h * 0.55, w * 0.78, h * 0.62);
    ctx.bezierCurveTo(w * 0.94, h * 0.72, w * 1.06, h * 0.84, w * 1.06, h);
    ctx.lineTo(w * 0.16, h);
    ctx.bezierCurveTo(w * 0.32, h * 0.88, w * 0.46, h * 0.76, w * 0.5, h * 0.66);
    ctx.bezierCurveTo(w * 0.46, h * 0.61, w * 0.42, h * 0.585, w * 0.45, h * 0.55);
    ctx.quadraticCurveTo(w * 0.39, h * 0.545, w * 0.42, h * 0.515);
    ctx.quadraticCurveTo(w * 0.37, h * 0.505, w * 0.41, h * 0.48);
    ctx.bezierCurveTo(w * 0.35, h * 0.46, w * 0.345, h * 0.43, w * 0.39, h * 0.41);
    ctx.quadraticCurveTo(w * 0.43, h * 0.39, w * 0.41, h * 0.355);
    ctx.bezierCurveTo(w * 0.37, h * 0.3, w * 0.37, h * 0.22, w * 0.45, h * 0.15);
    ctx.bezierCurveTo(w * 0.5, h * 0.07, w * 0.54, h * 0.04, w * 0.58, h * 0.07);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#141414";
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.3, w * 0.028, h * 0.012, -0.2, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  ctx.strokeStyle = "#deded8";
  ctx.fillStyle = "#deded8";
  ctx.lineWidth = 3;
  if (variant === "nodes") {
    const pts = [
      [0.2, 0.3],
      [0.48, 0.22],
      [0.72, 0.4],
      [0.58, 0.68],
      [0.28, 0.62],
      [0.8, 0.75],
    ];
    ctx.beginPath();
    pts.forEach(([x, y], i) => (i ? ctx.lineTo(x * w, y * h) : ctx.moveTo(x * w, y * h)));
    ctx.stroke();
    pts.forEach(([x, y]) => {
      ctx.beginPath();
      ctx.arc(x * w, y * h, 7, 0, Math.PI * 2);
      ctx.fill();
    });
    return;
  }
  if (variant === "rings") {
    for (let i = 1; i <= 5; i += 1) {
      ctx.beginPath();
      ctx.arc(w * 0.5, h * 0.5, i * 18, 0, Math.PI * 2);
      ctx.stroke();
    }
    return;
  }
  if (variant === "signal") {
    ctx.beginPath();
    for (let x = 0; x <= w; x += 6) {
      const y = h * 0.5 + Math.sin(x / 14) * 28 + Math.sin(x / 5) * 8;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    return;
  }
  if (variant === "bars") {
    for (let i = 0; i < 12; i += 1) {
      const bh = 20 + ((i * 37) % 80);
      ctx.fillRect(16 + i * 22, h - 16 - bh, 12, bh);
    }
    return;
  }
  for (let i = 0; i < 18; i += 1) {
    ctx.globalAlpha = 0.35 + (i % 5) * 0.12;
    ctx.fillRect((i * 47) % w, (i * 29) % h, 36 + (i % 4) * 10, 8);
  }
  ctx.globalAlpha = 1;
}

function pixelate(source, target, cell) {
  const w = source.width;
  const h = source.height;
  const src = source.getContext("2d").getImageData(0, 0, w, h).data;
  const ctx = target.getContext("2d");
  ctx.clearRect(0, 0, w, h);
  for (let y = 0; y < h; y += cell) {
    for (let x = 0; x < w; x += cell) {
      const i = (y * w + x) * 4;
      const lum = src[i];
      if (lum < 18) continue;
      ctx.fillStyle = `rgb(${lum},${lum},${Math.max(0, lum - 6)})`;
      ctx.fillRect(x, y, cell - 1, cell - 1);
    }
  }
}

export default function PixelArt({ variant = "portrait", className, width = 420, height = 620 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    canvas.width = width;
    canvas.height = height;
    const off = document.createElement("canvas");
    off.width = width;
    off.height = height;
    paint(off.getContext("2d"), width, height, variant);
    pixelate(off, canvas, variant === "portrait" ? 9 : 6);
  }, [variant, width, height]);

  return <canvas ref={ref} className={className} width={width} height={height} aria-hidden="true" />;
}
