# Product Screenshot Protocol

Use when the site is a **SaaS / product app** and a page or article would be stronger with a **real screenshot of the product's UI**. A genuine product screenshot is the single highest-converting visual on a SaaS landing page or how-to article — it beats AI illustrations and stock photography every time.

**You capture these yourself, from the product's own code in this repo.** No Playwright/Puppeteer dependency, no paid screenshot API — use the screenshot capability already available in your environment (a connected browser/preview tool, or the project's own dev server). If you have no way to capture, fall back gracefully (see **Fallback**) — never block a page on a screenshot.

## When this applies (SaaS gate)

Only pursue product screenshots when **both** are true:

1. **The site is a SaaS / product app**, not a content/local/services site. Confirm from the repo, which is the ground truth:
   - `project.md` has `site_type: saas`, **or**
   - the repo renders a real UI (an app shell, dashboard, feature components under `app/`, `src/components/`, etc.) — a product you could screenshot.
   - A plumber's blog, a media site, or a pure-marketing repo with no product UI → **skip this protocol**.
2. **A specific spot would be stronger with a UI shot and doesn't have one** (see Gap Evaluation).

If the cloud queued an action whose body has a **"Screenshots to capture"** section, the SaaS gate is already a yes — go straight to Gap Evaluation + Capture.

## Where product screenshots add value

| Page / section | Shot to capture |
|---|---|
| Landing **hero** | The product's primary screen (dashboard, main view) — the "this is the thing" shot |
| Landing **feature deep-dives** | The specific UI for each feature being described (one shot per feature section) |
| **How-to / tutorial** article steps | The screen the step is describing — capture the actual state for that step |
| **Comparison** pages | The product's UI for the capability being compared |

Don't over-shoot: 1 hero + 2–4 feature shots is the sweet spot for a landing page. A how-to gets one shot per major step that has a UI.

## Gap Evaluation (new pages AND existing ones)

Scan the page for **missing visuals** — places where the reader is asked to imagine UI that you could just show:

- A feature `<section>` / feature block describing the product with **no image**.
- A how-to step ("Click **Connect**", "Open the dashboard") with **no screenshot** of that screen.
- A landing **hero** with no product shot (or a stock/illustration placeholder where a real screen belongs).
- Prose like "see the X view", "your dashboard shows…", "the editor lets you…" with nothing to look at.

Each gap that passes the SaaS gate is a screenshot to capture. When auditing/refreshing an **existing** landing page, this same scan is how you find screenshots to add — fold the gaps into the rewrite (see `references/rewrite-protocol.md`).

## Capture

1. **Find the route/component** in this repo that renders the UI you want — the page route (e.g. `app/dashboard/page.tsx`, a feature page) or a self-contained component you can render in isolation.
2. **Render it.** Detect the project's dev command from `package.json` `scripts` (`dev`, then `start`) and start it (or reuse a server that's already running). Note the local URL (e.g. `http://localhost:3000/<route>`).
3. **Capture a PNG** of the rendered route using the screenshot capability available in your environment. Frame/crop to the relevant UI — show the feature, not the whole browser chrome. Use a clean state (seeded/demo data, no personal info, no error toasts).
   - **Do NOT** add Playwright/Puppeteer to the project, and **do NOT** call a paid screenshot API just for this. Use what's already available.
