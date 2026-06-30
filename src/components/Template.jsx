import React, { useEffect, useRef } from "react";

const Template = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const panel = canvas.parentElement;

    const resize = () => {
      canvas.width = panel.offsetWidth;
      canvas.height = panel.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const CHARS = "abcdefghijklmnopqrstuvwxyz0123456789{}[]()<>/\\;:=!@#$%^&*";
    const SIZE = 14;
    const COLORS = ["#a78bfa", "#818cf8", "#6366f1", "#c4b5fd", "#7c3aed"];
    let cols = [];

    const initCols = () => {
      cols = Array.from(
        { length: Math.floor(canvas.width / SIZE) },
        (_, i) => ({
          x: i * SIZE,
          y: Math.random() * -canvas.height,
          speed: 0.5 + Math.random() * 1.0,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          opacity: 0.07 + Math.random() * 0.15,
          char: "",
          tick: 0,
          trail: [],
          trailLen: 4 + Math.floor(Math.random() * 7),
        }),
      );
    };
    initCols();
    window.addEventListener("resize", initCols);

    let raf;
    const draw = () => {
      ctx.fillStyle = "#0d0d18";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (const col of cols) {
        if (++col.tick > 3 + Math.floor(Math.random() * 5)) {
          col.char = CHARS[Math.floor(Math.random() * CHARS.length)];
          col.tick = 0;
        }
        col.trail.push({ y: col.y, char: col.char });
        if (col.trail.length > col.trailLen) col.trail.shift();
        col.trail.forEach((t, i) => {
          ctx.globalAlpha = (i / col.trail.length) * col.opacity;
          ctx.font = `${SIZE - 2}px monospace`;
          ctx.fillStyle = col.color;
          ctx.fillText(t.char, col.x, t.y);
        });
        ctx.globalAlpha = col.opacity + 0.08;
        ctx.fillStyle = "#e3e0f1";
        ctx.font = `bold ${SIZE - 1}px monospace`;
        ctx.fillText(col.char, col.x, col.y);
        ctx.globalAlpha = 1;
        col.y += col.speed;
        if (col.y > canvas.height + 20) {
          col.y = -SIZE * (2 + Math.random() * 5);
          col.speed = 0.5 + Math.random() * 1.0;
          col.color = COLORS[Math.floor(Math.random() * COLORS.length)];
          col.trail = [];
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", initCols);
    };
  }, []);

  return (
    <div>
      <section className="fixed h-screen hidden md:flex w-[45%] flex-col justify-between p-12 bg-[#0d0d18]">
        {/* Matrix canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0"
        />

        {/* Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#7c3aed,transparent_70%)] opacity-10 z-[1]" />

        {/* Branding */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-purple-600">
            <span className="material-symbols-outlined text-white">
              auto_awesome
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold">AuraAI</p>
            <p className="text-xs text-gray-400">Intelligence v2.4</p>
          </div>
        </div>

        {/* Text */}
        <div className="relative z-10 max-w-md">
          <h1 className="text-5xl font-bold mb-6">
            Your personal AI{" "}
            <span className="text-purple-400">always learning.</span>
          </h1>
          <p className="text-gray-400">
            Experience the next evolution of cognitive assistance. Securely sync
            your workflows and let Aura handle the complexity of your daily
            operations.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <span className="material-symbols-outlined text-purple-400 text-sm">
                verified
              </span>
              <span className="text-xs font-medium text-white/70">
                SOC2 Compliant
              </span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <span className="material-symbols-outlined text-purple-400 text-sm">
                bolt
              </span>
              <span className="text-xs font-medium text-white/70">
                Sub-100ms Latency
              </span>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm text-gray-400">
          Trusted by 2,000+ innovators worldwide
        </div>
      </section>
    </div>
  );
};

export default Template;
