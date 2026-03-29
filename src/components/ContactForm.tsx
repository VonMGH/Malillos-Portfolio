"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui";

type FormState = {
  name: string;
  email: string;
  message: string;
};

export function ContactForm({
  defaultEmail,
}: {
  defaultEmail?: string;
}) {
  const [state, setState] = useState<FormState>({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const mailtoHref = useMemo(() => {
    if (!defaultEmail) return "";
    const subject = encodeURIComponent("E-Portfolio Contact");
    return `mailto:${defaultEmail}?subject=${subject}`;
  }, [defaultEmail]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error ?? `Request failed (${res.status})`);
      }

      setStatus("success");
      setState({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <Card className="relative overflow-hidden border border-black/10 bg-white p-5 shadow-[0_22px_70px_-40px_rgba(0,0,0,0.28)] sm:p-6">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.02),transparent_35%,transparent_65%,rgba(0,0,0,0.02))]"
        aria-hidden
      />
      <form className="relative z-[1] flex flex-col gap-4" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/45">
              Name
            </span>
            <input
              value={state.name}
              onChange={(e) => setState((s) => ({ ...s, name: e.target.value }))}
              className="contact-input h-11 rounded-xl border border-black/12 bg-white px-3 text-zinc-900 placeholder:text-zinc-500 outline-none transition-[border-color,box-shadow] focus:border-black/35 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.06)]"
              placeholder="Your name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={80}
            />
          </label>

          <label className="flex flex-col gap-2">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/45">
              Email
            </span>
            <input
              type="email"
              value={state.email}
              onChange={(e) => setState((s) => ({ ...s, email: e.target.value }))}
              className="contact-input h-11 rounded-xl border border-black/12 bg-white px-3 text-zinc-900 placeholder:text-zinc-500 outline-none transition-[border-color,box-shadow] focus:border-black/35 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.06)]"
              placeholder="you@example.com"
              autoComplete="email"
              required
              maxLength={120}
            />
          </label>
        </div>

        <label className="flex flex-col gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-black/45">
            Message
          </span>
          <textarea
            value={state.message}
            onChange={(e) =>
              setState((s) => ({ ...s, message: e.target.value }))
            }
            className="contact-input min-h-32 resize-y rounded-xl border border-black/12 bg-white px-3 py-2.5 text-zinc-900 placeholder:text-zinc-500 outline-none transition-[border-color,box-shadow] focus:border-black/35 focus:shadow-[0_0_0_3px_rgba(0,0,0,0.06)]"
            placeholder="Tell me what you'd like to build / ask about"
            required
            minLength={10}
            maxLength={2000}
          />
        </label>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="submit"
            disabled={status === "submitting"}
            className="overview-cta-secondary overview-mono group relative inline-flex h-12 min-w-[10rem] items-center justify-center overflow-hidden rounded-lg border-2 border-black bg-white px-6 text-[11px] font-bold uppercase tracking-[0.18em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <span
              className="overview-cta-secondary-fill pointer-events-none absolute inset-y-0 left-0 w-14 origin-left -translate-x-px -skew-x-[14deg] bg-black transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:w-full group-hover:translate-x-0 group-hover:-skew-x-0"
              aria-hidden
            />
            <span className="relative z-10 text-white mix-blend-difference">
              {status === "submitting" ? "SENDING..." : "SEND_MESSAGE"}
            </span>
          </button>

          {mailtoHref ? (
            <a
              href={mailtoHref}
              className="text-sm font-medium text-zinc-700 underline-offset-4 hover:underline"
            >
              Prefer email? Click here
            </a>
          ) : null}
        </div>

        {status === "success" ? (
          <p className="text-sm font-medium text-emerald-700">
            Message sent successfully.
          </p>
        ) : null}

        {status === "error" ? (
          <p className="text-sm font-medium text-red-700">
            {errorMessage}
          </p>
        ) : null}
      </form>
    </Card>
  );
}
