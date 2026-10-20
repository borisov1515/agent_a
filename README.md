# AgentA website preview

Current AgentA marketing website, prepared for Vercel with server-side HTTP Basic authentication. No external analytics or server-side form submission. The repository contains the website only.

## Protected access

The browser displays its standard login dialog. Authentication runs before pages, images, JavaScript and videos are served, both on the local Node server and through Vercel Routing Middleware. Responses are private, not cached, and excluded from indexing.

Set **both** `SITE_AUTH_USER` and `SITE_AUTH_PASSWORD` in Vercel's environment settings before deploying. For local preview, copy `.env.example` to `.env.local` and fill in the privately agreed credentials. The local server loads that ignored file automatically. Missing or empty credentials deny all access. Credentials and credential hashes are never committed or bundled into public JavaScript. The repository itself is public; website authentication does not restrict access to GitHub source or media files.

## Vercel setup

Import `borisov1515/agent_a`, use repository root as Root Directory, and select **Other** as the framework. `vercel.json` configures installation with the committed pnpm lockfile, `pnpm run build`, and output directory `dist`. The root `middleware.ts` protects every route, including static files. Deploy using the full project so middleware is built; uploading `dist` alone to static hosting does not provide authentication. No Vercel deployment has been performed by this commit.

## Preview

Run `node serve.mjs` in this folder. Open <http://127.0.0.1:4173/business/>.

Clear Business is selected. Normal pages use this theme and hide design controls. Earlier concepts remain archived at `/concepts/`; explicit `?compare=1&review=1&design=product` enables the old comparison mode.

Routes: `/`, `/business/`, `/personal/`, `/pricing/`, `/contact/`, `/privacy/`, `/insights/`, `/insights/local-ai-data-security/`, `/concepts/`.

Pricing is generated into HTML from `content/pricing.mjs`. Personal is an illustrative $30 monthly or $360 annually, without an assumed discount. Single-computer and company-wide Business license amounts are on request pending the user's numbers. Billing selection is carried into the contact draft. There is no payment integration. Business exposes both license scopes before its benefit cards; all benefits are simultaneously visible and illustrated with editable SVG assets from `scripts/make_benefit_art.py`. `public/offers.css` styles these additions.

The Insights index and example article are generated into HTML from `content/insights.mjs`. The index includes one draft and 15 planned topics. The article has a responsive data-flow illustration, a 1200×630 cover and draft Article JSON-LD. `SITE_URL` can be supplied at build time to generate canonical and absolute Open Graph URLs. Local builds remain noindex until an intentional production change; no deployment has been performed.

## Build and check

Run `pnpm install --frozen-lockfile`, then `pnpm run build` and `pnpm run check`. The build creates `dist`; checks cover the generated pages, media, JavaScript syntax, contrast and real HTTP authentication on pages and assets. Local preview runs with `pnpm run dev` or `node serve.mjs`. The dependency on `@vercel/functions` is for Vercel Routing Middleware.

## Media provenance

Business screenshots are crops of supplied product recordings, without reconstructing the interface. The Personal screenshot and original brand logo were downloaded from the existing official AgentA website. The brand mark is cropped from the original logo. Fonts are locally stored Google Fonts (Manrope, Instrument Serif), so the preview does not contact a font CDN.

The two full videos are supplied Multi-User walkthroughs with embedded captions. A separate 22-second silent excerpt (`contract-short.mp4`, 00:50–01:12 from the Chat walkthrough) is cropped to the useful application region, with a separate English VTT track. Playback speed is unchanged. It plays only on request and pauses offscreen. This excerpt is not the final narrated marketing video. Personal has a real screenshot and no Business video passed off as Personal.

The knowledge-environment illustration was created with ImageGen as a brand metaphor, then encoded into responsive WebP files. The original artwork and planning documents are retained separately in the local workspace. The interactive Ask/Connect/Act workflow is authored HTML/CSS/SVG, explicitly labelled as an illustration. `public/polish.css` defines the refined Clear Business design.

## Before production

Clear Business is selected. Approve final wording and commercial terms, prepare the final PDF and scenario videos, and review visible demo data. Set the final domain and metadata, intentionally remove the preview authentication and noindex headers/tags for public launch, remove the local review route/control if desired, finalize privacy/Business terms, and decide how enquiries should be sent. The current form opens an email draft; it never claims a request has been sent.

Vercel is deferred. Hobby is restricted to personal noncommercial projects; select an appropriate production plan for this commercial site.

Email infrastructure is separate from web hosting. InboxKit is selected for the initial two mailboxes; the domain will be purchased through Vercel. The planned use includes opted-in marketing and first B2B outreach, with gradual growth to roughly 100 outbound messages/day total. No provider account, DNS record, sending automation, warm-up service, or external integration has been configured. Campaign eligibility must follow the provider's acceptable-use policy. Application mail and campaign automation require their own implementation.
