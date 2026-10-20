import assert from 'node:assert/strict';
import { test, after } from 'node:test';
import { readFile } from 'node:fs/promises';
import { isAuthorized, unauthorizedResponse } from '../server/auth.mjs';

const basic = value => 'Basic ' + Buffer.from(value).toString('base64');
const fixture = { SITE_AUTH_USER: 'preview-user', SITE_AUTH_PASSWORD: 'test-only-password' };
const fixtureLogin = `${fixture.SITE_AUTH_USER}:${fixture.SITE_AUTH_PASSWORD}`;

test('preview login accepts only the configured credentials', () => {
  assert.equal(isAuthorized(basic(fixtureLogin), fixture), true);
  for (const value of [undefined, '', 'Bearer token', 'Basic %%%', 'Basic A', basic('preview-user:wrong'), basic('wrong:test-only-password'), basic(fixtureLogin+':extra')]) {
    assert.equal(isAuthorized(value, fixture), false);
  }
});

test('environment credentials replace the default and incomplete configuration fails closed', () => {
  const env = { SITE_AUTH_USER: 'reviewer', SITE_AUTH_PASSWORD: 'different:password' };
  assert.equal(isAuthorized(basic(fixtureLogin), env), false);
  assert.equal(isAuthorized(basic('reviewer:different:password'), env), true);
  assert.equal(isAuthorized(basic(fixtureLogin), {}), false);
  assert.equal(isAuthorized(basic(fixtureLogin), { SITE_AUTH_USER: 'preview-user' }), false);
  assert.equal(isAuthorized(basic(fixtureLogin), { SITE_AUTH_USER: '', SITE_AUTH_PASSWORD: '' }), false);
});

test('challenge prompts the browser and prevents caching', () => {
  const response = unauthorizedResponse();
  assert.equal(response.status, 401);
  assert.match(response.headers.get('www-authenticate'), /^Basic /);
  assert.match(response.headers.get('cache-control'), /no-store/);
});

process.env.PORT = '0';
Object.assign(process.env, fixture);
const { default: server } = await import('../serve.mjs');
if (!server.listening) await new Promise(resolve => server.once('listening', resolve));
after(() => new Promise(resolve => server.close(resolve)));
const origin = `http://127.0.0.1:${server.address().port}`;

test('HTTP pages, scripts, pictures, videos and direct files all require authentication', async () => {
  for (const pathname of ['/', '/business/', '/pricing/index.html', '/insights/', '/app.js', '/assets/chat.webp', '/media/contract-short.mp4', '/missing']) {
    const response = await fetch(origin + pathname, { headers: { 'x-middleware-subrequest': 'middleware', Range: 'bytes=0-31' } });
    assert.equal(response.status, 401, pathname);
    assert.equal(await response.text(), 'Authentication required.');
  }
  assert.equal((await fetch(origin + '/business/', { headers: { Authorization: basic('preview-user:wrong') } })).status, 401);
});

test('authorized pages load and video byte ranges still work', async () => {
  const headers = { Authorization: basic(fixtureLogin) };
  const page = await fetch(origin + '/business/', { headers });
  assert.equal(page.status, 200);
  assert.match(await page.text(), /AgentA Business/);
  assert.match(page.headers.get('cache-control'), /private, no-store/);
  const video = await fetch(origin + '/media/contract-short.mp4', { headers: { ...headers, Range: 'bytes=0-31' } });
  assert.equal(video.status, 206);
  assert.equal((await video.arrayBuffer()).byteLength, 32);
  assert.equal((await fetch(origin + '/assets/chat.webp', { method: 'HEAD', headers })).status, 200);
});

test('server code and credentials are excluded from the public build', async () => {
  assert.equal((await fetch(origin + '/server/auth.mjs', { headers: { Authorization: basic(fixtureLogin) } })).status, 404);
  const middleware = await readFile(new URL('../middleware.ts', import.meta.url), 'utf8');
  assert.match(middleware, /matcher: '\/:path\*'/);
  const app = await readFile(new URL('../dist/app.js', import.meta.url), 'utf8');
  assert.doesNotMatch(app, /SITE_AUTH_PASSWORD/);
});
