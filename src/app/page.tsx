"use client";

import { ContactForm } from "@/components/ContactForm";
import { IntroOverlay } from "@/components/IntroOverlay";
import { NavHoloShapes } from "@/components/NavHoloShapes";
import { portfolio } from "@/data/portfolio";
import { Card, Container, Pill, Section, cx } from "@/components/ui";
import { motion } from "framer-motion";
import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import type { IconType } from "react-icons";
import {
  SiBootstrap,
  SiComposer,
  SiCss,
  SiFigma,
  SiHtml5,
  SiJavascript,
  SiJira,
  SiJquery,
  SiLaragon,
  SiLaravel,
  SiMariadb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiPrisma,
  SiReact,
  SiReactrouter,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
  SiVite,
  SiVscodium,
  SiXampp,
} from "react-icons/si";
import {
  FiActivity,
  FiAward,
  FiBookOpen,
  FiBox,
  FiCheckCircle,
  FiChevronDown,
  FiCode,
  FiCompass,
  FiCpu,
  FiExternalLink,
  FiFacebook,
  FiFileText,
  FiGithub,
  FiGrid,
  FiLayers,
  FiLayout,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiMenu,
  FiMoon,
  FiPhone,
  FiRadio,
  FiShare2,
  FiSun,
  FiTerminal,
  FiTrendingUp,
  FiX,
  FiZap,
} from "react-icons/fi";

import Image from "next/image";
import { Orbitron, Russo_One, JetBrains_Mono } from "next/font/google";

const russoOne = Russo_One({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-russo",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600", "700"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-orbitron",
});

const NAV_SCI_NODES = 26;
const SCROLL_REVEAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const scrollRevealGroup = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.95,
      ease: SCROLL_REVEAL_EASE,
      staggerChildren: 0.2,
      delayChildren: 0.08,
    },
  },
};

const scrollRevealItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: SCROLL_REVEAL_EASE },
  },
};

const projectRevealGroup = {
  hidden: { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: SCROLL_REVEAL_EASE,
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

const projectRevealItem = {
  hidden: { opacity: 0, x: -24, scale: 0.99 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5, ease: SCROLL_REVEAL_EASE },
  },
};

const inquiryRevealGroup = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: SCROLL_REVEAL_EASE,
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const inquiryRevealItem = {
  hidden: { opacity: 0, x: -16, y: 8 },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: { duration: 0.5, ease: SCROLL_REVEAL_EASE },
  },
};

const normalizeSkillKey = (value: string) =>
  value.toLowerCase().replace(/[^a-z0-9]/g, "");

const TECH_ICON_MAP: Record<string, IconType> = {
  html: SiHtml5,
  css: SiCss,
  php: SiPhp,
  tailwindcss: SiTailwindcss,
  typescript: SiTypescript,
  react: SiReact,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  restapis: FiCode,
  mysql: SiMysql,
  supabase: SiSupabase,
  prisma: SiPrisma,
  sql: SiSqlite,
};

const TOOL_ICON_MAP: Record<string, IconType> = {
  figma: SiFigma,
  postman: SiPostman,
  vscode: SiVscodium,
  jira: SiJira,
  xampp: SiXampp,
  laragon: SiLaragon,
};

const ALL_SKILLS_ICON_MAP: Record<string, IconType> = {
  ...TECH_ICON_MAP,
  ...TOOL_ICON_MAP,
};

const PROJECT_TECH_ICON_MAP: Record<string, IconType> = {
  ...ALL_SKILLS_ICON_MAP,
  html: SiHtml5,
  css: SiCss,
  javascript: SiJavascript,
  typescript: SiTypescript,
  php: SiPhp,
  react: SiReact,
  nextjs: SiNextdotjs,
  nodejs: SiNodedotjs,
  tailwindcss: SiTailwindcss,
  laravel: SiLaravel,
  supabase: SiSupabase,
  prisma: SiPrisma,
  postgresql: SiPostgresql,
  mysql: SiMysql,
  mysqlmariadb: SiMysql,
  mariadb: SiMariadb,
  sqlite: SiSqlite,
  sql: SiSqlite,
  vite: SiVite,
  reactrouter: SiReactrouter,
  bootstrap: SiBootstrap,
  bootstrap4: SiBootstrap,
  jquery: SiJquery,
  composer: SiComposer,
  vercel: SiVercel,
  vercelblobstorage: SiVercel,
  jspdf: FiFileText,
  dompdf: FiFileText,
  phpword: FiFileText,
  phpmailer: FiMail,
  adminlte: FiLayout,
  restapis: FiCode,
};

