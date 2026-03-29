import { type ReactNode } from "react";

export function Container({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-none px-4 sm:px-5 md:px-6 lg:px-8">{children}</div>
  );
}
