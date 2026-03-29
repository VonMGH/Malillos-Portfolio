"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { Russo_One, JetBrains_Mono } from "next/font/google";

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-russo",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export function IntroOverlay({ title, onComplete }: { title: string; onComplete?: () => void }) {
  const [phase, setPhase] = useState<"off" | "on" | "leaving">("on");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const mxRef = useRef(0);
  const myRef = useRef(0);

  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hackedText, setHackedText] = useState("E-PORTFOLIO");

  useLayoutEffect(() => {
    const key = "introSeen";
    if (typeof window === "undefined") return;

    const seen = sessionStorage.getItem(key);
    if (seen) setPhase("off");
  }, []);

  useEffect(() => {
    const key = "introSeen";
    if (typeof window === "undefined") return;

    const seen = sessionStorage.getItem(key);
    if (seen) {
      return;
    }

    const cover = document.getElementById("boot-cover");
    if (cover) cover.style.display = "none";

    document.documentElement.style.setProperty("--background", "#000000");
    document.documentElement.style.setProperty("--foreground", "#ffffff");
    setPhase("on");
    document.documentElement.style.overflow = "hidden";

    const onMove = (e: PointerEvent) => {
      mxRef.current = (e.clientX / window.innerWidth - 0.5) * 26;
      myRef.current = (e.clientY / window.innerHeight - 0.5) * 18;
      setCoords({ x: e.clientX, y: e.clientY });
    };

    const tick = () => {
      rafRef.current = window.requestAnimationFrame(tick);
    };

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()_+";
    let scrambleInterval: number;

    const t1 = window.setTimeout(() => {
      setPhase("leaving");
      scrambleInterval = window.setInterval(() => {
        setHackedText(prev => 
          prev.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join("")
        );
      }, 50);
    }, 1900);

    const t2 = window.setTimeout(() => {
      sessionStorage.setItem(key, "1");
      document.documentElement.style.overflow = "";
      document.documentElement.style.setProperty("--background", "#ffffff");
      document.documentElement.style.setProperty("--foreground", "#000000");
      document.body.style.background = "#ffffff";
      document.body.style.color = "#000000";
      setPhase("off");
      if (onComplete) onComplete();
      if (scrambleInterval) clearInterval(scrambleInterval);
    }, 2400);

    window.addEventListener("pointermove", onMove);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      if (scrambleInterval) clearInterval(scrambleInterval);
      document.documentElement.style.overflow = "";
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  if (phase === "off") return null;

  return (
    <div
      className={
        `fixed inset-0 z-50 flex items-center justify-start overflow-hidden bg-black text-white px-5 sm:px-12 lg:px-20 ${russoOne.variable} ${jetbrainsMono.variable} ` +
        (phase === "leaving" ? " intro-out intro-distort" : "")
      }
      aria-hidden
    >
      <div className="intro-data-stream" />
      <div className="intro-hud-ring" />
      <div className="intro-compass" />
      <div 
        className="intro-spotlight" 
        style={{ 
          background: `radial-gradient(600px at ${coords.x}px ${coords.y}px, rgba(255,255,255,0.05), transparent 80%)` 
        }} 
      />
      <div className="intro-corner-br" />
      <div className={"intro-shape" + (phase === "leaving" ? " intro-shape-expand" : "")} />
      <div className="intro-scanline-h" />
      <div className="relative z-[120] flex w-full max-w-[960px] flex-col">
        <div className="intro-parallax flex flex-col items-start gap-0 uppercase tracking-tighter">
          <p className="intro-eyebrow text-[3vw] font-bold">WELCOME TO MY</p>
          <div className="relative">
            <h1 className="intro-title text-[8vw] font-black leading-[0.8] tracking-tighter" data-text={hackedText}>
              {hackedText}
            </h1>
            <div className="intro-scanline-v" />
            <div className="intro-glitch-text absolute inset-0 text-white/20 select-none pointer-events-none">E-PORTFOLIO</div>
          </div>
        </div>
        <div className="mt-10 flex items-center gap-6">
          <div className="h-[2px] w-12 bg-white intro-line-pulse" />
          <div className="flex flex-col gap-1">
            <p className="intro-sub font-mono text-[10px] uppercase tracking-[0.3em] text-white/90">
              {phase === "leaving" ? "[ CRITICAL ERROR: VIRUS_DETECTED ]" : "[ ARCHIVE_01 // SECURE_ACCESS ]"}
            </p>
            <p className="font-mono text-[8px] text-white/40 intro-terminal">
              {phase === "leaving" 
                ? "{'>'} ERR_SYSTEM_BREACH: OVERRIDING_CORE..." 
                : "{'>'} LOAD_SEQUENCE: OK... BYPASS_ENCRYPTION: DONE..."}
            </p>
          </div>
        </div>
        <div className="mt-6 w-[min(520px,70vw)] relative group">
          <div className="intro-progress h-[2px] overflow-hidden bg-white/10 relative">
            <span className="intro-progress-bar h-full bg-white block relative z-10" />
            <div className="absolute inset-0 bg-white/5 animate-pulse" />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[8px] uppercase tracking-[0.4em] text-white/40">
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 bg-white/40 rounded-full animate-ping" />
              SYSTEM_LINK_STABLE
            </span>
            <span>X:{coords.x} Y:{coords.y}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
