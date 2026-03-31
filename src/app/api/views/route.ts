import { NextResponse } from "next/server";

const COUNT_API_NAMESPACE = "von-asley-malillos";
const COUNT_API_KEY = "e-portfolio-total-views";

async function requestCountApi(mode: "get" | "hit") {
  const url = `https://api.countapi.xyz/${mode}/${COUNT_API_NAMESPACE}/${COUNT_API_KEY}`;
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) return null;
  const payload = (await response.json()) as { value?: number };
  return typeof payload.value === "number" ? payload.value : null;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode") === "hit" ? "hit" : "get";

  try {
    let value = await requestCountApi(mode);

    // Self-heal: if "get" is empty/missing, create key with a first "hit".
    if (value === null && mode === "get") {
      value = await requestCountApi("hit");
    }

    return NextResponse.json({ value }, { status: 200 });
  } catch {
    return NextResponse.json({ value: null }, { status: 200 });
  }
}
