import { next } from '@vercel/functions';
import { isAuthorized, privateHeaders, unauthorizedResponse } from './server/auth.mjs';

// Include assets and video requests as well as pages, with no public exceptions.
export const config = { matcher: '/:path*', runtime: 'nodejs' };

export default function middleware(request: Request) {
  if (!isAuthorized(request.headers.get('authorization'))) return unauthorizedResponse();
  return next({ headers: privateHeaders });
}
