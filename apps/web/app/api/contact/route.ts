import { Resend } from "resend";
import { checkMessageLimit } from "./rate-limit";

export const runtime = "nodejs";

const services = ["Website or app", "Video editing", "Graphic design", "Something else", ""];

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length")) > 15_000) {
    return Response.json({ error: "Message is too long." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  const fields = body as Record<string, unknown>;
  if (fields.companyWebsite) {
    return Response.json({ success: true });
  }

  const name = typeof fields.name === "string" ? fields.name.trim() : "";
  const email = typeof fields.email === "string" ? fields.email.trim() : "";
  const message = typeof fields.message === "string" ? fields.message.trim() : "";
  const service = typeof fields.service === "string" ? fields.service : "";

  if (
    name.length < 2 || name.length > 100 ||
    email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    message.length < 10 || message.length > 5000 ||
    !services.includes(service)
  ) {
    return Response.json({ error: "Please check your details and try again." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY || !process.env.CONTACT_EMAIL) {
    return Response.json({ error: "Contact form is not configured." }, { status: 503 });
  }

  const client = (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  ).slice(0, 64);
  const limit = checkMessageLimit(client);
  if (!limit.allowed) {
    return Response.json(
      { error: "Too many messages. Please try again later." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } },
    );
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "Gryffindor Lab <info@gryffindorlab.com>",
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: "New enquiry from Gryffindor Lab website",
      text: `Name: ${name}\nEmail: ${email}\nService: ${service || "Not specified"}\n\nMessage:\n${message}`,
    });

    if (error) {
      console.error("Resend could not send contact enquiry:", error);
      return Response.json({ error: "Could not send message." }, { status: 502 });
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact enquiry failed:", error);
    return Response.json({ error: "Could not send message." }, { status: 502 });
  }
}
