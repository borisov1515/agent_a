import { mkdir, readFile, writeFile, cp, stat } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import {renderInsights,renderArticle,articleTitle,articleDescription} from './content/insights.mjs';
import {renderPricing} from './content/pricing.mjs';

const root = path.dirname(fileURLToPath(import.meta.url));
const pages = {
  home: ['', 'AgentA — Private AI for your working world', 'Bring documents, answers and everyday work together. Private AI for individuals and businesses.'],
  business: ['business', 'AgentA Business — Your team’s knowledge, ready for work', 'Connect documents, correspondence and deals in a private AI workspace for your company. Explore Solo and Multi-User.'],
  personal: ['personal', 'AgentA Personal — Make room for your real work', 'Find answers in your files, review documents and stay on top of everyday tasks with private AI on Windows.'],
  contact: ['contact', 'Meet AgentA — Request a demonstration', 'Tell Realight Dev about your document workflow and explore a practical AgentA pilot.'],
  privacy: ['privacy', 'AgentA — Data and control', 'Understand local processing, optional connections and the decisions that stay with you.'],
  pricing: ['pricing', 'AgentA Pricing — Personal, One Computer or Company-wide', 'Compare monthly and annual subscriptions for Personal, Business on one computer, and a company-wide Business license.'],
  concepts: ['concepts', 'AgentA — Сравнение направлений дизайна', 'Локальный просмотр трёх направлений дизайна AgentA.'],
  insights: ['insights', 'AgentA Insights — Local AI for Business', 'Practical articles on private AI, data security, business workflows and AI adoption for small companies.'],
  article: ['insights/local-ai-data-security', articleTitle+' | AgentA Insights', articleDescription]
};
const siteUrl=(process.env.SITE_URL||'').replace(/\/$/,'');
await mkdir(path.join(root, 'dist'), { recursive: true });
await cp(path.join(root, 'public'), path.join(root, 'dist'), {
  recursive: true,
  filter: async (source, destination) => {
    const sourceInfo = await stat(source);
    if (sourceInfo.isDirectory()) return true;
    try {
      const destinationInfo = await stat(destination);
      return sourceInfo.size !== destinationInfo.size || sourceInfo.mtimeMs > destinationInfo.mtimeMs;
    } catch { return true; }
  }
});
for (const [key, [route, title, description]] of Object.entries(pages)) {
  const dir = path.join(root, 'dist', route);
  await mkdir(dir, { recursive: true });
  const staticContent=key==='insights'?renderInsights():key==='article'?renderArticle():key==='pricing'?renderPricing():'';
  const canonical=siteUrl?siteUrl+'/'+(route?route+'/':''):'';
  const structured=key==='article'?{'@context':'https://schema.org','@type':'Article',headline:articleTitle,description:articleDescription,inLanguage:'en',articleSection:'Data & security',creativeWorkStatus:'Draft',author:{'@type':'Organization',name:'Realight Dev'},publisher:{'@type':'Organization',name:'Realight Dev'},...(canonical?{mainEntityOfPage:canonical,image:siteUrl+'/assets/insights-cover.png'}:{})}:null;
  const seo=key==='article'||key==='insights'?`<meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:type" content="${key==='article'?'article':'website'}"><meta property="og:site_name" content="AgentA"><meta name="twitter:card" content="summary_large_image">${siteUrl?`<meta property="og:image" content="${siteUrl}/assets/insights-cover.png"><meta property="og:url" content="${canonical}"><link rel="canonical" href="${canonical}">`:''}${structured?`<script type="application/ld+json">${JSON.stringify(structured).replace(/</g,'\\u003c')}</script>`:''}`:'';
  const html = `<!doctype html>
<html lang="${key === 'concepts' ? 'ru' : 'en'}" data-theme="clear"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark"><meta name="description" content="${description}">
<meta name="robots" content="noindex,nofollow"><title>${title}</title>
${seo}
<link rel="icon" type="image/png" href="/assets/brand-mark.png">
<link rel="stylesheet" href="/assets/fonts.css"><link rel="stylesheet" href="/styles.css"><link rel="stylesheet" href="/polish.css">
<link rel="stylesheet" href="/offers.css">
${key==='insights'||key==='article'?'<link rel="stylesheet" href="/insights.css">':''}
<script>try{const q=new URLSearchParams(location.search);const t=q.has('compare')?q.get('design'):'clear';document.documentElement.dataset.theme=['clear','product','editorial'].includes(t)?t:'clear'}catch{}</script>
<script src="/app.js" defer></script></head><body data-page="${key}">
<a class="skip" href="#main">Skip to content</a><div id="app">${staticContent}</div>
${staticContent?'':`<noscript><main class="container section"><h1>Meet AgentA.</h1><p>Private AI for your documents and everyday work.</p><p>This local design preview uses JavaScript. You can reach us at <a href="mailto:contact@realight.dev">contact@realight.dev</a>.</p></main></noscript>`}
</body></html>`;
  await writeFile(path.join(dir, 'index.html'), html);
}
await writeFile(path.join(root, 'dist', '404.html'), await readFile(path.join(root, 'dist', 'index.html')));
console.log('Built '+Object.keys(pages).length+' local pages → dist');
