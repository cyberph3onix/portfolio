// Resolution order: explicit NEXT_PUBLIC_SITE_URL, then the Vercel production
// domain (set automatically on every Vercel deploy), then local dev.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000");
