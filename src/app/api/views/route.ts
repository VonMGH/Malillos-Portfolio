import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const COUNTER_KEY = "portfolio:views:total";
let inMemoryViews = 0;

async function kvGetCount(): Promise<number | null> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  const response = await fetch(`${url}/get/${COUNTER_KEY}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("KV get failed");

  const data = (await response.json()) as { result: string | null };
  return Number(data.result ?? 0);
}

async function kvIncrement(): Promise<number | null> {
  const url = process.env.KV_REST_API_URL;
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  const response = await fetch(`${url}/incr/${COUNTER_KEY}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!response.ok) throw new Error("KV incr failed");

  const data = (await response.json()) as { result: string | number };
  return Number(data.result);
}

export async function GET() {
  try {
    const kvCount = await kvGetCount();
    const count = kvCount ?? inMemoryViews;
    return NextResponse.json({ count, provider: kvCount === null ? "memory" : "kv" });
  } catch {
    return NextResponse.json({ count: inMemoryViews, provider: "memory" });
  }
}

export async function POST() {
  try {
    const kvCount = await kvIncrement();
    if (kvCount !== null) {
      return NextResponse.json({ count: kvCount, provider: "kv" });
    }
  } catch {
    // fall through to memory fallback
  }

  inMemoryViews += 1;
  return NextResponse.json({ count: inMemoryViews, provider: "memory" });
}

