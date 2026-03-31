import { NextResponse } from "next/server";

const COUNT_API_NAMESPACE = "von-asley-malillos";
const COUNT_API_KEY = "e-portfolio-total-views";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode") === "hit" ? "hit" : "get";
  const url = `https://api.countapi.xyz/${mode}/${COUNT_API_NAMESPACE}/${COUNT_API_KEY}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json({ value: null }, { status: 502 });
    }

    const payload = (await response.json()) as { value?: number };
    return NextResponse.json(
      { value: typeof payload.value === "number" ? payload.value : null },
      { status: 200 },
    );
  } catch {
    return NextResponse.json({ value: null }, { status: 500 });
  }
}
