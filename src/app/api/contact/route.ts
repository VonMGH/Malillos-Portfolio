import { NextResponse } from "next/server";
import { portfolio } from "@/data/portfolio";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as ContactPayload | null;

  if (!body) {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 2) {
    return NextResponse.json({ error: "Name is required" }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Valid email is required" }, { status: 400 });
  }

  if (message.length < 10) {
    return NextResponse.json({ error: "Message is too short" }, { status: 400 });
  }

  console.log("Contact form submission", {
    name,
    email,
    messagePreview: message.slice(0, 120),
  });

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    return NextResponse.json(
      {
        error:
          "Email service is not configured yet. Set RESEND_API_KEY in your environment.",
      },
      { status: 500 },
    );
  }

  const toEmail = process.env.CONTACT_TO_EMAIL ?? portfolio.contact.email;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  const subject = `Portfolio Inquiry from ${name}`;
  const html = `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>New Portfolio Contact Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br/>")}</p>
    </div>
  `;

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: email,
      subject,
      html,
    }),
  });

  if (!resendResponse.ok) {
    const body = await resendResponse.text().catch(() => "");
    return NextResponse.json(
      { error: `Failed to send email. ${body || "Resend request failed."}` },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
