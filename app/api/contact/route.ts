import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message, recaptchaToken } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const verifyRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
    });
    const verifyData = await verifyRes.json();

    if (!verifyData.success || verifyData.score < 0.5) {
      return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 400 });
    }

    const contactEmail = process.env.CONTACT_EMAIL;
    if (!contactEmail) {
      return NextResponse.json(
        { error: "Server configuration error." },
        { status: 500 }
      );
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: contactEmail,
      subject: `[Portfolio] ${subject} — from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #6366F1;">New Portfolio Contact</h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #0F172A; width: 80px;">Name</td>
              <td style="padding: 8px 0; color: #64748B;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #0F172A;">Email</td>
              <td style="padding: 8px 0; color: #64748B;"><a href="mailto:${email}">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; color: #0F172A;">Subject</td>
              <td style="padding: 8px 0; color: #64748B;">${subject}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 16px; background: #F8FAFC; border-radius: 8px; border-left: 3px solid #6366F1;">
            <p style="margin: 0; color: #64748B; line-height: 1.6;">${message.replace(/\n/g, "<br>")}</p>
          </div>
          <p style="margin-top: 20px; color: #94A3B8; font-size: 12px;">
            Sent from your portfolio contact form.
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message." },
      { status: 500 }
    );
  }
}