"use client";

import { useEffect, useState, type CSSProperties } from "react";

type ShapePositionStyle = CSSProperties & {
  "--nav-holo-shape-delay"?: string;
};

const SHAPE_COUNT = 10;
const VARIANTS = 12;

type Spec = {
  key: string;
  variant: number;
  topPct: number;
  leftPct: number;
  sizePx: number;
  rotateDeg: number;
  delayS: number;
};

function HudShape({ variant }: { variant: number }) {
  const s = "rgb(var(--nav-holo-shape-strong, 0 0 0) / 0.56)";
  const w = "rgb(var(--nav-holo-shape-weak, 0 0 0) / 0.34)";
  const sw = 1.15;

  switch (variant % VARIANTS) {
    case 0:
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <path
            d="M6 12 L12 6 L36 6 L42 12 L42 36 L36 42 L12 42 L6 36 Z"
            fill="none"
            stroke={s}
            strokeWidth={sw}
            vectorEffect="non-scaling-stroke"
          />
          <path d="M6 12 L6 8 M42 12 L42 8" stroke={w} strokeWidth={0.6} />
          <path d="M12 6 L8 6 M36 6 L40 6" stroke={w} strokeWidth={0.6} />
        </svg>
      );
    case 1:
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <path
            d="M24 5 L41 40 L7 40 Z"
            fill="none"
            stroke={s}
            strokeWidth={sw}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M14 32 L34 32"
            stroke={w}
            strokeWidth={0.7}
            strokeDasharray="2 3"
          />
        </svg>
      );
    case 2:
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <path
            d="M6 6 L14 6 L14 14 M34 6 L42 6 L42 14 M6 42 L14 42 L14 34 M34 42 L42 42 L42 34"
            fill="none"
            stroke={s}
            strokeWidth={sw}
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="24" cy="24" r="1.2" fill={w} />
        </svg>
      );
    case 3:
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <path
            d="M14 8 L34 8 L42 22 L34 36 L14 36 L6 22 Z"
            fill="none"
            stroke={s}
            strokeWidth={sw}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M14 8 L14 12 M34 8 L34 12"
            stroke={w}
            strokeWidth={0.6}
          />
        </svg>
      );
    case 4:
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <path
            d="M8 10 A16 16 0 1 1 8 28"
            fill="none"
            stroke={s}
            strokeWidth={sw}
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
          />
          <path
            d="M24 4 L24 8 M38 18 L34 18 M34 34 L38 34"
            stroke={w}
            strokeWidth={0.65}
          />
        </svg>
      );
    case 5:
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <path
            d="M4 14 L10 14 L10 10 M38 10 L38 14 L44 14 M44 34 L38 34 L38 38 M10 38 L10 34 L4 34"
            fill="none"
            stroke={s}
            strokeWidth={sw}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M8 24 H40"
            stroke={w}
            strokeWidth={0.55}
            strokeDasharray="3 2"
          />
        </svg>
      );
    case 6:
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <path
            d="M24 4 L40 24 L24 44 L8 24 Z"
            fill="none"
            stroke={s}
            strokeWidth={sw}
            vectorEffect="non-scaling-stroke"
          />
          <path d="M24 14 L24 34 M14 24 L34 24" stroke={w} strokeWidth={0.55} />
        </svg>
      );
    case 7:
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <rect
            x="8"
            y="10"
            width="32"
            height="28"
            rx="4"
            fill="none"
            stroke={s}
            strokeWidth={sw}
            vectorEffect="non-scaling-stroke"
          />
          <rect
            x="11"
            y="13"
            width="26"
            height="22"
            rx="2"
            fill="none"
            stroke={w}
            strokeWidth={0.55}
          />
        </svg>
      );
    case 8:
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <circle cx="24" cy="24" r="14" fill="none" stroke={w} strokeWidth={0.5} />
          <path
            d="M24 6 L24 12 M24 36 L24 42 M6 24 L12 24 M36 24 L42 24"
            stroke={s}
            strokeWidth={sw}
            vectorEffect="non-scaling-stroke"
          />
          <circle cx="24" cy="24" r="2" fill="none" stroke={s} strokeWidth={sw} />
        </svg>
      );
    case 9:
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <path
            d="M24 6 L40 16 L34 40 L14 40 L8 16 Z"
            fill="none"
            stroke={s}
            strokeWidth={sw}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M18 22 L30 22"
            stroke={w}
            strokeWidth={0.6}
            strokeDasharray="1.5 2"
          />
        </svg>
      );
    case 10:
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <circle
            cx="24"
            cy="24"
            r="16"
            fill="none"
            stroke={s}
            strokeWidth={sw}
            strokeDasharray="6 5 2 5"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M24 4 L24 10 M44 24 L38 24"
            stroke={w}
            strokeWidth={0.55}
          />
        </svg>
      );
    case 11:
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <path d="M10 34 V14 M16 34 V10 M22 34 V18 M28 34 V8 M34 34 V22 M40 34 V16" stroke={s} strokeWidth={sw} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M8 36 H42" stroke={w} strokeWidth={0.5} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 48 48" className="h-full w-full" aria-hidden>
          <path
            d="M6 12 L12 6 L36 6 L42 12 L42 36 L36 42 L12 42 L6 36 Z"
            fill="none"
            stroke={s}
            strokeWidth={sw}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      );
  }
}

function rollSpecs(): Spec[] {
  return Array.from({ length: SHAPE_COUNT }, (_, i) => ({
    key: `holo-${i}-${Math.random().toString(36).slice(2, 9)}`,
    variant: Math.floor(Math.random() * VARIANTS),
    topPct: 6 + Math.random() * 52,
    leftPct: 3 + Math.random() * 82,
    sizePx: 26 + Math.floor(Math.random() * 34),
    rotateDeg: -28 + Math.random() * 56,
    delayS: 1.02 + Math.random() * 1.75,
  }));
}

/** Random HUD frames that flash in during the navbar hologram pass (client-only positions). */
export function NavHoloShapes() {
  const [specs, setSpecs] = useState<Spec[] | null>(null);

  useEffect(() => {
    setSpecs(rollSpecs());
  }, []);

  if (!specs) return null;

  return (
    <div className="nav-holo-shapes" aria-hidden>
      {specs.map((s) => {
        const pos: ShapePositionStyle = {
          top: `${s.topPct}%`,
          left: `${s.leftPct}%`,
          width: s.sizePx,
          height: s.sizePx,
          "--nav-holo-shape-delay": `${s.delayS}s`,
        };
        return (
          <div key={s.key} className="nav-holo-shape" style={pos}>
            <div className="nav-holo-shape__anim">
              <div
                className="nav-holo-shape__rotate"
                style={{ transform: `rotate(${s.rotateDeg}deg)` }}
              >
                <HudShape variant={s.variant} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