function ProjectSciFiWidget({ index }: { index: number }) {
  const widgetType = index % 5;

  if (widgetType === 0) {
    return (
      <div className="relative min-h-[110px] w-full p-2 flex flex-wrap items-center justify-around gap-4 pointer-events-none select-none">
        {/* Floating Spinning Radar Orb */}
        <div className="relative flex size-14 items-center justify-center rounded-full border-2 border-dashed border-black/25 bg-black/[0.03]">
          <FiCompass className="size-6 text-black/70 animate-spin [animation-duration:12s]" />
          <span className="absolute size-3 rounded-full bg-black/60 animate-ping" />
        </div>

        {/* Scattered Telemetry Chips */}
        <div className="flex flex-col gap-1.5">
          <span className="rounded-md border border-black/15 bg-white px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.24em] text-black shadow-2xs">
            RADAR_SCOPE // 98.4MHz
          </span>
          <span className="rounded-md border border-black/15 bg-black/5 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-black/60">
            [ FREQ_SCAN // ACTIVE ]
          </span>
        </div>

        {/* Scattered Equalizer Stream */}
        <div className="flex items-center gap-1">
          {[40, 80, 55, 95, 60, 85].map((val, i) => (
            <div key={i} className="flex h-9 w-1.5 flex-col justify-end rounded-full bg-black/10">
              <div
                className="w-full rounded-full bg-black/80 transition-all duration-500"
                style={{ height: `${val}%` }}
              />
            </div>
          ))}
        </div>

        {/* Floating Bracket Corner Tag */}
        <div className="text-[10px] font-extrabold uppercase tracking-widest text-black/40">
          + [ SYS_CORE_01 ]
        </div>
      </div>
    );
  }

  if (widgetType === 1) {
    return (
      <div className="relative min-h-[110px] w-full p-2 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] pointer-events-none select-none">
        {/* Scattered Cyber Code Lines */}
        <div className="rounded-lg border border-black/15 bg-white/90 p-2.5 shadow-2xs space-y-1">
          <p className="font-bold text-black">&gt; EXEC_CYBER_MATRIX() [OK]</p>
          <p className="text-black/60">&gt; LATENCY: 0.12ms // BUFFER_SYNC</p>
        </div>

        {/* Scattered Spinning CPU & Ping Badge */}
        <div className="flex items-center gap-2 rounded-full border border-black/15 bg-black/5 px-3 py-1.5">
          <FiCpu className="size-4 text-black animate-spin [animation-duration:8s]" />
          <span className="font-extrabold tracking-widest text-black/70 uppercase">CYBER_CORE</span>
        </div>

        {/* Floating Hex Coordinate */}
        <span className="rounded-md border border-black/10 bg-black text-white px-2 py-1 text-[9px] font-black tracking-widest">
          0x4F_STREAM
        </span>
      </div>
    );
  }

  if (widgetType === 2) {
    return (
      <div className="relative min-h-[110px] w-full p-2 flex flex-wrap items-center justify-around gap-4 pointer-events-none select-none">
        {/* Scattered Network Nodes */}
        <div className="flex items-center gap-2">
          <div className="flex size-10 items-center justify-center rounded-xl border border-black/20 bg-white shadow-2xs">
            <FiShare2 className="size-5 text-black animate-pulse" />
          </div>
          <div className="space-y-0.5">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black">MESH_TOPOLOGY</p>
            <p className="text-[9px] font-bold uppercase tracking-widest text-black/40">NODE_04 // ACTIVE</p>
          </div>
        </div>

        {/* Scattered Floating Pill Tags */}
        <div className="flex flex-wrap gap-1.5">
          {["DOCS", "LOGS", "SYNC", "WORKFLOW"].map((tag, i) => (
            <span key={i} className="rounded-full border border-black/15 bg-white px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-black shadow-2xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (widgetType === 3) {
    return (
      <div className="relative min-h-[110px] w-full p-2 flex flex-col justify-center gap-3 pointer-events-none select-none">
        {/* Floating Power Bar & Scattered Badges */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FiZap className="size-4 text-black animate-bounce" />
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-black">QUANTUM_MATRIX // 98.4%</span>
          </div>
          <span className="rounded-md border border-black/15 bg-black text-white px-2 py-0.5 text-[9px] font-black tracking-widest">
            1.21 GW
          </span>
        </div>

        {/* Scattered Segmented LED Blocks */}
        <div className="grid grid-cols-12 gap-1.5">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className={cx(
                "h-2.5 rounded-2xs transition-all duration-300",
                i < 10 ? "bg-black shadow-2xs" : "bg-black/10"
              )}
            />
          ))}
        </div>
      </div>
    );
  }

  // Widget 4: Analytics Sonar & Trend Matrix Objects
  return (
    <div className="relative min-h-[110px] w-full p-2 flex flex-wrap items-center justify-between gap-3 pointer-events-none select-none">
      {/* Scattered Trend Vector Icon & Badge */}
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl border-2 border-black/20 bg-white shadow-2xs">
          <FiTrendingUp className="size-5 text-black" />
        </div>
        <div>
          <span className="rounded-md border border-black/15 bg-black/5 px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.2em] text-black">
            SONAR_VECTOR
          </span>
          <p className="text-[10px] font-black uppercase tracking-widest text-black mt-1">+34.2% DATA TREND</p>
        </div>
      </div>

      {/* Floating Coordinates & HUD Bracket Marks */}
      <div className="flex items-center gap-2">
        <span className="rounded-lg border border-black/15 bg-white px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-black shadow-2xs">
          STREAM_v4
        </span>
        <span className="text-[10px] font-extrabold tracking-widest text-black/40">
          ┌ 0x8F ┐
        </span>
      </div>
    </div>
  );
}



const SKILL_CODE_SNIPPETS: Record<string, string> = {
  html: "<section id='portfolio'></section>",
  css: ".card { border-radius: 12px; font-family: sans-serif; }",
  javascript: "const app = () => { console.log('JS ready'); };",
  typescript: "type Stack = 'TS'; const strict = true;",
  php: "<?php echo 'Backend API connected'; ?>",
  tailwindcss: "className='grid gap-4 md:grid-cols-2'",
  react: "const [state, setState] = useState(true);",
  nextjs: "export default async function Page() { return <Layout />; }",
  nodejs: "app.get('/api/v1', (req, res) => res.json({ ok: true }));",
  restapis: "GET /api/v1/resources -> 200 OK",
  mysql: "SELECT * FROM projects WHERE status = 'active';",
  mysqlmariadb: "SELECT * FROM internship_logs WHERE status = 'approved';",
  mariadb: "SELECT * FROM tracer_alumni ORDER BY year DESC;",
  supabase: "await supabase.from('resumes').select('*');",
  prisma: "await prisma.project.findMany({ include: { stack: true } });",
  postgresql: "CREATE TABLE users (id SERIAL PRIMARY KEY, role TEXT);",
  sqlite: "SELECT * FROM skills WHERE level >= 1;",
  sql: "SELECT * FROM skills WHERE level >= 1;",
  vite: "export default defineConfig({ plugins: [react()] });",
  reactrouter: "<Route path='/dashboard' element={<Dashboard />} />",
  bootstrap: "<div className='row shadow-sm rounded-lg'>",
  bootstrap4: "<div className='card border-0 shadow-sm p-4'>",
  jquery: "$('#btn').on('click', () => { $.ajax('/api'); });",
  composer: "composer require phpmailer/phpmailer phpword/phpword",
  vercel: "vercel deploy --prod --yes",
  vercelblobstorage: "await put('avatar.png', file, { access: 'public' });",
  jspdf: "const doc = new jsPDF(); doc.text('Resume PDF', 10, 10);",
  dompdf: "$dompdf = new Dompdf(); $dompdf->loadHtml($html);",
  phpword: "$phpWord = new PhpWord(); $section = $phpWord->addSection();",
  phpmailer: "$mail->send(); // Email verification dispatched",
  adminlte: "<div className='wrapper'><aside className='main-sidebar'>",
  figma: "Frame -> Components -> Auto Layout",
  postman: "GET /api/health  // 200 OK",
  vscode: "Ctrl+Shift+P  // Command Palette",
  jira: "Sprint: TODO -> IN_PROGRESS -> DONE",
  xampp: "Apache / MySQL Server Running",
  laragon: "Virtual Host Created -> http://app.test",
};

const getSkillCode = (label: string) =>
  SKILL_CODE_SNIPPETS[normalizeSkillKey(label)] ?? `// ${label}`;

const PROJECT_HOVER_IMAGE_MAP: Record<string, string> = {
  "/projects/dilms.png": "/projects/dilms2.png",
  "/projects/Resumeasy.png": "/projects/ResumEasy2.png",
  "/projects/SIPP.png": "/projects/SIPP2.png",
  "/projects/rentit.png": "/projects/rentit2.jpg",
  "/projects/Alumytics.png": "/projects/Alumytics2.png",
};

function ProjectLiveCodeTerminal({ techStack }: { techStack: string[] }) {
  const [techIndex, setTechIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentTech = techStack[techIndex % techStack.length] || "TypeScript";
  const fullCode = SKILL_CODE_SNIPPETS[normalizeSkillKey(currentTech)] ?? `// ${currentTech} implementation module`;

  useEffect(() => {
    setTechIndex(0);
    setCharIndex(0);
    setIsDeleting(false);
  }, [techStack]);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (!isDeleting && charIndex < fullCode.length) {
      timer = setTimeout(() => setCharIndex((c) => c + 1), 32);
    } else if (!isDeleting && charIndex === fullCode.length) {
      timer = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex > 0) {
      timer = setTimeout(() => setCharIndex((c) => c - 1), 16);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTechIndex((i) => (i + 1) % techStack.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, fullCode, techStack]);

  const Icon = PROJECT_TECH_ICON_MAP[normalizeSkillKey(currentTech)] ?? FiCode;

  return (
    <div className="project-live-terminal relative overflow-hidden rounded-2xl border border-black/10 bg-white p-4 font-mono text-xs text-black shadow-xs">
      {/* Terminal Window Header */}
      <div className="flex items-center justify-between border-b border-black/10 pb-2.5 mb-3 text-[10px]">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="terminal-dot size-2 rounded-full bg-black/30" />
            <span className="terminal-dot size-2 rounded-full bg-black/50" />
            <span className="terminal-dot terminal-dot--active size-2 rounded-full bg-black" />
          </div>
          <span className="ml-2 font-extrabold tracking-widest uppercase text-black/50">
            LIVE_STACK_STREAM.TSX
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="terminal-cursor size-1.5 rounded-full bg-black animate-ping" />
          <span className="font-extrabold uppercase tracking-widest text-black text-[9px]">
            STREAMING ({techIndex + 1}/{techStack.length})
          </span>
        </div>
      </div>

      {/* Active Code Typing Line */}
      <div className="space-y-2 min-h-[52px] flex flex-col justify-center">
        <div className="flex items-center gap-2 text-black/80">
          <span className="terminal-icon-badge flex size-5 items-center justify-center rounded bg-black/5 text-black">
            <Icon className="size-3" aria-hidden />
          </span>
          <span className="font-bold text-black text-[11px] uppercase tracking-wider">
            {currentTech}
          </span>
          <span className="text-black/40 text-[10px]">&gt;</span>
        </div>

        <div className="terminal-code-box rounded-lg p-2.5 border border-black/10 bg-black/5 font-mono text-[11px] leading-relaxed text-black font-semibold overflow-x-auto scrollbar-none">
          <code>
            {fullCode.slice(0, charIndex)}
            <span className="terminal-cursor inline-block w-1.5 h-3.5 bg-black align-middle animate-pulse ml-0.5" />
          </code>
        </div>
      </div>
    </div>
  );
}

function SkillChip({ label, iconMap }: { label: string; iconMap: Record<string, IconType> }) {
  const Icon = iconMap[normalizeSkillKey(label)] ?? FiBox;
  const [hovered, setHovered] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const code = getSkillCode(label);

  useEffect(() => {
    if (!hovered) {
      setTypedCount(0);
      return;
    }

    const isDone = typedCount >= code.length;
    const delay = isDone ? 999999 : 24;
    const t = window.setTimeout(() => {
      setTypedCount((v) => (v >= code.length ? v : v + 1));
    }, delay);

    return () => window.clearTimeout(t);
  }, [hovered, typedCount, code]);

  return (
    <div
      className="group skill-chip-row relative flex items-center gap-3 overflow-hidden rounded-xl border border-black/10 bg-white px-3 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-black/25 hover:shadow-[0_12px_24px_-16px_rgba(0,0,0,0.35)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span className="skill-chip-row__icon flex size-8 items-center justify-center rounded-lg border border-black/10 bg-black/[0.03] text-black/80 transition-colors duration-300">
        <Icon className="size-4" aria-hidden />
      </span>
      <span className="relative z-[1] text-sm font-semibold text-black/80">{label}</span>
      <span className="skill-chip-row__code pointer-events-none hidden min-w-0 flex-1 items-center overflow-hidden pl-5 sm:flex">
        <span className="skill-chip-row__typing font-mono text-[10px] font-semibold tracking-[0.08em] text-black/35">
          {hovered ? code.slice(0, typedCount) : ""}
          {hovered ? <span aria-hidden className="skill-typing-caret">|</span> : null}
        </span>
      </span>
    </div>
  );
}

function SkillTile({ label, iconMap }: { label: string; iconMap: Record<string, IconType> }) {
  const Icon = iconMap[normalizeSkillKey(label)] ?? FiBox;
  return (
    <div className="skill-chip" title={label} aria-label={label}>
      <Icon className="skill-chip__icon" aria-hidden />
      <span className="sr-only">{label}</span>
    </div>
  );
}

function SkillsMarqueeCarousel({ items }: { items: string[] }) {
  const loopItems = [...items, ...items];
  return (
    <div className="mt-8 flex justify-center">
      <div className="skill-marquee skill-marquee--wide" aria-label="Skills carousel">
        <div className="skill-marquee__track" aria-hidden={false}>
          {loopItems.map((item, i) => (
            <SkillTile key={`${item}-${i}`} label={item} iconMap={ALL_SKILLS_ICON_MAP} />
          ))}
        </div>
      </div>
    </div>
  );
}

/** InfiltrationHero-style falling streaks — full-page backdrop behind all content */
const PORTFOLIO_RAIN_LINES: readonly {
  left: number;
  top: number;
  height: string;
  duration: string;
  delay: string;
}[] = [
    { left: 2, top: 0, height: "100%", duration: "4.2s", delay: "-0.5s" },
    { left: 7, top: 0, height: "100%", duration: "3.6s", delay: "-1.2s" },
    { left: 13, top: 0, height: "100%", duration: "3.2s", delay: "-2.1s" },
    { left: 19, top: 0, height: "100%", duration: "5s", delay: "-0.3s" },
    { left: 25, top: 0, height: "100%", duration: "2.9s", delay: "-1.8s" },
    { left: 31, top: 0, height: "100%", duration: "4.1s", delay: "-2.6s" },
    { left: 37, top: 0, height: "100%", duration: "3.7s", delay: "-0.9s" },
    { left: 43, top: 0, height: "100%", duration: "4.8s", delay: "-3.1s" },
    { left: 49, top: 0, height: "100%", duration: "2.6s", delay: "-1.4s" },
    { left: 55, top: 0, height: "100%", duration: "3.9s", delay: "-2.2s" },
    { left: 61, top: 0, height: "100%", duration: "3.4s", delay: "-0.6s" },
    { left: 67, top: 0, height: "100%", duration: "4.5s", delay: "-2.9s" },
    { left: 73, top: 0, height: "100%", duration: "2.4s", delay: "-1.1s" },
    { left: 79, top: 0, height: "100%", duration: "3.8s", delay: "-3.5s" },
    { left: 85, top: 0, height: "100%", duration: "3s", delay: "-1.7s" },
    { left: 91, top: 0, height: "100%", duration: "3.5s", delay: "-2.4s" },
    { left: 97, top: 0, height: "100%", duration: "4.6s", delay: "-0.8s" },
    { left: 5, top: 0, height: "100%", duration: "2.5s", delay: "-3.2s" },
    { left: 16, top: 0, height: "100%", duration: "2.7s", delay: "-1.5s" },
    { left: 28, top: 0, height: "100%", duration: "2.8s", delay: "-2.8s" },
    { left: 40, top: 0, height: "100%", duration: "2.3s", delay: "-0.2s" },
    { left: 52, top: 0, height: "100%", duration: "3.3s", delay: "-1.9s" },
    { left: 64, top: 0, height: "100%", duration: "4.3s", delay: "-2.7s" },
    { left: 76, top: 0, height: "100%", duration: "3.1s", delay: "-0.4s" },
    { left: 88, top: 0, height: "100%", duration: "3.6s", delay: "-3s" },
  ];

function HeaderNav({
  isDarkMode,
  onToggleTheme,
}: {
  isDarkMode: boolean;
  onToggleTheme: () => void;
}) {
  const items = [
    ["Education", "#education"],
    ["Skills", "#skills"],
    ["Project", "#project"],
    ["Achievements", "#achievements"],
    ["Contact", "#contact"],
  ] as const;
  const browserStateByHref: Record<string, { title: string; icon: string }> = {
    "#top": { title: "Malillos | Identity", icon: "/tab-identity.svg" },
    "#education": { title: "Malillos | Education", icon: "/tab-education.svg" },
    "#skills": { title: "Malillos | Skills", icon: "/tab-skills.svg" },
    "#project": { title: "Malillos | Project", icon: "/tab-project.svg" },
    "#achievements": { title: "Malillos | Achievements", icon: "/tab-achievements.svg" },
    "#contact": { title: "Malillos | Contact", icon: "/tab-contact.svg" },
  };
  const [activeHref, setActiveHref] = useState<(typeof items)[number][1]>("#education");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handleNavClick = (href: string, closeMobile = false) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.querySelector(href);
    if (!(target instanceof HTMLElement)) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    window.history.replaceState(null, "", href);
    if (closeMobile) setMobileNavOpen(false);
  };

  useEffect(() => {
    const sectionIds = items.map(([, href]) => href.replace("#", ""));

    const updateActive = () => {
      const anchorLine = window.innerHeight * 0.28;
      let current: (typeof items)[number][1] = items[0][1];

      for (const [, href] of items) {
        const el = document.getElementById(href.replace("#", ""));
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= anchorLine) current = href;
      }

      setActiveHref(current);
    };

    updateActive();
    window.addEventListener("scroll", updateActive, { passive: true });
    window.addEventListener("resize", updateActive);
    window.addEventListener("hashchange", updateActive);
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) el.addEventListener("transitionend", updateActive);
    });

    return () => {
      window.removeEventListener("scroll", updateActive);
      window.removeEventListener("resize", updateActive);
      window.removeEventListener("hashchange", updateActive);
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.removeEventListener("transitionend", updateActive);
      });
    };
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileNavOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    const state = browserStateByHref[activeHref] ?? browserStateByHref["#top"];
    if (state) {
      document.title = state.title;
      const cacheBustedHref = `${state.icon}?v=${activeHref.replace("#", "") || "top"}`;

      const upsertIconLink = (id: string, rel: string) => {
        const iconLink =
          (document.getElementById(id) as HTMLLinkElement | null) ??
          (document.createElement("link") as HTMLLinkElement);
        iconLink.id = id;
        iconLink.rel = rel;
        iconLink.type = "image/svg+xml";
        iconLink.href = cacheBustedHref;
        if (!iconLink.parentNode) document.head.appendChild(iconLink);
      };

      upsertIconLink("dynamic-favicon", "icon");
      upsertIconLink("dynamic-shortcut-icon", "shortcut icon");
    }
  }, [activeHref]);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  return (
    <div className="sticky top-0 z-50 relative isolate w-full min-w-0">
      <header className="relative z-[2] overflow-x-clip border-b border-black/10 bg-white/95">
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          <div className="nav-topbar-hud" aria-hidden>
            <div className="nav-topbar-hud__grid" />
            <div className="nav-topbar-hud__shine" />
            <span className="nav-topbar-hud__corner nav-topbar-hud__corner--tl" />
            <span className="nav-topbar-hud__corner nav-topbar-hud__corner--tr" />
            <span className="nav-topbar-hud__corner nav-topbar-hud__corner--bl" />
            <span className="nav-topbar-hud__corner nav-topbar-hud__corner--br" />
          </div>
          <div className="nav-holo" aria-hidden>
            <div className="nav-holo__tunnel" />
            <div className="nav-holo__sweep" />
            <div className="nav-holo__noise" />
            <div className="nav-holo__ticks" />
            <div className="nav-holo__scans" />
            <NavHoloShapes />
          </div>
          <Container>
            <div className="relative z-[2] flex h-16 items-center sm:grid sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] sm:items-center">
              <a
                className="min-w-0 shrink-0 justify-self-start text-black sm:pr-2"
                href="#top"
                aria-label="Back to top"
                onClick={handleNavClick("#top")}
              >
                <span className="inline-flex items-center gap-2.5 px-1 py-0.5">
                  <span className="inline-flex flex-col items-center">
                    <SiLaravel className="h-4 w-4" aria-hidden />
                    <span className="mt-1 inline-flex items-center gap-2">
                      <SiReact className="h-4 w-4" aria-hidden />
                      <SiNodedotjs className="h-4 w-4" aria-hidden />
                    </span>
                  </span>
                  <span className="inline text-[9px] font-bold uppercase tracking-[0.14em] text-black/85 sm:text-[11px] sm:tracking-[0.18em] [font-family:var(--font-orbitron)]">
                    E Portfolio
                  </span>
                </span>
              </a>

              <nav
                className="hidden items-center justify-center gap-4 text-sm font-medium sm:col-start-2 sm:flex sm:gap-5"
                aria-label="Primary"
              >
                {items.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={handleNavClick(href)}
                    className={cx("nav-link-holo", activeHref === href && "nav-link-holo--active")}
                    aria-current={activeHref === href ? "page" : undefined}
                  >
                    {label}
                  </a>
                ))}
              </nav>

              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                className="theme-toggle theme-toggle--switch hidden justify-self-end sm:inline-flex"
              >
                <span className="theme-toggle-switch__track" aria-hidden>
                  <span
                    className={cx(
                      "theme-toggle-switch__thumb",
                      isDarkMode && "theme-toggle-switch__thumb--dark",
                    )}
                  >
                    {isDarkMode ? (
                      <FiMoon className="size-3.5" aria-hidden />
                    ) : (
                      <FiSun className="size-3.5" aria-hidden />
                    )}
                  </span>
                </span>
                <span className="sr-only">{isDarkMode ? "Light" : "Dark"}</span>
              </button>

              <button
                type="button"
                className="ml-auto inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/20 bg-white text-black sm:hidden"
                aria-label={mobileNavOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileNavOpen}
                aria-controls="mobile-sidebar-nav"
                onClick={() => setMobileNavOpen((open) => !open)}
              >
                {mobileNavOpen ? (
                  <FiX className="h-5 w-5" aria-hidden />
                ) : (
                  <FiMenu className="h-5 w-5" aria-hidden />
                )}
              </button>
            </div>
          </Container>
        </motion.div>
      </header>

      <div
        className={cx(
          "fixed inset-0 z-[60] bg-black/30 transition-opacity duration-300 sm:hidden",
          mobileNavOpen ? "opacity-100 pointer-events-auto" : "pointer-events-none opacity-0",
        )}
        onClick={() => setMobileNavOpen(false)}
        aria-hidden={!mobileNavOpen}
      />

      <aside
        id="mobile-sidebar-nav"
        data-mode={isDarkMode ? "dark" : "light"}
        className={cx(
          "mobile-sidebar fixed left-0 top-0 z-[70] h-screen w-[min(82vw,18rem)] border-r border-black/15 bg-white shadow-2xl transition-transform duration-300 ease-out sm:hidden",
          mobileNavOpen ? "translate-x-0" : "-translate-x-full",
        )}
        aria-label="Mobile navigation"
      >
        <div className="flex h-16 items-center justify-between border-b border-black/10 px-4">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-black/65">Navigation</span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              className="theme-toggle theme-toggle--switch theme-toggle--switch-sm inline-flex"
            >
              <span className="theme-toggle-switch__track" aria-hidden>
                <span
                  className={cx(
                    "theme-toggle-switch__thumb",
                    isDarkMode && "theme-toggle-switch__thumb--dark",
                  )}
                >
                  {isDarkMode ? (
                    <FiMoon className="h-4 w-4" aria-hidden />
                  ) : (
                    <FiSun className="h-4 w-4" aria-hidden />
                  )}
                </span>
              </span>
            </button>
            <button
              type="button"
              className="mobile-nav-close-btn inline-flex h-9 w-9 items-center justify-center rounded-md border border-black/20 text-black"
              aria-label="Close menu"
              onClick={() => setMobileNavOpen(false)}
            >
              <FiX className="mobile-nav-close-icon h-4 w-4 [stroke-width:2.7]" aria-hidden />
            </button>
          </div>
        </div>
        <nav className="flex flex-col px-3 py-3" aria-label="Sidebar">
          {items.map(([label, href]) => (
            <a
              key={`mobile-${href}`}
              href={href}
              onClick={handleNavClick(href, true)}
              className={cx(
                "rounded-md px-3 py-2.5 text-sm font-medium tracking-wide text-black/70 transition-colors hover:bg-black/[0.04] hover:text-black",
                activeHref === href &&
                (isDarkMode
                  ? "mobile-sidebar-link-active-dark"
                  : "mobile-sidebar-link-active-light"),
              )}
              aria-current={activeHref === href ? "page" : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Sci-fi HUD line: scan sweep + grid + pulsing nodes */}
      <div className="nav-sci-edge" aria-hidden>
        <div className="nav-sci-edge__ambient" />
        <div className="nav-sci-edge__grid" />
        <div className="nav-sci-edge__bleed" />
        <div className="nav-sci-edge__rail">
          <div className="nav-sci-edge__rail-core" />
          <div className="nav-sci-edge__scan" />
          <div className="nav-sci-edge__scan nav-sci-edge__scan--echo" />
          <div className="nav-sci-edge__nodes">
            {Array.from({ length: NAV_SCI_NODES }, (_, i) => (
              <span
                key={i}
                className="nav-sci-edge__node"
                style={{ animationDelay: `${(i / NAV_SCI_NODES) * 2.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function InfiltrationHero({ show, onProceed }: { show: boolean; onProceed: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [typedCount, setTypedCount] = useState(0);
  const [statusOpened, setStatusOpened] = useState(false);
  const statusText =
    "Core systems bypassed. Identity confirmed. User session established within protected archive.";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!show) {
      setTypedCount(0);
      return;
    }

    const isDone = typedCount >= statusText.length;
    const delay = isDone ? 1300 : 28;
    const timer = window.setTimeout(() => {
      setTypedCount((current) => (current >= statusText.length ? 0 : current + 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [show, typedCount, statusText.length]);

  useEffect(() => {
    if (!show) {
      setStatusOpened(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setStatusOpened(true);
    }, 650);

    return () => window.clearTimeout(timer);
  }, [show]);

  const heroEase: [number, number, number, number] = [0.22, 1, 0.36, 1];
  const dropEase: [number, number, number, number] = [0.12, 0.85, 0.25, 1];

  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  };

  const itemVars = {
    hidden: { y: 24, opacity: 0, filter: "blur(6px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.75, ease: heroEase },
    },
  };

  const titleDropVars = {
    hidden: { y: -140, opacity: 0, scale: 1.06, filter: "blur(6px)" },
    visible: {
      y: [-140, 18, 0],
      opacity: 1,
      scale: [1.06, 0.96, 1],
      filter: "blur(0px)",
      transition: {
        y: { duration: 0.9, times: [0, 0.78, 1], ease: dropEase, delay: 0.05 },
        scale: { duration: 0.7, times: [0, 0.65, 1], ease: heroEase, delay: 0.05 },
        opacity: { duration: 0.2, delay: 0.05 },
        filter: { duration: 0.2, delay: 0.06 },
      },
    },
  };

  const impactVars = {
    hidden: { opacity: 0, scale: 0.4 },
    visible: {
      opacity: [0, 0.35, 0],
      scale: [0.4, 1.12, 1.45],
      transition: {
        duration: 0.45,
        delay: 0.72,
        ease: heroEase,
        times: [0, 0.45, 1],
      },
    },
  };

  const hudVars = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1.1, ease: heroEase, delay: 0.25 },
    },
  };

  const lineVars = {
    hidden: { scaleY: 0.65, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 0.7,
      transition: { duration: 1, ease: heroEase, delay: 0.35 },
    },
  };

  if (!show && mounted) return null;

  return (
    <motion.div
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      variants={containerVars}
      className={`${russoOne.variable} ${jetbrainsMono.variable} relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-white px-5 py-20 text-center`}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.02),transparent_70%)]" />
      <div className="intro-data-stream !opacity-5" />
      <motion.div variants={hudVars} className="hero-hud-ring hero-hud-ring-sm" />
      <motion.div variants={hudVars} className="hero-hud-ring hero-hud-ring-lg" />
      <motion.div variants={hudVars} className="hero-hud-circuit" />
      <motion.div variants={hudVars} className="hero-hud-scan" />
      <motion.div variants={lineVars} className="hero-scanline-v left-[15%] h-[70vh] top-[5%] origin-top" style={{ animationDelay: "-0.5s" }} />
      <motion.div variants={lineVars} className="hero-scanline-v left-[35%] h-[40vh] top-[40%] origin-top" style={{ animationDelay: "-1.2s" }} />
      <motion.div variants={lineVars} className="hero-scanline-v left-[65%] h-[60vh] top-[10%] origin-top" style={{ animationDelay: "-2.1s" }} />
      <motion.div variants={lineVars} className="hero-scanline-v left-[85%] h-[30vh] top-[60%] origin-top" style={{ animationDelay: "-0.8s" }} />
      <motion.div variants={lineVars} className="hero-scanline-v left-[92%] h-[80vh] top-[0%] origin-top" style={{ animationDelay: "-1.7s" }} />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <motion.div variants={itemVars} className="flex flex-col items-center gap-2">
          <div className="h-px w-24 bg-black/20 intro-line-expand" />
          <p
            className={cx(
              "hero-status-row font-mono text-[10px] uppercase tracking-[0.5em] text-black/40",
              statusOpened && "is-open",
            )}
          >
            <span aria-hidden className="hero-status-brace hero-status-brace-open">[</span>
            <span className="hero-status-gate">
              <span className="hero-status-text">SYSTEM_OVERRIDE_COMPLETE</span>
            </span>
            <span aria-hidden className="hero-status-brace hero-status-brace-close">]</span>
          </p>
        </motion.div>

        <motion.div className="relative">
          <motion.h1 variants={titleDropVars} className="hero-distort font-russo text-[8vw] font-black leading-tight tracking-tighter text-black uppercase sm:text-[6vw]">
            <span className="relative z-10">
              Portfolio <span className="text-zinc-700">Infiltrated</span><br />
              <span className="text-zinc-700">Successfully</span>
            </span>
            <span aria-hidden className="hero-distort-layer hero-distort-layer-a">
              Portfolio <span className="text-zinc-700">Infiltrated</span><br />
              <span className="text-zinc-700">Successfully</span>
            </span>
            <span aria-hidden className="hero-distort-layer hero-distort-layer-b">
              Portfolio <span className="text-zinc-700">Infiltrated</span><br />
              <span className="text-zinc-700">Successfully</span>
            </span>
          </motion.h1>
          <motion.div
            variants={impactVars}
            className="pointer-events-none absolute left-1/2 top-full h-10 w-44 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/25 blur-xl"
          />
          <div className="absolute -right-4 -top-4 font-mono text-[10px] text-black/20 animate-pulse">
            ERR_403_BYRIDDEN
          </div>
        </motion.div>

        <motion.div variants={itemVars} className="flex flex-col items-center gap-6">
          <p className="h-[3.5rem] max-w-md font-mono text-xs uppercase tracking-widest text-black/60 leading-relaxed">
            {statusText.slice(0, typedCount)}
            <span aria-hidden className="hero-typing-cursor">|</span>
          </p>

          <div className="flex items-center gap-4">
            <div className="h-2 w-2 rounded-full bg-black animate-ping" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
              Connection: STABLE // AUTH: GRANTED
            </span>
          </div>
        </motion.div>

        <motion.button
          variants={itemVars}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98, y: 0 }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          onClick={(e) => {
            e.preventDefault();
            onProceed();
            // Wait for unlock then scroll
            setTimeout(() => {
              const el = document.getElementById("overview");
              if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 150);
          }}
          className="sci-cta group relative isolate mt-8 overflow-hidden rounded-lg px-8 py-4 text-white"
        >
          <span className="sci-cta-scan pointer-events-none absolute inset-0" />
          <span className="sci-cta-pulse pointer-events-none absolute inset-0" />
          <span className="sci-cta-sweep pointer-events-none absolute -left-1/2 top-0 h-full w-1/2" />
          <span className="sci-cta-tracer pointer-events-none absolute bottom-1 left-2 h-[2px] w-8" />

          <span className="relative z-10 flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-[0.28em] text-white/60">[A1]</span>
            <span className="sci-cta-label font-russo text-xs uppercase tracking-[0.28em]">Get Started</span>
            <span className="font-mono text-sm text-white/70 transition-transform duration-300 group-hover:translate-x-1">
              &gt;
            </span>
          </span>
        </motion.button>
      </div>

      <motion.div variants={itemVars} className="absolute bottom-10 left-10 hidden font-mono text-[8px] uppercase tracking-widest text-black/20 sm:block">
        MD5_HASH: 7d44e29435709fd0...
      </motion.div>
      <motion.div variants={itemVars} className="absolute bottom-10 right-10 hidden font-mono text-[8px] uppercase tracking-widest text-black/20 sm:block">
        LOC: {mounted ? new Date().toISOString() : "LOADING..."}
      </motion.div>
    </motion.div>
  );
}

export default function Home() {
  const [introFinished, setIntroFinished] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState(0);
  const [openMilestoneId, setOpenMilestoneId] = useState<string | null>(null);
  const links = portfolio.contact.socials;
  const projects = portfolio.projects;
  const primaryProject = projects[0];
  const activeProject = projects[activeProjectIndex];
  const milestoneItems = [
    ...portfolio.achievements.map((m, i) => ({
      id: `ach-${i}`,
      type: "Achievement",
      title: m.title,
      meta: m.meta,
      details: m.details,
    })),
    ...portfolio.certifications.map((m, i) => ({
      id: `cert-${i}`,
      type: "Certification",
      title: m.title,
      meta: m.meta,
      details: m.details,
    })),
  ];

  const handleSmoothSectionJump =
    (href: string) => (event: MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault();
      const target = document.querySelector(href);
      if (!(target instanceof HTMLElement)) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      target.scrollIntoView({
        behavior: reduceMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", href);
    };

  useEffect(() => {
    const seen = sessionStorage.getItem("introSeen");
    if (seen) {
      setIntroFinished(true);
    }
  }, []);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      return;
    }
    if (savedTheme === "light") {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
    window.localStorage.setItem(
      "portfolio-theme",
      isDarkMode ? "dark" : "light",
    );
  }, [isDarkMode]);

  useEffect(() => {
    if (!unlocked) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [unlocked]);

  return (
    <div id="top" className="flex flex-1 flex-col">
      <IntroOverlay
        title="Welcome to My Portfolio"
        onComplete={() => setIntroFinished(true)}
      />
      <div
        data-theme-swap={isDarkMode ? "dark" : "light"}
        className={cx("min-h-screen", isDarkMode ? "bg-[#0d0d0d]" : "bg-white")}
      >
        <InfiltrationHero
          show={introFinished && !unlocked}
          onProceed={() => setUnlocked(true)}
        />

        {unlocked && (
          <motion.div
            initial={{ opacity: 0, x: -52 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeaderNav isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode((prev) => !prev)} />
            <main className="relative isolate flex-1">
              <div
                className="portfolio-rain-layer pointer-events-none absolute inset-0 z-0"
                aria-hidden
              >
                {PORTFOLIO_RAIN_LINES.map((line, i) => (
                  <span
                    key={i}
                    className="channel-rain-line"
                    style={
                      {
                        left: `${line.left}%`,
                        top: `${line.top}%`,
                        height: line.height,
                        "--channel-rain-dur": line.duration,
                        "--channel-rain-delay": line.delay,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>
              <div className="relative z-[1]">
                <div className="relative overflow-visible border-b border-black/5">
                  <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(60%_60%_at_50%_0%,rgba(0,0,0,0.03),transparent)]" />
                  <Container>
                    <section
                      id="overview"
                      className={`overview-hero relative scroll-mt-24 overflow-visible py-12 sm:py-16 lg:py-20 ${orbitron.variable} ${jetbrainsMono.variable}`}
                    >
                      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_24px_80px_-24px_rgba(0,0,0,0.12)]">
                        <div className="grid grid-cols-1 lg:grid-cols-12">
                          {/* Photo — fixed column, centered */}
                          <div className="flex items-center justify-center border-b border-black/10 bg-gradient-to-b from-black/[0.03] to-transparent px-6 py-10 lg:col-span-3 lg:border-b-0 lg:border-r lg:px-4 lg:py-12">
                            <div className="overview-avatar-frame relative flex size-[184px] shrink-0 items-center justify-center sm:size-[208px]">
                              <span
                                className="pointer-events-none absolute inset-0 rounded-full border-2 border-black/[0.08]"
                                aria-hidden
                              />
                              <span
                                className="overview-avatar-loader pointer-events-none absolute inset-0 rounded-full border-2 border-transparent border-t-black border-r-black/30"
                                aria-hidden
                              />
                              <div className="overview-profile-ring relative z-[1]">
                                <Image
                                  src={isDarkMode ? "/darkmodeprof.png" : "/Profile.jpg"}
                                  alt={portfolio.fullName}
                                  width={160}
                                  height={160}
                                  priority
                                  className={cx(
                                    "size-40 rounded-full object-cover",
                                    isDarkMode
                                      ? "origin-center scale-[1.22] object-[center_22%]"
                                      : "object-top"
                                  )}
                                  sizes="160px"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Identity + bio + CTAs */}
                          <div className="flex flex-col gap-7 border-b border-black/10 px-6 py-10 text-center lg:col-span-6 lg:border-b-0 lg:border-r lg:px-10 lg:py-12 lg:text-left">
                            <p className="overview-mono text-[10px] font-semibold uppercase tracking-[0.4em] text-black/45">
                              Operator profile
                            </p>

                            <div className="flex flex-wrap items-center justify-center gap-2 lg:justify-start">
                              <Pill>
                                <span className="overview-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
                                  {portfolio.professionalTitle}
                                </span>
                              </Pill>
                              {portfolio.contact.location ? (
                                <Pill>
                                  <span className="overview-mono text-[11px] font-semibold tracking-[0.14em] uppercase">
                                    {portfolio.contact.location}
                                  </span>
                                </Pill>
                              ) : null}
                            </div>

                            <div className="overview-name-wrap mx-auto max-w-full lg:mx-0">
                              <h1 className="relative text-balance text-3xl font-bold uppercase leading-[1.12] tracking-[0.03em] text-black sm:text-4xl lg:text-[2.35rem] lg:leading-[1.08]">
                                <span className="overview-name-scanline" aria-hidden />
                                <span className="relative z-[1]">{portfolio.fullName}</span>
                              </h1>
                            </div>

                            {primaryProject ? (
                              <p className="overview-mono mx-auto max-w-xl text-[0.9375rem] font-medium leading-[1.7] text-black/70 lg:mx-0 lg:max-w-2xl lg:text-base lg:font-semibold">
                                {primaryProject.description}
                              </p>
                            ) : null}

                            <div className="flex flex-col items-stretch gap-3 pt-1 sm:flex-row sm:justify-center lg:justify-start">
                              <a
                                className="overview-cta-primary overview-mono group relative inline-flex h-12 min-w-[10rem] items-center justify-center overflow-hidden rounded-lg bg-black px-6 text-[11px] font-bold uppercase tracking-[0.18em] text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                href="#contact"
                                onClick={handleSmoothSectionJump("#contact")}
                              >
                                <span
                                  className="overview-cta-primary-fill pointer-events-none absolute inset-y-0 left-0 w-14 origin-left -translate-x-px -skew-x-[14deg] bg-white transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:w-full group-hover:translate-x-0 group-hover:-skew-x-0"
                                  aria-hidden
                                />
                                <span className="overview-cta-hud-grid pointer-events-none absolute inset-0" aria-hidden />
                                <span className="overview-cta-hud-sweep pointer-events-none absolute inset-y-0 -left-1/2 w-1/2" aria-hidden />
                                <span className="cta-invert-label relative z-10">
                                  CONTACT_SYSTEM
                                </span>
                              </a>
                              <a
                                className="overview-cta-secondary overview-mono group relative inline-flex h-12 min-w-[10rem] items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-white px-6 text-[11px] font-bold uppercase tracking-[0.18em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                href="#project"
                                onClick={handleSmoothSectionJump("#project")}
                              >
                                <span
                                  className="overview-cta-secondary-fill pointer-events-none absolute inset-y-0 left-0 w-14 origin-left -translate-x-px -skew-x-[14deg] bg-black transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:w-full group-hover:translate-x-0 group-hover:-skew-x-0"
                                  aria-hidden
                                />
                                <span className="overview-cta-hud-grid pointer-events-none absolute inset-0" aria-hidden />
                                <span className="overview-cta-hud-sweep pointer-events-none absolute inset-y-0 -left-1/2 w-1/2" aria-hidden />
                                <span className="cta-invert-label relative z-10">
                                  VIEW_PROJECTS
                                </span>
                              </a>
                              <a
                                className="overview-cta-secondary overview-mono group relative inline-flex h-12 min-w-[10rem] items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-white px-6 text-[11px] font-bold uppercase tracking-[0.18em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                                href="/Malillos-Von-Asley-CV.pdf"
                                download
                              >
                                <span
                                  className="overview-cta-secondary-fill pointer-events-none absolute inset-y-0 left-0 w-14 origin-left -translate-x-px -skew-x-[14deg] bg-black transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:w-full group-hover:translate-x-0 group-hover:-skew-x-0"
                                  aria-hidden
                                />
                                <span className="overview-cta-hud-grid pointer-events-none absolute inset-0" aria-hidden />
                                <span className="overview-cta-hud-sweep pointer-events-none absolute inset-y-0 -left-1/2 w-1/2" aria-hidden />
                                <span className="cta-invert-label relative z-10">
                                  DOWNLOAD_CV
                                </span>
                              </a>
                            </div>
                          </div>

                          {/* Contact — compact stack + sci-fi HUD in margins only */}
                          <div className="channel-registry-col relative flex min-h-[280px] flex-col justify-center overflow-hidden px-6 py-10 lg:col-span-3 lg:min-h-[min(100%,360px)] lg:px-8 lg:py-12">
                            <div className="channel-registry-hud pointer-events-none absolute inset-0 z-0" aria-hidden>
                              <span className="channel-hud-grid" />
                              <span className="channel-hud-scan" />
                              <span className="channel-hud-radar" />
                              <span className="channel-hud-waves" />
                              <span className="channel-hud-node channel-hud-node--tr" />
                              <span className="channel-hud-node channel-hud-node--bl" />
                            </div>
                            <div className="relative z-10 flex flex-col gap-5">
                              <p className="overview-mono bg-white text-center text-[10px] font-medium uppercase tracking-[0.35em] text-black/40 lg:text-left">
                                Channel registry
                              </p>
                              <div className="flex flex-col divide-y divide-black/[0.08] rounded-xl border border-black/10 bg-white shadow-sm">
                                <div className="px-4 py-4">
                                  <p className="overview-mono mb-1.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-black/40">
                                    Email
                                  </p>
                                  <a
                                    className="overview-mono break-all text-sm font-medium text-black underline-offset-2 hover:underline"
                                    href={`mailto:${portfolio.contact.email}`}
                                  >
                                    {portfolio.contact.email}
                                  </a>
                                </div>

                                {portfolio.contact.phone ? (
                                  <div className="px-4 py-4">
                                    <p className="overview-mono mb-1.5 text-[9px] font-semibold uppercase tracking-[0.28em] text-black/40">
                                      Phone
                                    </p>
                                    <a
                                      className="overview-mono text-sm font-medium text-black underline-offset-2 hover:underline"
                                      href={`tel:${portfolio.contact.phone}`}
                                    >
                                      {portfolio.contact.phone}
                                    </a>
                                  </div>
                                ) : null}

                                {links.length ? (
                                  <div className="px-4 py-4">
                                    <p className="overview-mono mb-2 text-[9px] font-semibold uppercase tracking-[0.28em] text-black/40">
                                      Links
                                    </p>
                                    <div className="flex flex-wrap gap-x-4 gap-y-2">
                                      {links.map((s: any) => (
                                        <a
                                          key={s.label}
                                          className="overview-mono text-sm font-medium text-black underline-offset-2 hover:underline"
                                          href={s.href}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          {s.label}
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>
                  </Container>
                </div>

                <Container>
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={inquiryRevealGroup}
                  >
                    <Section
                      id="education"
                      className={cx(orbitron.variable, "section-heading-orbitron")}
                      heading={{
                        eyebrow: "Academic Pathway",
                        title: "Education & Specialization",
                        subtitle:
                          "Institutional degree and Service Management Program (IT-SMP) major.",
                      }}
                    >
                      <motion.div variants={scrollRevealGroup} className="grid gap-6">
                        {portfolio.education.map((edu, idx) => (
                          <motion.div key={idx} variants={scrollRevealItem}>
                            <Card className="group relative overflow-hidden border-2 border-black/10 bg-white p-6 lg:p-8 shadow-sm">
                              {/* Half of the Logo as Background on Mobile / Desktop Right */}
                              {edu.logoSrc && (
                                <div className="absolute inset-y-0 right-0 left-0 sm:left-auto sm:w-1/2 pointer-events-none overflow-hidden z-0 flex items-center justify-center sm:justify-end opacity-65 sm:opacity-95 transition-all duration-300">
                                  <div className="relative h-[85%] w-[85%] sm:h-[120%] sm:w-[120%] sm:translate-x-1/15 transition-transform duration-500 group-hover:scale-105">
                                    <Image
                                      src={edu.logoSrc}
                                      alt=""
                                      fill
                                      className="object-contain object-center sm:object-right"
                                      priority
                                    />
                                  </div>
                                  {/* Soft gradient edge transition matching current theme */}
                                  <div className="education-logo-overlay absolute inset-0 bg-gradient-to-b sm:bg-gradient-to-r from-white/40 via-white/60 to-transparent" />
                                </div>
                              )}

                              {/* Content Container (z-10) */}
                              <div className="relative z-10 space-y-6">
                                {/* Top Status & Meta Header */}
                                <div className="flex flex-wrap items-center justify-center sm:justify-between gap-3 border-b border-black/10 pb-4">
                                  <div className="flex items-center gap-2">
                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-black/5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-black">
                                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                      {edu.period}
                                    </span>
                                    <span className="rounded-full border border-black/10 bg-black/5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-black/70">
                                      Degree Spec
                                    </span>
                                  </div>
                                </div>

                                {/* Main Title & Major Banner */}
                                <div className="space-y-3 flex flex-col items-center sm:items-start text-center sm:text-left">
                                  <h3 className="text-2xl lg:text-3xl font-black tracking-tight text-black">
                                    {edu.degree}
                                  </h3>

                                  <div className="inline-flex flex-wrap items-center justify-center sm:justify-start gap-2 rounded-xl border border-black/20 bg-black/5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-black shadow-xs">
                                    <FiAward className="size-4 shrink-0 text-black" />
                                    <span>Major in Service Management Program (IT-SMP)</span>
                                  </div>

                                  <p className="flex items-center justify-center sm:justify-start gap-2 text-sm font-bold tracking-wide text-black/80">
                                    {edu.logoSrc ? (
                                      <Image src={edu.logoSrc} alt={edu.institution} width={22} height={22} className="size-5.5 object-contain shrink-0" />
                                    ) : (
                                      <FiBookOpen className="size-4 shrink-0 text-black/50" />
                                    )}
                                    <span>{edu.institution}</span>
                                  </p>
                                </div>

                                {/* Divider */}
                                <div className="my-6 border-t border-dashed border-black/15" />

                                {/* Overview & Key Highlights Grid */}
                                <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
                                  <div className="space-y-4 border-l-0 sm:border-l-2 border-black/80 pl-0 sm:pl-4 py-1 flex flex-col justify-between items-center sm:items-start text-center sm:text-left">
                                    <div className="space-y-3">
                                      <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-black/40">
                                        Program Overview
                                      </p>
                                      {edu.details && (
                                        <p className="text-sm leading-relaxed font-medium text-black/75">
                                          {edu.details}
                                        </p>
                                      )}
                                    </div>

                                    {edu.location && (
                                      <div className="mt-4 w-full rounded-xl border border-black/15 bg-black/5 p-3.5 flex items-center justify-center sm:justify-start gap-3 shadow-xs text-black transition-all hover:border-black/40 hover:bg-black/10">
                                        <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-black/15 bg-black/5 text-black">
                                          <FiMapPin className="size-5" />
                                        </div>
                                        <div className="text-left">
                                          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-black/40">
                                            Campus Location
                                          </p>
                                          <p className="text-sm font-black tracking-tight text-black">
                                            {edu.location}
                                          </p>
                                        </div>
                                      </div>
                                    )}
                                  </div>

                                  {edu.highlights && edu.highlights.length > 0 && (
                                    <div className="space-y-3">
                                      <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-black/40">
                                        Core Program Competencies
                                      </p>
                                      <div className="grid gap-2.5">
                                        {edu.highlights.map((h, hIdx) => (
                                          <div
                                            key={hIdx}
                                            className="group/item flex items-start gap-3 rounded-xl border border-black/10 bg-black/5 p-3 text-black shadow-xs transition-all hover:border-black/40 hover:bg-black/10"
                                          >
                                            <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-black/15 bg-black/10 text-[10px] font-bold text-black group-hover/item:bg-black group-hover/item:text-white transition-colors">
                                              0{hIdx + 1}
                                            </span>
                                            <span className="text-xs font-semibold leading-snug text-black/85">
                                              {h}
                                            </span>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        ))}
                      </motion.div>
                    </Section>
                  </motion.div>

                  <div className="section-sci-divider" aria-hidden>
                    <span className="section-sci-divider__core" />
                    <span className="section-sci-divider__scan" />
                    <span className="section-sci-divider__scan section-sci-divider__scan--echo" />
                  </div>

                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={scrollRevealGroup}
                  >
                    <Section
                      id="skills"
                      className={cx(orbitron.variable, "section-heading-orbitron")}
                      heading={{
                        eyebrow: "Capability",
                        title: "Technical Stack",
                        subtitle: "Core technologies, databases, and specialized developer tools.",
                      }}
                    >
                      <motion.div variants={scrollRevealGroup} className="grid gap-6 md:grid-cols-3">
                        {/* Card 1: Frontend & UI */}
                        <motion.div variants={scrollRevealItem} className="rounded-2xl border border-black/10 bg-gradient-to-b from-black/[0.02] to-transparent p-5">
                          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-black/40">
                            Frontend & UI
                          </h3>
                          <div className="grid grid-cols-1 gap-2">
                            {["HTML", "CSS", "TypeScript", "React", "Next.js", "Tailwind CSS"].map((skill) => (
                              <SkillChip key={skill} label={skill} iconMap={TECH_ICON_MAP} />
                            ))}
                          </div>
                        </motion.div>

                        {/* Card 2: Backend & Databases */}
                        <motion.div variants={scrollRevealItem} className="rounded-2xl border border-black/10 bg-gradient-to-b from-black/[0.02] to-transparent p-5">
                          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-black/40">
                            Backend & Databases
                          </h3>
                          <div className="grid grid-cols-1 gap-2">
                            {["PHP", "Node.js", "REST APIs", "MySQL", "Supabase", "Prisma"].map((skill) => (
                              <SkillChip key={skill} label={skill} iconMap={TECH_ICON_MAP} />
                            ))}
                          </div>
                        </motion.div>

                        {/* Card 3: Developer Tools */}
                        <motion.div variants={scrollRevealItem} className="rounded-2xl border border-black/10 bg-gradient-to-b from-black/[0.02] to-transparent p-5">
                          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-black/40">
                            Developer Tools
                          </h3>
                          <div className="grid grid-cols-1 gap-2">
                            {portfolio.tools.map((tool) => (
                              <SkillChip key={tool} label={tool} iconMap={TOOL_ICON_MAP} />
                            ))}
                          </div>
                        </motion.div>
                      </motion.div>

                      <motion.div variants={scrollRevealItem}>
                        <SkillsMarqueeCarousel items={[...portfolio.technicalSkills, ...portfolio.tools]} />
                      </motion.div>
                    </Section>
                  </motion.div>

                  <div className="section-sci-divider" aria-hidden>
                    <span className="section-sci-divider__core" />
                    <span className="section-sci-divider__scan" />
                    <span className="section-sci-divider__scan section-sci-divider__scan--echo" />
                  </div>

                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.15 }}
                    variants={projectRevealGroup}
                  >
                    <Section
                      id="project"
                      className={cx(orbitron.variable, "section-heading-orbitron")}
                      heading={{
                        eyebrow: "Featured Work",
                        title: "Project Archive",
                        subtitle: "Selected full-stack systems, application platforms, and software architecture.",
                      }}
                    >
                      {activeProject ? (
                        <motion.div variants={projectRevealGroup} className="space-y-8">
                          {/* Sci-Fi Project Selector Deck Bar */}
                          <motion.div variants={projectRevealItem} className="flex flex-col gap-4">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                              <p className="text-[11px] font-extrabold uppercase tracking-[0.24em] text-black/40">
                                Select System Case ({activeProjectIndex + 1} / {projects.length})
                              </p>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveProjectIndex((prev) =>
                                      (prev - 1 + projects.length) % projects.length,
                                    )
                                  }
                                  className="inline-flex items-center gap-1.5 rounded-xl border border-black/15 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white shadow-xs"
                                >
                                  ← Prev
                                </button>
                                <button
                                  type="button"
                                  onClick={() =>
                                    setActiveProjectIndex((prev) => (prev + 1) % projects.length)
                                  }
                                  className="inline-flex items-center gap-1.5 rounded-xl border border-black/15 bg-white px-3.5 py-1.5 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-black hover:text-white shadow-xs"
                                >
                                  Next →
                                </button>
                              </div>
                            </div>

                            {/* Interactive Case Tabs */}
                            <div className="flex overflow-x-auto pb-2 scrollbar-none gap-2">
                              {projects.map((project, i) => {
                                const isActive = i === activeProjectIndex;
                                return (
                                  <button
                                    key={project.name}
                                    type="button"
                                    onClick={() => setActiveProjectIndex(i)}
                                    className={cx(
                                      "group relative flex shrink-0 items-center gap-2.5 rounded-xl border px-4 py-2.5 text-left text-xs font-bold transition-transform duration-200 shadow-xs",
                                      isActive
                                        ? isDarkMode
                                          ? "case-tab-active border-white !bg-white !text-black shadow-md scale-[1.02]"
                                          : "case-tab-active border-black bg-black text-white shadow-md scale-[1.02]"
                                        : isDarkMode
                                          ? "border-white/20 bg-white/10 text-white/70 hover:border-white/40 hover:bg-white/15"
                                          : "border-black/10 bg-white text-black/70 hover:border-black/40 hover:bg-black/5"
                                    )}
                                  >
                                    <span
                                      className={cx(
                                        "case-tab-num flex size-5 shrink-0 items-center justify-center rounded-md text-[10px] font-extrabold transition-colors",
                                        isActive
                                          ? isDarkMode
                                            ? "!bg-black/15 !text-black"
                                            : "bg-white/20 text-white"
                                          : isDarkMode
                                            ? "bg-white/15 text-white/80 group-hover:bg-white/25"
                                            : "bg-black/5 text-black/60 group-hover:bg-black/10"
                                      )}
                                    >
                                      0{i + 1}
                                    </span>
                                    <span className="truncate max-w-[150px] sm:max-w-[200px]">
                                      {project.name}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>

                          {/* Main Showcase Card */}
                          <motion.div
                            key={`${activeProject.name}-${activeProjectIndex}`}
                            variants={projectRevealItem}
                            initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          >
                            <Card className="group relative overflow-hidden border-2 border-black/10 bg-white p-6 lg:p-8 hover:border-black/80 hover:shadow-[0_24px_70px_-30px_rgba(0,0,0,0.24)]">
                              <div className="grid gap-8 lg:grid-cols-12 items-start">
                                {/* Left Column: Visual System Preview & Quick Select Deck */}
                                <div className="space-y-6 lg:col-span-6">
                                  {/* Hero Preview Frame */}
                                  <div className="group/frame relative overflow-hidden rounded-2xl border-2 border-black/10 bg-black/5 shadow-md">
                                    {activeProject.imageSrc ? (
                                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                                        {/* Primary Image (default) */}
                                        <Image
                                          src={activeProject.imageSrc}
                                          alt={`${activeProject.name} preview`}
                                          fill
                                          className="object-cover transition-all duration-700 group-hover/frame:scale-105"
                                          priority
                                        />

                                        {/* Hover Image (crossfade overlay) */}
                                        {PROJECT_HOVER_IMAGE_MAP[activeProject.imageSrc] && (
                                          <Image
                                            src={PROJECT_HOVER_IMAGE_MAP[activeProject.imageSrc]}
                                            alt={`${activeProject.name} hover preview`}
                                            fill
                                            className="object-cover opacity-0 transition-all duration-700 group-hover/frame:opacity-100 group-hover/frame:scale-105"
                                          />
                                        )}

                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                                        <div className="absolute left-4 bottom-4 flex flex-wrap items-center gap-2">
                                          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-black/80 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                            Case 0{activeProjectIndex + 1}
                                          </span>
                                          <span className="rounded-full border border-white/20 bg-white/90 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-black">
                                            {activeProject.date}
                                          </span>
                                        </div>
                                      </div>
                                    ) : (
                                      <div className="aspect-[16/10] bg-black/5 flex items-center justify-center">
                                        <span className="text-xs font-bold uppercase tracking-widest text-black/40">
                                          System Preview Ready
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  {/* Mini Project Switcher Strip */}
                                  <div className="space-y-2">
                                    <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-black/40">
                                      Quick Switch Archive
                                    </p>
                                    <div className="grid grid-cols-5 gap-2">
                                      {projects.map((proj, idx) => {
                                        const isCurrent = idx === activeProjectIndex;
                                        return (
                                          <button
                                            key={proj.name}
                                            type="button"
                                            onClick={() => setActiveProjectIndex(idx)}
                                            className={cx(
                                              "relative aspect-[16/10] overflow-hidden rounded-xl border-2 transition-transform duration-200",
                                              isCurrent
                                                ? "quick-switch-active border-black ring-2 ring-black/20 scale-105 shadow-sm"
                                                : "border-black/15 opacity-60 hover:opacity-100 hover:border-black/50"
                                            )}
                                          >
                                            {proj.imageSrc ? (
                                              <Image
                                                src={proj.imageSrc}
                                                alt={proj.name}
                                                fill
                                                className="object-cover"
                                              />
                                            ) : (
                                              <div className="h-full w-full bg-black/10" />
                                            )}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                </div>

                                {/* Right Column: Project Architecture & Execution Details */}
                                <div className="space-y-6 lg:col-span-6">
                                  {/* Title & Role Header */}
                                  <div className="space-y-3">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="rounded-full border border-black/15 bg-black/5 px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-black">
                                        {activeProject.role}
                                      </span>
                                      <span className="text-xs font-semibold text-black/40">
                                        • {activeProject.date}
                                      </span>
                                    </div>

                                    <h3 className="text-2xl lg:text-3xl font-black tracking-tight text-black">
                                      {activeProject.name}
                                    </h3>

                                    <p className="text-sm leading-relaxed font-medium text-black/75">
                                      {activeProject.description}
                                    </p>
                                  </div>

                                  {/* Stack Matrix */}
                                  <div className="space-y-2.5 pt-2">
                                    <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-black/40">
                                      Technology Stack Matrix
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                      {activeProject.techStack.map((tech) => (
                                        <Pill key={`${activeProject.name}-${tech}`}>
                                          <span className="inline-flex items-center gap-1.5 font-bold">
                                            {(() => {
                                              const TechIcon = PROJECT_TECH_ICON_MAP[normalizeSkillKey(tech)] ?? FiCode;
                                              return <TechIcon className="size-3.5 text-black" aria-hidden />;
                                            })()}
                                            <span>{tech}</span>
                                          </span>
                                        </Pill>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Execution Highlights */}
                                  <div className="space-y-3 pt-2">
                                    <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-black/40">
                                      Key Execution Highlights
                                    </p>
                                    <div className="grid gap-2.5">
                                      {activeProject.highlights.map((h, i) => (
                                        <div
                                          key={i}
                                          className="group/h flex items-start gap-3 rounded-xl border border-black/10 bg-black/[0.02] p-3.5 transition-colors hover:border-black/40 hover:bg-black/[0.04]"
                                        >
                                          <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-black/15 bg-white text-[10px] font-bold text-black group-hover/h:bg-black group-hover/h:text-white transition-colors">
                                            0{i + 1}
                                          </span>
                                          <p className="text-xs font-semibold leading-relaxed text-black/85">
                                            {h}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  {/* Continuous Live Code Terminal Animation Stream (0ms CSS Theme Swap) */}
                                  <ProjectLiveCodeTerminal techStack={activeProject.techStack} />
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        </motion.div>
                      ) : null}
                    </Section>
                  </motion.div>

                  <div className="section-sci-divider" aria-hidden>
                    <span className="section-sci-divider__core" />
                    <span className="section-sci-divider__scan" />
                    <span className="section-sci-divider__scan section-sci-divider__scan--echo" />
                  </div>

                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={scrollRevealGroup}
                  >
                    <Section
                      id="achievements"
                      className={cx(orbitron.variable, "section-heading-orbitron")}
                      heading={{
                        eyebrow: "Milestones",
                        title: "Achievements & Certs",
                      }}
                    >
                      <motion.div variants={scrollRevealItem}>
                        <Card className="overflow-hidden border border-black/10 bg-white p-0 shadow-[0_20px_60px_-36px_rgba(0,0,0,0.2)]">
                          <div className="divide-y divide-black/10">
                            {milestoneItems.map((item, i) => {
                              const isOpen = openMilestoneId === item.id;
                              return (
                                <div
                                  key={item.id}
                                  className={cx("milestone-item relative", isOpen && "is-open")}
                                >
                                  <button
                                    type="button"
                                    onClick={() => setOpenMilestoneId((prev) => (prev === item.id ? null : item.id))}
                                    className="milestone-toggle group relative flex w-full items-center justify-between gap-3 px-5 py-4 text-left transition hover:bg-black/[0.03]"
                                  >
                                    <div className="min-w-0">
                                      <p className="text-base font-semibold leading-snug text-black">
                                        {item.title}
                                      </p>
                                    </div>
                                    <span
                                      className={cx(
                                        "milestone-chevron inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-black/15 bg-white text-black/60 transition-all duration-1000",
                                        isOpen && "rotate-180 border-black/40 text-black",
                                      )}
                                    >
                                      <FiChevronDown className="size-4" aria-hidden />
                                    </span>
                                  </button>

                                  <div
                                    className={cx(
                                      "milestone-panel grid transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]",
                                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                                    )}
                                  >
                                    <div className="overflow-hidden">
                                      <div className="border-t border-black/10 bg-black/[0.02] px-5 py-3.5">
                                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/45">
                                          {item.meta}
                                        </p>
                                        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-black/70">
                                          {item.details}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </Card>
                      </motion.div>
                    </Section>
                  </motion.div>

                  <div className="section-sci-divider" aria-hidden>
                    <span className="section-sci-divider__core" />
                    <span className="section-sci-divider__scan" />
                    <span className="section-sci-divider__scan section-sci-divider__scan--echo" />
                  </div>

                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.2 }}
                    variants={scrollRevealGroup}
                  >
                    <Section
                      id="contact"
                      className={cx(orbitron.variable, "section-heading-orbitron")}
                      heading={{
                        eyebrow: "Communication",
                        title: "System Inquiry",
                        subtitle: "Initiate a direct connection or system request.",
                      }}
                    >
                      <motion.div variants={inquiryRevealItem}>
                        <Card className="p-6 border-2 border-black/5">
                          <ContactForm defaultEmail={portfolio.contact.email} />
                        </Card>
                      </motion.div>
                    </Section>
                  </motion.div>
                  <footer className="site-footer relative mt-8 overflow-hidden rounded-2xl border border-black/10 bg-gradient-to-b from-white to-black/[0.02] p-5 sm:p-6">
                    <div className="pointer-events-none absolute inset-0 opacity-35 [background:linear-gradient(transparent_0%,transparent_96%,rgba(0,0,0,0.08)_100%),linear-gradient(90deg,transparent_0%,transparent_98%,rgba(0,0,0,0.06)_100%)] [background-size:100%_24px,24px_100%]" />
                    <div className="relative z-[1] grid gap-5 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_auto] lg:items-center">
                      <div>
                        <p className="overview-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-black/45">
                          System Footer
                        </p>
                        <p className="mt-1 text-sm font-semibold text-black">{portfolio.fullName}</p>
                        <p className="mt-1 text-xs text-black/65">
                          Built with{" "}
                          <span className="inline-flex items-center gap-1.5 align-middle">
                            <SiTypescript className="size-3.5" aria-hidden />
                            <span>TypeScript</span>
                          </span>
                          ,{" "}
                          <span className="inline-flex items-center gap-1.5 align-middle">
                            <SiNextdotjs className="size-3.5" aria-hidden />
                            <span>Next.js</span>
                          </span>
                          , and{" "}
                          <span className="inline-flex items-center gap-1.5 align-middle">
                            <SiTailwindcss className="size-3.5" aria-hidden />
                            <span>Tailwind CSS</span>
                          </span>
                          . Deployed on{" "}
                          <span className="inline-flex items-center gap-1.5 align-middle">
                            <SiVercel className="size-3.5" aria-hidden />
                            <span>Vercel</span>
                          </span>
                          .
                        </p>
                      </div>

                      <div className="grid gap-2 text-xs text-black/70">
                        <a
                          href={`mailto:${portfolio.contact.email}`}
                          className="inline-flex items-center gap-2 transition hover:text-black"
                        >
                          <FiMail className="size-3.5" aria-hidden />
                          <span>{portfolio.contact.email}</span>
                        </a>
                        {portfolio.contact.phone ? (
                          <a
                            href={`tel:${portfolio.contact.phone}`}
                            className="inline-flex items-center gap-2 transition hover:text-black"
                          >
                            <FiPhone className="size-3.5" aria-hidden />
                            <span>{portfolio.contact.phone}</span>
                          </a>
                        ) : null}
                        {portfolio.contact.location ? (
                          <p className="inline-flex items-center gap-2">
                            <FiMapPin className="size-3.5" aria-hidden />
                            <span>{portfolio.contact.location}</span>
                          </p>
                        ) : null}
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {portfolio.contact.socials.map((social) => {
                          const key = social.label.toLowerCase();
                          const SocialIcon =
                            key.includes("github")
                              ? FiGithub
                              : key.includes("linkedin")
                                ? FiLinkedin
                                : key.includes("facebook")
                                  ? FiFacebook
                                  : FiExternalLink;
                          return (
                            <a
                              key={social.label}
                              href={social.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="footer-social-link inline-flex items-center gap-1.5 rounded-md border border-black/15 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-black/75 transition hover:border-black/35 hover:text-black"
                            >
                              <SocialIcon className="size-3.5" aria-hidden />
                              <span>{social.label}</span>
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  </footer>
                </Container>
              </div>
            </main>
          </motion.div>
        )}
      </div>
    </div>
  );
}
