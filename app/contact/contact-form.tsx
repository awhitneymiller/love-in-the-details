'use client';

import { useState } from 'react';
import {
  emptyContactFormValues,
  type ContactFormErrors,
  type ContactFormValues,
  validateContactForm,
} from '../lib/contact';

type SubmissionState =
  | { status: 'idle'; message: '' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string };

// Client form handles validation, request state, and inline feedback.
export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(emptyContactFormValues);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submission, setSubmission] = useState<SubmissionState>({
    status: 'idle',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Keeps local state in sync with the current field value.
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setValues((current) => ({
      ...current,
      [name]: value,
    }));

    setErrors((current) => {
      if (!current[name as keyof ContactFormErrors]) {
        return current;
      }

      const nextErrors = { ...current };
      delete nextErrors[name as keyof ContactFormErrors];
      return nextErrors;
    });

    if (submission.status !== 'idle') {
      setSubmission({ status: 'idle', message: '' });
    }
  };

  // Validates locally before posting to the API route.
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validation = validateContactForm(values);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setSubmission({
        status: 'error',
        message: 'Please review the highlighted fields and try again.',
      });
      return;
    }

    setIsSubmitting(true);
    setErrors({});
    setSubmission({ status: 'idle', message: '' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validation.data),
      });

      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
        fieldErrors?: ContactFormErrors;
      };

      if (!response.ok || !result.success) {
        setErrors(result.fieldErrors ?? {});
        setSubmission({
          status: 'error',
          message:
            result.message ??
            'Your message could not be sent right now. Please try again in a moment.',
        });
        return;
      }

      setValues(emptyContactFormValues);
      setSubmission({
        status: 'success',
        message: result.message ?? 'Thank you. Your message has been sent.',
      });
    } catch {
      setSubmission({
        status: 'error',
        message:
          'A network error interrupted the submission. Please try again or email us directly.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="contact-studio-form" aria-label="Contact form" noValidate onSubmit={handleSubmit}>
      {/* Honeypot field quietly filters basic bot submissions. */}
      <input
        type="text"
        name="company"
        value={values.company}
        onChange={handleChange}
        className="contact-form-honeypot"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {/* Name field and inline validation. */}
      <div className="contact-form-field">
        <label className="sr-only" htmlFor="contact-name">
          Full name
        </label>
        <input
          id="contact-name"
          name="name"
          autoComplete="name"
          className="contact-line-input"
          placeholder="Full Name"
          value={values.name}
          onChange={handleChange}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'contact-name-error' : undefined}
        />
        {errors.name ? (
          <p id="contact-name-error" className="contact-form-error">
            {errors.name}
          </p>
        ) : null}
      </div>

      {/* Email field and inline validation. */}
      <div className="contact-form-field">
        <label className="sr-only" htmlFor="contact-email">
          E-mail
        </label>
        <input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          className="contact-line-input"
          placeholder="E-mail"
          value={values.email}
          onChange={handleChange}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'contact-email-error' : undefined}
        />
        {errors.email ? (
          <p id="contact-email-error" className="contact-form-error">
            {errors.email}
          </p>
        ) : null}
      </div>

      {/* Wedding details field and inline validation. */}
      <div className="contact-form-field">
        <label className="sr-only" htmlFor="contact-details">
          Wedding date or location
        </label>
        <input
          id="contact-details"
          name="details"
          autoComplete="off"
          className="contact-line-input"
          placeholder="Wedding Date / Location"
          value={values.details}
          onChange={handleChange}
          aria-invalid={Boolean(errors.details)}
          aria-describedby={errors.details ? 'contact-details-error' : undefined}
        />
        {errors.details ? (
          <p id="contact-details-error" className="contact-form-error">
            {errors.details}
          </p>
        ) : null}
      </div>

      {/* Message field and inline validation. */}
      <div className="contact-form-field">
        <label className="sr-only" htmlFor="contact-message">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          className="contact-line-input contact-line-textarea"
          placeholder="Message"
          rows={4}
          value={values.message}
          onChange={handleChange}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
        />
        {errors.message ? (
          <p id="contact-message-error" className="contact-form-error">
            {errors.message}
          </p>
        ) : null}
      </div>

      {/* Submit button and request feedback keep the interaction clear. */}
      <button
        type="submit"
        className="send-btn contact-studio-submit"
        disabled={isSubmitting}
        aria-disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Contact Us'}
      </button>

      {submission.message ? (
        <p
          className={`contact-form-message contact-form-message-${submission.status}`}
          role={submission.status === 'error' ? 'alert' : 'status'}
          aria-live="polite"
        >
          {submission.message}
        </p>
      ) : null}
    </form>
  );
}
