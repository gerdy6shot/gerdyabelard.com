/**
 * Ensure a redirect target is a safe, same-origin path.
 * Returns defaultPath when `to` is missing or suspicious.
 */
export function safeRedirect(to: unknown, defaultPath = '/') {
  if (!to || typeof to !== 'string') return defaultPath;
  const t = to.trim();

  // Reject protocol-relative URLs (//evil.com), javascript:, data:, mailto:, or any scheme like http:
  if (t.startsWith('//')) return defaultPath;
  if (/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(t)) return defaultPath;
  if (t.toLowerCase().startsWith('javascript:')) return defaultPath;

  // Require a leading slash for internal paths
  if (!t.startsWith('/')) return defaultPath;

  // Otherwise consider it safe
  return t;
}
