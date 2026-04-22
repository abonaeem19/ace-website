"use client";

import { useState, useEffect, useRef } from "react";

/* ── Particle Canvas ── */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = canvas.width = canvas.offsetWidth;
    let H = canvas.height = canvas.offsetHeight;
    const COUNT = 50;
    const pts = Array.from({ length: COUNT }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.8 + 0.4,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < COUNT; i++) {
        const a = pts[i];
        a.x += a.vx; a.y += a.vy;
        if (a.x < 0 || a.x > W) a.vx *= -1;
        if (a.y < 0 || a.y > H) a.vy *= -1;
        ctx.beginPath(); ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,240,255,0.55)"; ctx.fill();
        for (let j = i + 1; j < COUNT; j++) {
          const b = pts[j];
          const d = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (d < 130) {
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0,240,255,${0.12 * (1 - d / 130)})`;
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const onResize = () => { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-70" />;
}

/* ── Terminal ── */
const LINES = [
  { prompt: "ace@core:~$", cmd: " init --project next-gen", color: "#00F0FF" },
  { prompt: "", cmd: "✓ محركات الأكواد المتقدمة...", color: "#10B981" },
  { prompt: "ace@core:~$", cmd: " deploy --target production", color: "#00F0FF" },
  { prompt: "", cmd: "✓ تم النشر في 0.3 ثانية", color: "#10B981" },
  { prompt: "ace@core:~$", cmd: " ai --agent --autonomous", color: "#00F0FF" },
  { prompt: "", cmd: "◉ الذكاء الاصطناعي يعمل...", color: "#8B5CF6" },
];

function TerminalBlock() {
  const [visible, setVisible] = useState(0);
  useEffect(() => {
    if (visible < LINES.length) {
      const t = setTimeout(() => setVisible(v => v + 1), 600);
      return () => clearTimeout(t);
    }
  }, [visible]);
  return (
    <div className="rounded-xl p-5" style={{ background: "rgba(0,0,0,0.5)", border: "1px solid rgba(0,240,255,0.15)", fontFamily: "'Space Mono', monospace", fontSize: 13 }}>
      <div className="mb-4 flex gap-2">
        <div className="h-3 w-3 rounded-full" style={{ background: "#EF4444" }} />
        <div className="h-3 w-3 rounded-full" style={{ background: "#F59E0B" }} />
        <div className="h-3 w-3 rounded-full" style={{ background: "#10B981" }} />
        <span className="ms-auto text-xs" style={{ color: "var(--text-muted)" }}>ace-terminal</span>
      </div>
      {LINES.slice(0, visible).map((l, i) => (
        <div key={i} className="mb-1" dir="ltr" style={{ textAlign: "left" }}>
          {l.prompt && <span style={{ color: "#10B981" }}>{l.prompt}</span>}
          <span style={{ color: l.color }}>{l.cmd}</span>
        </div>
      ))}
      {visible < LINES.length && <span style={{ color: "#10B981", animation: "blink 1s infinite" }}>▋</span>}
    </div>
  );
}

/* ── Rotating Ring ── */
function RotatingRing() {
  return (
    <div className="relative hidden lg:block" style={{ width: 280, height: 280, flexShrink: 0 }}>
      <div className="absolute inset-0 rounded-full" style={{ border: "1px solid rgba(0,240,255,0.2)", animation: "spin 18s linear infinite" }}>
        {[0, 90, 180, 270].map(deg => (
          <div key={deg} className="absolute rounded-full" style={{ width: 8, height: 8, background: "var(--primary)", boxShadow: "0 0 10px var(--primary)", top: "50%", left: "50%", transform: `rotate(${deg}deg) translateX(139px) translate(-50%,-50%)` }} />
        ))}
      </div>
      <div className="absolute rounded-full" style={{ inset: 25, border: "1px solid rgba(139,92,246,0.25)", animation: "spinR 12s linear infinite" }}>
        {[45, 135, 225, 315].map(deg => (
          <div key={deg} className="absolute rounded-full" style={{ width: 6, height: 6, background: "#8B5CF6", boxShadow: "0 0 8px #8B5CF6", top: "50%", left: "50%", transform: `rotate(${deg}deg) translateX(114px) translate(-50%,-50%)` }} />
        ))}
      </div>
      <div className="absolute rounded-full" style={{ inset: 55, border: "1px dashed rgba(0,240,255,0.15)", animation: "spin 7s linear infinite" }} />
      <div className="absolute flex items-center justify-center rounded-full" style={{ inset: 78, background: "radial-gradient(circle, rgba(0,240,255,0.15) 0%, rgba(0,240,255,0.02) 70%)", border: "1px solid rgba(0,240,255,0.3)", animation: "orbPulse 3s infinite" }}>
        <span className="text-center text-[11px] tracking-wider" style={{ fontFamily: "'Space Mono', monospace", color: "var(--primary)" }}>ACE<br/>CORE</span>
      </div>
    </div>
  );
}

/* ── Main Export ── */
export default function HeroClient() {
  return (
    <div className="relative hidden flex-col items-center gap-8 lg:flex" style={{ flexShrink: 0, animation: "fadeUp 0.9s ease 0.35s both" }}>
      <ParticleCanvas />
      <RotatingRing />
      <div className="w-[320px]">
        <TerminalBlock />
      </div>
    </div>
  );
}