/**
 * emailService.js
 * Reusable EmailJS integration for Book a Session and Contact forms.
 *
 * Environment variables required (see .env.example):
 *   VITE_EMAILJS_SERVICE_ID        — your EmailJS Service ID
 *   VITE_EMAILJS_BOOKING_TEMPLATE  — template ID for the Book a Session form
 *   VITE_EMAILJS_CONTACT_TEMPLATE  — template ID for the Contact form
 *
 * The public key is safe to expose in frontend code — it is NOT a secret key.
 * Never expose your private / secret EmailJS key.
 */

import emailjs from '@emailjs/browser';

// ─── Constants ────────────────────────────────────────────────────────────────

const PUBLIC_KEY = '7Zm8iLMACsIice0F0';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const BOOKING_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_BOOKING_TEMPLATE;
const CONTACT_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE;

// ─── Initialise once ──────────────────────────────────────────────────────────

emailjs.init({ publicKey: PUBLIC_KEY });

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Validate that required env variables are present.
 * Throws a descriptive error during development so the developer is
 * immediately aware of missing configuration rather than getting a
 * cryptic EmailJS 400 response.
 *
 * @param {...string} values
 */
function assertEnv(...values) {
  const missing = values.filter((v) => !v);
  if (missing.length) {
    throw new Error(
      '[emailService] Missing required environment variables. ' +
      'Check your .env file and ensure VITE_EMAILJS_SERVICE_ID, ' +
      'VITE_EMAILJS_BOOKING_TEMPLATE, and VITE_EMAILJS_CONTACT_TEMPLATE are set.'
    );
  }
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Send a "Book a Session" email via EmailJS.
 *
 * Template variables expected in your EmailJS template:
 *   {{fullName}}, {{phone}}, {{email}}, {{sessionType}},
 *   {{preferredDate}}, {{message}}
 *
 * @param {{
 *   fullName: string,
 *   phone: string,
 *   email?: string,
 *   sessionType: string,
 *   preferredDate?: string,
 *   message?: string,
 * }} fields
 * @returns {Promise<void>}
 */
export async function sendBookingEmail(fields) {
  assertEnv(SERVICE_ID, BOOKING_TEMPLATE_ID);

  const nameVal = (fields.fullName || fields.full_name || fields.name)?.trim() ?? '';
  // Keys MUST match the {{variable}} names inside your EmailJS template exactly
  // We send both snake_case and camelCase variables to support any template setup
  const templateParams = {
    name: nameVal,
    full_name: nameVal,
    fullName: nameVal,
    phone: fields.phone?.trim() ?? '',
    email: fields.email?.trim() || '—',
    session_type: fields.sessionType || fields.session_type || '—',
    sessionType: fields.sessionType || fields.session_type || '—',
    preferred_date: fields.preferredDate || fields.preferred_date || '—',
    preferredDate: fields.preferredDate || fields.preferred_date || '—',
    message: fields.message?.trim() || '—',
  };

  await emailjs.send(SERVICE_ID, BOOKING_TEMPLATE_ID, templateParams);
}

/**
 * Send a "Contact" email via EmailJS.
 *
 * Template variables expected in your EmailJS template:
 *   {{name}} or {{full_name}} or {{fullName}}, {{phone}}, {{message}}
 *
 * @param {{
 *   name?: string,
 *   full_name?: string,
 *   fullName?: string,
 *   phone: string,
 *   message: string,
 * }} fields
 * @returns {Promise<void>}
 */
export async function sendContactEmail(fields) {
  assertEnv(SERVICE_ID, CONTACT_TEMPLATE_ID);

  const nameVal = (fields.full_name || fields.fullName || fields.name)?.trim() ?? '';
  const templateParams = {
    name: nameVal,
    full_name: nameVal,
    fullName: nameVal,
    phone: fields.phone?.trim() ?? '',
    message: fields.message?.trim() ?? '',
  };

  await emailjs.send(SERVICE_ID, CONTACT_TEMPLATE_ID, templateParams);
}
