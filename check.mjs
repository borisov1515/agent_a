import assert from 'node:assert/strict';
import {readFile,stat} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.dirname(fileURLToPath(import.meta.url));
execFileSync(process.execPath,['--check',path.join(root,'public','app.js')]);
for(const route of ['', 'business', 'personal', 'contact', 'privacy', 'pricing', 'concepts', 'insights', 'insights/local-ai-data-security']){
  const html=await readFile(path.join(root,'dist',route,'index.html'),'utf8');
  assert.match(html,/<meta name="viewport"/);
  assert.match(html,/<title>[^<]+<\/title>/);
  assert.match(html,/noindex,nofollow/);
  for(const file of ['/assets/fonts.css','/assets/brand-mark.png','/styles.css','/polish.css','/offers.css','/app.js'])assert.ok((await stat(path.join(root,'dist',file))).size>0);
}
for(const file of ['deal-map.webp','chat.webp','crm.webp','personal-chat.webp','font-0.woff2','font-1.woff2','font-2.woff2'])assert.ok((await stat(path.join(root,'dist','assets',file))).size>0);
for(const file of ['business-chat.mp4','host-join.mp4'])assert.ok((await stat(path.join(root,'dist','media',file))).size>1000);
for(const file of ['knowledge-environment.webp','knowledge-environment-small.webp','contract-short-poster.webp'])assert.ok((await stat(path.join(root,'dist','assets',file))).size>0);
assert.ok((await stat(path.join(root,'dist','media','contract-short.mp4'))).size<500000);
assert.match(await readFile(path.join(root,'dist','media','contract-short.vtt'),'utf8'),/^WEBVTT/);
const pricingHtml=await readFile(path.join(root,'dist','pricing','index.html'),'utf8');
assert.match(pricingHtml,/id="business-single"/);assert.match(pricingHtml,/id="business-company"/);
assert.match(pricingHtml,/data-monthly="30" data-annual="360"/);
assert.match(pricingHtml,/data-billing="annual"/);
for(const file of ['benefit-answer','benefit-deal','benefit-approval','benefit-review','benefit-export','license-single','license-company'])assert.ok((await stat(path.join(root,'dist','assets',file+'.svg'))).size>0);
const articleHtml=await readFile(path.join(root,'dist','insights','local-ai-data-security','index.html'),'utf8');
assert.match(articleHtml,/<h1>Local AI for business:/);
assert.match(articleHtml,/<h2 id="security">The controls still matter/);
assert.match(articleHtml,/og:type" content="article/);
const articleSchema=JSON.parse(articleHtml.match(/<script type="application\/ld\+json">([^<]+)<\/script>/)[1]);
assert.equal(articleSchema['@type'],'Article');assert.equal(articleSchema.creativeWorkStatus,'Draft');
for(const file of ['insights-cover.png','local-ai-data-flow.svg','local-ai-data-flow-mobile.svg'])assert.ok((await stat(path.join(root,'dist','assets',file))).size>0);
const {topics}=await import('./content/insights.mjs');assert.equal(topics.length,16);assert.equal(new Set(topics.map(t=>t.id)).size,16);
assert.equal(topics.filter(t=>t.status==='draft').length,1);
function luminance(hex){const values=hex.match(/[\da-f]{2}/gi).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return .2126*values[0]+.7152*values[1]+.0722*values[2];}
const pairs=[['clear ink','#132d42','#f9fbfd'],['clear body','#506579','#ffffff'],['clear CTA','#ffffff','#2859d9'],['product ink','#f4f7ee','#101918'],['product body','#b0beb4','#192421'],['product CTA','#18251c','#d3ef8c'],['editorial ink','#293a30','#f7f4ed'],['editorial body','#58665a','#fffcf6'],['editorial CTA','#fffdf8','#30513b']];
for(const [label,fg,bg] of pairs){const a=luminance(fg),b=luminance(bg),ratio=(Math.max(a,b)+.05)/(Math.min(a,b)+.05);assert.ok(ratio>=4.5,`${label}: ${ratio}`);console.log(`${label}: ${ratio.toFixed(2)}:1`);}
console.log('PASS: 9 routes, assets/media, JS syntax, pricing HTML and billing data, article HTML/metadata/schema, 16 unique topics, 9 contrast pairs.');
