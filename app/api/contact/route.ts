import { NextResponse } from 'next/server';
import {
  buildContactEmailHtml,
  buildContactEmailSubject,
  buildContactEmailText,
  emptyContactFormValues,
  type ContactFormValues,
  validateContactForm,
} from '../../lib/contact';

// Contact submissions use a Node runtime so server-side email delivery stays predictable.
export const runtime = 'nodejs';

// Required email configuration is read from environment variables.
function getContactConfig() {
  const resendApiKey = process.env.RESEND_API_KEY;
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL;
  const contactToEmail = process.env.CONTACT_TO_EMAIL;

  if (!resendApiKey || !contactFromEmail || !contactToEmail) {
    return null;
  }

  return {
    resendApiKey,
    contactFromEmail,
    contactToEmail,
  };
}

// Route handler validates the request and forwards it to Resend.
export async function POST(request: Request) {
  const config = getContactConfig();
  if (!config) {
    return NextResponse.json(
      {
        success: false,
        message:
          'The contact form is not configured yet. Please add the required email environment variables.',
      },
      { status: 500 },
    );
  }

  let rawBody: Partial<ContactFormValues> | null = null;

  try {
    rawBody = (await request.json()) as Partial<ContactFormValues>;
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: 'We could not read that submission. Please try again.',
      },
      { status: 400 },
    );
  }

  const validation = validateContactForm({
    ...emptyContactFormValues,
    ...rawBody,
  });

  if (!validation.isValid) {
    return NextResponse.json(
      {
        success: false,
        message: 'Please review the highlighted fields and try again.',
        fieldErrors: validation.errors,
      },
      { status: 400 },
    );
  }

  const resendResponse = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: config.contactFromEmail,
      to: [config.contactToEmail],
      reply_to: validation.data.email,
      subject: buildContactEmailSubject(validation.data),
      text: buildContactEmailText(validation.data),
      html: buildContactEmailHtml(validation.data),
    }),
  });

  if (!resendResponse.ok) {
    const errorText = await resendResponse.text();
    console.error('Contact form delivery failed:', errorText);

    return NextResponse.json(
      {
        success: false,
        message:
          'Your message could not be sent right now. Please try again in a moment or email us directly.',
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    success: true,
    message: 'Thank you. Your message has been sent and we will be in touch soon.',
  });
}
