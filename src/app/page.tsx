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
  SiCss,
  SiFigma,
  SiHtml5,
  SiJira,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPhp,
  SiPostman,
  SiPrisma,
  SiReact,
  SiSqlite,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVscodium,
  SiXampp,
  SiLaragon,
} from "react-icons/si";
import {
  FiBox,
  FiChevronDown,
  FiCode,
  FiExternalLink,
  FiFacebook,
  FiGithub,
  FiLinkedin,
  FiMail,
  FiMapPin,
  FiMenu,
  FiMoon,
  FiPhone,
  FiSun,
  FiX,
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
  hidden: { opacity: 0, y: 18, filter: "blur(2px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: SCROLL_REVEAL_EASE },
  },
};

const projectRevealGroup = {
  hidden: { opacity: 0, x: -56, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.25,
      ease: SCROLL_REVEAL_EASE,
      staggerChildren: 0.24,
      delayChildren: 0.14,
    },
  },
};

const projectRevealItem = {
  hidden: { opacity: 0, x: -42, scale: 0.985, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 1.05, ease: SCROLL_REVEAL_EASE },
  },
};

const inquiryRevealGroup = {
  hidden: { opacity: 0, x: -36, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.55,
      ease: SCROLL_REVEAL_EASE,
      staggerChildren: 0.28,
      delayChildren: 0.16,
    },
  },
};

const inquiryRevealItem = {
  hidden: { opacity: 0, x: -24, y: 10, filter: "blur(2px)" },
  visible: {
    opacity: 1,
    x: 0,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.25, ease: SCROLL_REVEAL_EASE },
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
  php: SiPhp,
  mysql: SiMysql,
  tailwindcss: SiTailwindcss,
  laravel: SiLaravel,
  supabase: SiSupabase,
};

const BRANDING_CARD_SCI =
  "branding-card--sci group relative isolate h-full min-h-[128px] overflow-hidden p-6 border-2 border-black/5 transition-[border-color,box-shadow] duration-300 hover:border-black/80 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.18)] [&_h3]:relative [&_h3]:z-[1] [&_p]:relative [&_p]:z-[1]";

const SKILL_CODE_SNIPPETS: Record<string, string> = {
  html: "<section id='portfolio'></section>",
  css: ".card { border-radius: 12px; }",
  php: "<?php echo 'Backend ready'; ?>",
  tailwindcss: "className='grid gap-4 md:grid-cols-2'",
  typescript: "type Stack = 'TS'; const strict = true;",
  react: "const UI = <App />; useState(true);",
  nextjs: "export default function Page() { return null; }",
  nodejs: "app.get('/api', handler); app.listen(3000);",
  restapis: "GET /api/v1/resources -> 200 OK",
  mysql: "SELECT * FROM projects LIMIT 10;",
  supabase: "supabase.from('logs').select('*')",
  prisma: "await prisma.user.findMany();",
  sql: "SELECT * FROM skills WHERE level >= 1;",
  figma: "Frame -> Components -> Auto Layout",
  postman: "GET /api/health  // 200 OK",
  vscode: "Ctrl+Shift+P  // Command Palette",
  jira: "Sprint: TODO -> IN_PROGRESS -> DONE",
};

