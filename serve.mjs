import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import './build.mjs';
import { isAuthorized, privateHeaders, unauthorizedResponse } from './server/auth.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), 'dist');
// Local-only credentials are ignored by Git. Vercel uses its environment settings.
if (process.env.SITE_AUTH_USER === undefined && process.env.SITE_AUTH_PASSWORD === undefined) {
  try { process.loadEnvFile(path.join(path.dirname(fileURLToPath(import.meta.url)), '.env.local')); }
  catch (error) { if (error.code !== 'ENOENT') throw error; }
}
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.webp':'image/webp', '.png':'image/png', '.woff2':'font/woff2', '.ttf':'font/ttf', '.mp4':'video/mp4', '.svg':'image/svg+xml', '.vtt':'text/vtt; charset=utf-8' };
const server = http.createServer(async (req, res) => {
  if (!isAuthorized(req.headers.authorization)) {
    const denied = unauthorizedResponse();
    res.writeHead(denied.status, Object.fromEntries(denied.headers));
    res.end(req.method === 'HEAD' ? undefined : await denied.text());
    return;
  }
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let target = path.resolve(root, '.' + pathname);
    if (target !== root && !target.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
    let info = await stat(target);
    if (info.isDirectory()) { target = path.join(target, 'index.html'); info = await stat(target); }
    const headers = { ...privateHeaders, 'Content-Type': types[path.extname(target)] || 'application/octet-stream', 'Accept-Ranges':'bytes' };
    if (req.headers.range) {
      const match = /^bytes=(\d+)-(\d*)$/.exec(req.headers.range);
      if (!match) { res.writeHead(416, { 'Content-Range':`bytes */${info.size}` }).end(); return; }
      const start = Number(match[1]); const end = match[2] ? Math.min(Number(match[2]), info.size - 1) : info.size - 1;
      if (start > end || start >= info.size) { res.writeHead(416, { 'Content-Range':`bytes */${info.size}` }).end(); return; }
      res.writeHead(206, { ...headers, 'Content-Range':`bytes ${start}-${end}/${info.size}`, 'Content-Length':end-start+1 });
      if (req.method === 'HEAD') res.end(); else { const stream=createReadStream(target,{start,end});res.on('close',()=>stream.destroy());stream.pipe(res); }
    } else {
      res.writeHead(200, { ...headers, 'Content-Length':info.size });
      if (req.method === 'HEAD') res.end(); else { const stream=createReadStream(target);res.on('close',()=>stream.destroy());stream.pipe(res); }
    }
  } catch { res.writeHead(404, {'Content-Type':'text/plain; charset=utf-8'}).end('Page not found. Visit http://localhost:4173/'); }
});
const port = Number(process.env.PORT || 4173);
server.listen(port, '127.0.0.1', () => console.log(`AgentA protected preview: http://127.0.0.1:${server.address().port}/business/`));
export default server;
