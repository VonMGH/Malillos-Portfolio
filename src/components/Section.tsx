import { type ReactNode } from "react";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 py-10 sm:py-14">
      <div className="flex flex-col gap-5">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
          {title}
        </h2>
        <div className="text-zinc-700 dark:text-zinc-200">{children}</div>
      </div>
    </section>
  );
}