const getSkillCode = (label: string) =>
  SKILL_CODE_SNIPPETS[normalizeSkillKey(label)] ?? `// ${label}`;

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
      <span className="flex size-8 items-center justify-center rounded-lg border border-black/10 bg-black/[0.03] text-black/80 transition-colors duration-300 group-hover:bg-black group-hover:text-white">
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
    ["Branding", "#branding"],
    ["Skills", "#skills"],
    ["Project", "#project"],
    ["Achievements", "#achievements"],
    ["Contact", "#contact"],
  ] as const;
  const browserStateByHref: Record<string, { title: string; icon: string }> = {
    "#top": { title: "Malillos | Identity", icon: "/tab-identity.svg" },
    "#branding": { title: "Malillos | Branding", icon: "/tab-branding.svg" },
    "#skills": { title: "Malillos | Skills", icon: "/tab-skills.svg" },
    "#project": { title: "Malillos | Project", icon: "/tab-project.svg" },
    "#achievements": { title: "Malillos | Achievements", icon: "/tab-achievements.svg" },
    "#contact": { title: "Malillos | Contact", icon: "/tab-contact.svg" },
  };
  const [activeHref, setActiveHref] = useState<(typeof items)[number][1]>("#branding");
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
      <header className="relative z-[2] overflow-x-clip border-b border-black/10 bg-white/95 backdrop-blur-xl">
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
                            href="/Malillos%20-%20CV.pdf"
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
                  id="branding"
                  className={cx(orbitron.variable, "section-heading-orbitron")}
                  heading={{
                    eyebrow: "Identity",
                    title: "Digital Signature",
                    subtitle:
                      "This section outlines the core visual system and technical architectural principles.",
                  }}
                >
                  <motion.div variants={scrollRevealGroup} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <motion.div variants={scrollRevealItem}>
                    <Card className={BRANDING_CARD_SCI}>
                      <h3 className="font-black uppercase tracking-widest text-black mb-3">Core_Logic</h3>
                      <p className="text-sm text-black/60 font-medium">
                        Scalable, modular architecture built for rapid deployment and high-load stability.
                      </p>
                    </Card>
                    </motion.div>
                    <motion.div variants={scrollRevealItem}>
                    <Card className={BRANDING_CARD_SCI}>
                      <h3 className="font-black uppercase tracking-widest text-black mb-3">System_Color</h3>
                      <p className="text-sm text-black/60 font-medium">
                        High-contrast monochrome palette designed for maximum clarity and technical focus.
                      </p>
                    </Card>
                    </motion.div>
                    <motion.div variants={scrollRevealItem}>
                    <Card className={BRANDING_CARD_SCI}>
                      <h3 className="font-black uppercase tracking-widest text-black mb-3">Type_Engine</h3>
                      <p className="text-sm text-black/60 font-medium">
                        Precision robotic typography utilizing sharp-edged fonts for a technical signature.
                      </p>
                    </Card>
                    </motion.div>
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
                    subtitle: "Core technologies and specialized tools.",
                  }}
                >
                  <motion.div variants={scrollRevealGroup} className="grid gap-8 sm:grid-cols-2">
                    <motion.div variants={scrollRevealItem} className="rounded-2xl border border-black/10 bg-gradient-to-b from-black/[0.02] to-transparent p-5">
                      <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-black/40">
                        Programming & Frameworks
                      </h3>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {portfolio.technicalSkills.map((skill) => (
                          <SkillChip key={skill} label={skill} iconMap={TECH_ICON_MAP} />
                        ))}
                      </div>
                    </motion.div>

                    <motion.div variants={scrollRevealItem} className="rounded-2xl border border-black/10 bg-gradient-to-b from-black/[0.02] to-transparent p-5">
                      <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-black/40">
                        Infrastructure & Tools
                      </h3>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
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
                    subtitle: "Selected projects with role, highlights, and stack details.",
                  }}
                >
                  {activeProject ? (
                    <motion.div variants={projectRevealGroup} className="grid gap-4">
                    <motion.div variants={projectRevealItem} className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {projects.map((project, i) => (
                          <button
                            key={project.name}
                            type="button"
                            aria-label={`Open project ${i + 1}`}
                            onClick={() => setActiveProjectIndex(i)}
                            className={cx(
                              "project-archive-dot h-2.5 rounded-full transition-all duration-300",
                              i === activeProjectIndex
                                ? "project-archive-dot--active w-8 bg-black"
                                : "w-2.5 bg-black/20 hover:bg-black/35",
                            )}
                          />
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() =>
                            setActiveProjectIndex((prev) =>
                              (prev - 1 + projects.length) % projects.length,
                            )
                          }
                          className="rounded-lg border border-black/15 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-black/70 transition hover:bg-black hover:text-white"
                        >
                          Prev
                        </button>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveProjectIndex((prev) => (prev + 1) % projects.length)
                          }
                          className="rounded-lg border border-black/15 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-black/70 transition hover:bg-black hover:text-white"
                        >
                          Next
                        </button>
                      </div>
                    </motion.div>

                    <motion.div
                      key={`${activeProject.name}-${activeProjectIndex}`}
                      variants={projectRevealItem}
                      initial={{ opacity: 0, x: -28, scale: 0.99, filter: "blur(4px)" }}
                      animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Card className="relative overflow-hidden border-2 border-black/10 bg-white p-0">
                        <div
                          className={cx(
                            "project-archive-hud pointer-events-none absolute inset-0 z-0",
                            `project-archive-hud--v${(activeProjectIndex % 3) + 1}`,
                          )}
                          aria-hidden
                        >
                          <span className="project-archive-hud__grid" />
                          <span className="project-archive-hud__scan" />
                          <span className="project-archive-hud__ring" />
                          <span className="project-archive-hud__ring project-archive-hud__ring--inner" />
                          <span className="project-archive-hud__ring project-archive-hud__ring--outer" />
                          <span className="project-archive-hud__arc project-archive-hud__arc--a" />
                          <span className="project-archive-hud__arc project-archive-hud__arc--b" />
                          <span className="project-archive-hud__sweep project-archive-hud__sweep--a" />
                          <span className="project-archive-hud__sweep project-archive-hud__sweep--b" />
                          <span className="project-archive-hud__cross project-archive-hud__cross--h" />
                          <span className="project-archive-hud__cross project-archive-hud__cross--v" />
                          <span className="project-archive-hud__ticks" />
                          <span className="project-archive-hud__glyph project-archive-hud__glyph--a">ΔX-77</span>
                          <span className="project-archive-hud__glyph project-archive-hud__glyph--b">SYS//ARCHIVE</span>
                          <span className="project-archive-hud__glyph project-archive-hud__glyph--c">01 10 11 00</span>
                          <span className="project-archive-hud__caution">CAUTION</span>
                          <span className="project-archive-hud__reticle" />
                          <span className="project-archive-hud__chevrons" />
                          <span className="project-archive-hud__bars" />
                          <span className="project-archive-hud__corners project-archive-hud__corners--tl" />
                          <span className="project-archive-hud__corners project-archive-hud__corners--br" />
                          <span className="project-archive-hud__trace project-archive-hud__trace--a" />
                          <span className="project-archive-hud__trace project-archive-hud__trace--b" />
                          <span className="project-archive-hud__node project-archive-hud__node--a" />
                          <span className="project-archive-hud__node project-archive-hud__node--b" />
                          <span className="project-archive-hud__node project-archive-hud__node--c" />
                        </div>
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(130deg,rgba(0,0,0,0.03),transparent_35%,transparent_65%,rgba(0,0,0,0.04))]" />
                        <div className="relative z-[1] border-b border-black/10 bg-black/[0.02] px-5 py-3">
                          <div className="flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2">
                              <span className="rounded border border-black/15 bg-white px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/55">
                                Case {String(activeProjectIndex + 1).padStart(2, "0")}
                              </span>
                              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-black/40">
                                Project Archive
                              </span>
                            </div>
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/75">
                              {activeProject.date}
                            </span>
                          </div>
                        </div>

                        <div className="relative z-[1] grid gap-0 lg:grid-cols-12">
                          <div className="border-b border-black/10 p-5 lg:col-span-5 lg:border-b-0 lg:border-r">
                            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-black/40">Project Name</p>
                            <h3 className="mt-1 text-xl font-black leading-tight text-black">{activeProject.name}</h3>

                            <div className="mt-5 rounded-xl border border-black/10 bg-black/[0.02] p-4">
                              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/40">Role</p>
                              <p className="mt-1 font-bold text-black">{activeProject.role}</p>
                              <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.22em] text-black/40">System Brief</p>
                              <p className="mt-1 text-sm leading-relaxed font-medium text-black/70">
                                {activeProject.description}
                              </p>
                            </div>

                            <div className="mt-5">
                              <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.24em] text-black/40">Stack Matrix</p>
                              <div className="flex flex-wrap gap-2">
                                {activeProject.techStack.map((tech) => (
                                  <Pill key={`${activeProject.name}-${tech}`}>
                                    <span className="inline-flex items-center gap-1.5">
                                      {(() => {
                                        const TechIcon = PROJECT_TECH_ICON_MAP[normalizeSkillKey(tech)];
                                        return TechIcon ? <TechIcon className="size-3.5 text-black/70" aria-hidden /> : null;
                                      })()}
                                      <span>{tech}</span>
                                    </span>
                                  </Pill>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="p-5 lg:col-span-7">
                            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.24em] text-black/40">Execution Highlights</p>
                            <div className="relative">
                              <span className="pointer-events-none absolute bottom-0 left-[15px] top-0 w-px bg-black/10" aria-hidden />
                              <ul className="grid gap-3">
                                {activeProject.highlights.map((h, i) => (
                                  <li key={i} className="relative pl-10">
                                    <span className="absolute left-0 top-0 inline-flex size-8 items-center justify-center rounded-full border border-black/15 bg-white font-mono text-[10px] font-bold text-black/60">
                                      {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <div className="rounded-lg border border-black/10 bg-white px-3 py-2.5">
                                      <p className="text-sm font-medium text-black/80">{h}</p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
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
                      Built with TypeScript, Next.js, and Tailwind CSS. Deployed on Vercel.
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
