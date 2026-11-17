import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    const text = await request.text();
    if (text.length > 16000)
      return NextResponse.json(
        { error: "Your message is too long." },
        { status: 413 },
      );
    const parsed = contactSchema.safeParse(JSON.parse(text));
    if (!parsed.success)
      return NextResponse.json(
        { error: "Please check your details and try again." },
        { status: 400 },
      );
    const { RESEND_API_KEY, CONTACT_FROM, CONTACT_TO } = process.env;
    if (!RESEND_API_KEY || !CONTACT_FROM || !CONTACT_TO)
      return NextResponse.json(
        {
          error:
            "Email delivery is not configured yet. Please try again once the agency inbox is connected.",
        },
        { status: 503 },
      );
    const d = parsed.data;
    const resend = new Resend(RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: d.email,
      subject: `New project enquiry: ${d.service}`,
      text: `Name: ${d.name}\nEmail: ${d.email}\nCompany: ${d.company}\nService: ${d.service}\nBudget: ${d.budget}\n\n${d.message}`,
    });
    if (error)
      return NextResponse.json(
        {
          error: "We couldn’t deliver your message. Please try again shortly.",
        },
        { status: 502 },
      );
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      {
        error:
          "Unable to process your enquiry. Please check your message and try again.",
      },
      { status: 400 },
    );
  }
}
