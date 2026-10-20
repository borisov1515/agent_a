import { createHash, timingSafeEqual } from 'node:crypto';

const digest = value => createHash('sha256').update(value).digest();

export function isAuthorized(authorization, env = process.env) {
  if (typeof authorization !== 'string') return false;
  const match = /^Basic ([A-Za-z0-9+/]+={0,2})$/i.exec(authorization);
  if (!match) return false;
  const credentials = Buffer.from(match[1], 'base64');
  // Reject malformed base64 rather than relying on Buffer's permissive decoding.
  if (credentials.toString('base64').replace(/=+$/, '') !== match[1].replace(/=+$/, '')) return false;
  if (!env.SITE_AUTH_USER || !env.SITE_AUTH_PASSWORD) return false;
  const expected = digest(`${env.SITE_AUTH_USER}:${env.SITE_AUTH_PASSWORD}`);
  return timingSafeEqual(digest(credentials), expected);
}

export const privateHeaders = {
  'Cache-Control': 'private, no-store, max-age=0',
  'Vary': 'Authorization',
  'X-Robots-Tag': 'noindex, nofollow, noarchive',
};

export function unauthorizedResponse() {
  return new Response('Authentication required.', {
    status: 401,
    headers: {
      ...privateHeaders,
      'Content-Type': 'text/plain; charset=utf-8',
      'WWW-Authenticate': 'Basic realm="AgentA preview", charset="UTF-8"',
    },
  });
}
