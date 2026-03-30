/**
 * The relative path from the project root to the directory containing Next.js configuration plugins.
 */
export const NEXTJS_PLUGINS_DIR_RELATIVE = "src/config/nextjs";

/**
 * Default from email for Resend. Falls back to environment variable at runtime.
 * Avoid top-level env imports here — this file is used in next.config compilation context.
 */
export const RESEND_FROM_EMAIL =
  (typeof process !== "undefined" && process.env.RESEND_FROM_EMAIL) ||
  "support@cloud0.dev";
