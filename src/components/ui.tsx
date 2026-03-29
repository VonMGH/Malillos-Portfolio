import { type ComponentProps, type ReactNode } from "react";
import { motion } from "framer-motion";

type DivProps = ComponentProps<"div">;

type HeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
};

export function cx(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

export function Card({ className, ...props }: DivProps) {
  return (
    <div
      className={cx(
        "rounded-2xl border border-black/10 bg-white shadow-sm transition-shadow hover:shadow-md",
        className,
      )}
      {...props}
    />
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-black/10 bg-white px-3 py-1 text-sm font-medium text-black">
      {children}
    </span>
  );
}

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-none px-4 sm:px-5 md:px-6 lg:px-8">{children}</div>
  );
}

export function Section({
  id,
  heading,
  children,
  className,
}: {
  id: string;
  heading: HeadingProps;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={cx("scroll-mt-24 py-10 sm:py-14", className)}>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          {heading.eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/40">
              {heading.eyebrow}
            </p>
          ) : null}
          <h2 className="hero-distort relative text-2xl font-black tracking-tighter text-black sm:text-3xl">
            <span className="relative z-10">{heading.title}</span>
            <motion.span
              aria-hidden
              className="hero-distort-layer hero-distort-layer-a"
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: [0, 0, 1, 1, 0],
              }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 3, times: [0, 0.05, 0.14, 0.96, 1], ease: "linear" }}
            >
              {heading.title}
            </motion.span>
            <motion.span
              aria-hidden
              className="hero-distort-layer hero-distort-layer-b"
              initial={{ opacity: 0 }}
              whileInView={{
                opacity: [0, 0, 1, 1, 0],
              }}
              viewport={{ once: false, amount: 0.8 }}
              transition={{ duration: 3, times: [0, 0.05, 0.14, 0.96, 1], ease: "linear" }}
            >
              {heading.title}
            </motion.span>
          </h2>
          {heading.subtitle ? (
            <p className="max-w-prose text-sm leading-relaxed text-black/60 font-medium">
              {heading.subtitle}
            </p>
          ) : null}
        </div>
        <div className="text-black/80 font-medium">{children}</div>
      </div>
    </section>
  );
}