4. **Save it** to the repo's public asset directory — detect the convention (`public/screenshots/`, `static/screenshots/`, `assets/`) and create `screenshots/` there if absent. Name it `{page-slug}-{section}.png` (e.g. `pricing-hero.png`, `seo-audit-feature.png`).
5. **Reference it** in the page/article with descriptive, keyword-aware alt text and responsive markup that matches how the site embeds images (Next.js `<Image>`, MDX `![alt](path)`, an existing image component — match the site's pattern). Alt text describes the screen + the keyword, e.g. `alt="SEOAgent dashboard showing a completed technical SEO audit with severity badges"`.

## Auth-gated screens (log in for the capture)

The most valuable SaaS screenshots — the dashboard, the audit view, the data tables — usually sit **behind login**. A route that redirects to `/login` is not a dead end: on **the user's own product, on their machine, with their go-ahead**, log in and capture the real UI. (Only ever do this for the project in the current repo — never a third-party site.)

1. **Detect the auth system** from the repo — Supabase (`@supabase/ssr`, an `sb-<ref>-auth-token` cookie), NextAuth, Clerk, a custom JWT, etc. Find the login route and the callback route (e.g. `app/auth/confirm`).
2. **Establish a session without a password** — never set or reset the user's password (it locks them out of their own account):
   - **Supabase:** use the **service-role key already in the app's server env** to mint a one-time link for an account that owns real data — `supabase.auth.admin.generateLink({ type: 'magiclink', email })` → take `properties.hashed_token` → drive the app's *own* callback (`/auth/confirm?token_hash=<hash>&type=magiclink`) so the app sets the session cookie itself. Don't hand-craft the cookie.
   - **Other providers:** reuse an existing local session/token if one is on disk; otherwise follow that provider's admin/impersonation path.
   - **Pick the account that owns real data** (query for the row owner — e.g. the `user_token`/`website_token` that owns the site's rows) so the dashboard renders content, not an empty state.
3. **Drive it with the repo's existing headless browser.** If Playwright/Puppeteer is **already a dependency** (check `package.json` — many apps ship it for tests/workers), use it to follow the login and capture. The "don't add Playwright" rule still holds — *don't add* one just for screenshots; only reuse what's already installed. If there's none, fall back.
4. **Boot gotchas.** The dev server may refuse to start because the local `.env.local` is missing, or its var names have drifted from what the code reads (e.g. Supabase renamed `ANON_KEY`→`PUBLISHABLE_KEY` and `SERVICE_ROLE_KEY`→`SECRET_KEY`). Copy/alias the needed vars locally (the file is gitignored) to boot the server, and **remove any copied secrets when you're done**.
5. **Mask PII in every authenticated frame** (see Conventions): before each screenshot, replace the account email, real name, and any billing info in the DOM with placeholders (`you@yourcompany.com`) and hide account menus. Product data — audit findings, keywords, page metrics — is fine to show; personal identifiers are not.

If you genuinely can't get a session (no service-role key, external SSO you can't mint for, no headless browser already installed), fall back (below): leave a `SCREENSHOT-TODO`, and ask the user to run the dev server while logged in — or to drop the PNG in themselves.

## Frontmatter

When the page uses `images:` frontmatter (landing pages, content), record the screenshot as a captured asset, not an AI prompt:

```yaml
images:
  hero:
    alt: "SEOAgent dashboard showing a completed audit with green/red severity badges"
    src: /screenshots/dashboard-hero.png      # captured product screenshot (preferred for SaaS)
  inline:
    - alt: "The keyword research view with volume and difficulty columns"
      src: /screenshots/keywords-feature.png
      placement: "after H2 'Keyword research'"
```

`src` = a real captured screenshot. Fall back to `prompt:` (AI image) only when a screenshot isn't possible.

## Fallback (never block the page)

If the product can't be rendered/captured (no dev server, no screenshot tool available, the route needs auth you can't establish even via **Auth-gated screens** above, or there's no real UI yet):

- Leave a marker where the shot belongs so the gap is visible and actionable later:
  ```html
  <!-- SCREENSHOT-TODO: capture the {feature} screen at {route} and place here -->
  ```
- Also write an AI image `prompt:` into the frontmatter (existing flow in `references/landing-pages.md` → Images) so publishing still succeeds with *some* visual.
- Mention to the user in one line what you couldn't capture and why, so they can run the dev server / point you at the right screen.

## Conventions

- One folder for captures (`public/screenshots/` or the repo's equivalent) — don't scatter PNGs.
- Real, current UI only — never fabricate a screenshot or reuse a competitor's.
- No PII / no real customer data in the frame — use demo/seed state.
- Re-capture when the UI changes materially (a feature redesign stales old shots) — the Gap Evaluation on a refresh catches this.
