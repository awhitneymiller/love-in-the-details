// Shared contact form shape used by the client and API route.
export type ContactFormValues = {
  name: string;
  email: string;
  details: string;
  message: string;
  company: string;
};

// Field-level errors are returned with the same keys as the form values.
export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

// Empty defaults keep the client form state predictable.
export const emptyContactFormValues: ContactFormValues = {
  name: '',
  email: '',
  details: '',
  message: '',
  company: '',
};

// Simple normalization prevents whitespace-only submissions.
const normalizeValue = (value: unknown) =>
  typeof value === 'string' ? value.trim() : '';

// Lightweight email validation is enough for this form flow.
const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// Shared validation keeps client and server rules aligned.
export function validateContactForm(values: ContactFormValues) {
  const normalized: ContactFormValues = {
    name: normalizeValue(values.name),
    email: normalizeValue(values.email).toLowerCase(),
    details: normalizeValue(values.details),
    message: normalizeValue(values.message),
    company: normalizeValue(values.company),
  };

  const errors: ContactFormErrors = {};

  if (!normalized.name || normalized.name.length < 2) {
    errors.name = 'Please enter your full name.';
  }

  if (!normalized.email || !isValidEmail(normalized.email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!normalized.details || normalized.details.length < 4) {
    errors.details = 'Please include your wedding date or location.';
  }

  if (!normalized.message || normalized.message.length < 10) {
    errors.message = 'Please share a few details about what you are looking for.';
  }

  if (normalized.company) {
    errors.company = 'Spam submissions are not allowed.';
  }

  return {
    data: normalized,
    errors,
    isValid: Object.keys(errors).length === 0,
  };
}

// Email subject stays concise and easy to scan in an inbox.
export function buildContactEmailSubject(values: ContactFormValues) {
  return `New inquiry from ${values.name}`;
}

// Plain-text email body is friendly for forwarding and archives.
export function buildContactEmailText(values: ContactFormValues) {
  return [
    'New contact form inquiry',
    '',
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Wedding Date / Location: ${values.details}`,
    '',
    'Message:',
    values.message,
  ].join('\n');
}

// HTML body keeps the notification readable in richer inboxes.
export function buildContactEmailHtml(values: ContactFormValues) {
  const escapeHtml = (value: string) =>
    value
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#39;');

  return `
    <div style="font-family: Georgia, 'Times New Roman', serif; color: #43372d; line-height: 1.7;">
      <h1 style="font-size: 24px; font-weight: 500; margin-bottom: 16px;">New contact form inquiry</h1>
      <p style="margin: 0 0 8px;"><strong>Name:</strong> ${escapeHtml(values.name)}</p>
      <p style="margin: 0 0 8px;"><strong>Email:</strong> ${escapeHtml(values.email)}</p>
      <p style="margin: 0 0 20px;"><strong>Wedding Date / Location:</strong> ${escapeHtml(values.details)}</p>
      <p style="margin: 0 0 8px;"><strong>Message:</strong></p>
      <p style="margin: 0; white-space: pre-wrap;">${escapeHtml(values.message)}</p>
    </div>
  `.trim();
}
