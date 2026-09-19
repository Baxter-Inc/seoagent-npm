# Publishing Target Decision

Articles need a working place to live before they're worth generating. The good news: **you (the coding agent) are the publishing engine.** You have full repo access and can read exactly how this project's content/CMS works — so you can publish a finished article to wherever the user's content *already lives*, with no SEOAgent-specific infrastructure. Don't make the user adopt a new system; meet their content where it is.

**The decision is just: where does this site's content live?** Almost always one of:

- **A. In the repo** (markdown / MDX / Astro content collections / a static-site generator) → you write the file.
- **B. In a CMS** (WordPress, Sanity, Contentful, Strapi, Shopify, Ghost, Webflow, Payload, Notion, …) → you publish via the API the repo already uses.
- **B2. In a hosted CMS with no repo at all** (a wordpress.com blog, self-hosted WordPress with no code checkout, Shopify, Webflow, Squarespace, Wix, …) → there is no repo to find; you publish through the platform's API after the user enables it, or hand the article over as a file when the platform has no API. See § "No repo" below.

SEOAgent Cloud *hosting* (option C below) exists only as a convenience for users who have **no** content home and no engineering resources — it is NOT the default. Never lead with it.

> **Guardrail — the "DB-backed / headless blog with no repo files" trap.** Some sites have a blog *route* (`app/blog/[slug]/page.tsx`, `/posts/[slug]`, …) that renders rows from a **database or headless store** — the app's own Postgres/Supabase, an internal admin API, a headless setup — while the **repo contains no content files** for it. When you find this, an existing route + a live `/blog` does NOT mean you've found the publishing path. Do **NOT**:
> - **write directly into that production database** (e.g. an `INSERT` via an MCP/SQL tool) — that's not how the app publishes, it bypasses every safeguard, and it's usually read-only anyway; and
> - **assume SEOAgent Cloud (or a "dashboard") will publish it** — the cloud does not publish to the user's own site. Never invent a publishing mechanism you haven't verified.
>
> Instead, **the default recommendation is to make the blog repo-native: add a git-based Markdown/MDX content collection** (option A) — a `content/blog/` dir the route reads from — so publishing becomes a reviewed commit, no extra services. If the user would rather keep the DB/headless setup, **ask them how a post actually gets created** (which API endpoint or command produces a live page) and record it as option B / `other` — never guess. When a site has no working content home at all, **recommend creating a Markdown collection as the default**, ahead of adopting a CMS or the cloud.

**Trigger this protocol when:**

- Phase 1 raised a `critical` `upstream_dependency_unreachable` or `page_renders_empty` finding on a content path (e.g., `/blog`, `/docs`, `/resources`)
- `project.md` has no `cms` and no `blog_path`, and the user wants to start publishing
- The user explicitly asks "where should I publish my blog posts?" or "my blog is broken — what now?"
- **The publishing source changed** — the user tells you they switched/removed their CMS or moved the blog, OR you notice it while working (CMS client code / deps / env vars added or removed, a new `app/blog/**` or `pages/blog/**` route appeared, or the `cms` recorded in `project.md` no longer has any supporting signal in the repo). Go to **"Re-detecting the publishing target"** below — `project.md` is only as good as its last detection, and a stale `cms`/`blog_path` silently misroutes every future article.

Figure out the destination from the codebase first (you usually already know it from `init`'s CMS detection + `blog_path`, and from `pages.md`). Only ask the user if the repo is genuinely ambiguous.

## A. The repo (default for any repo-based site) — `strategy: mdx_sync`

The site renders content from files in this repo (Next.js `content/`, Astro `src/content/`, a `_posts/` dir, MDX routes, a static-site generator, etc.).

- **How you publish:** **Read an existing published article first** to learn the exact location, filename convention, and frontmatter shape this site expects. Then write the article **directly into a new file in that same location** (Phase 4 step 7), matching that frontmatter exactly (their field names, their date format, their tags). Inject internal links + image refs. If a route/sitemap entry is needed and missing, add it. **The repo file is the single source of truth for the body** — do NOT also write a full-body copy into `.seoagent/`.
- **Register it so the cloud sees it:** after the repo file is written, run `seoagent content track --slug {slug} --url https://{domain}{blog_path}/{slug} --file {path}` (Phase 4 step 7). That's what makes the article appear on the dashboard — `sync` only walks `.seoagent/`, so a repo-only article is otherwise invisible to the cloud. The track record is a pointer, not a duplicate.
- **First post / just-converted blog (no existing file to copy):** if the content dir is empty — a brand-new blog, or one you're converting from a DB/headless source per the guardrail above — define a simple frontmatter convention yourself (`title`, `description`, `date`, `tags`, `slug`) and, if the route doesn't yet read from files, scaffold the loader + route to read the content dir (this is the one-time setup task in "After the user picks", tracked with `setup_status: pending` until it deploys).
- **Ship it the way the repo ships:** open a PR (or commit to a branch) so the user's existing CI/CD deploys it. Never push straight to the default branch without asking.
- **Best for:** any site whose content is in version control. This is the most common case and the highest-control path.

## B. The user's CMS (default for CMS-backed sites) — `strategy: custom`

The site pulls content from a CMS. You don't need a SEOAgent adapter — **read how the repo already talks to the CMS** (the existing fetch/SDK code, the env var names) and mirror it to *create* a post.

- **How you publish:** find the CMS client/credentials the app already uses (`.env*`, an SDK import, an API base). Map the article (`title`, `slug`, body, meta, canonical, JSON-LD) to that CMS's content model and create the entry — print the exact `curl`/SDK call for the user to run, or, with explicit consent, run it yourself using their existing credentials. Confirm the post is a draft vs. published per the user's preference. The CMS holds the body; **then `seoagent content track --slug {slug} --url {live-url}` so the dashboard tracks it** (the cloud can't see your CMS).
- **Mapping starting points:** Strapi → `POST /api/articles` `{data:{…}}`. Sanity → `client.create({_type:'post',…})`. Contentful → Management API `createEntry`. Webflow → `POST /collections/:id/items`. Shopify → `POST /admin/api/.../articles.json`. Ghost → Admin API `posts.add`. WordPress → `POST /wp-json/wp/v2/posts`. For anything unfamiliar, ask the user once how a post gets created, then store the mapping in `project.md` so future articles are one step.
- **Best for:** teams with an existing CMS — keep it, just get SEOAgent's content into it.

## No repo: the site lives on a hosted CMS — `strategy: custom`

You were set up in an empty folder (`seoagent init` and the setup block both say so for wordpress.com, wixsite.com, squarespace.com, myshopify.com, webflow.io, ghost.io, blogspot.com, … domains), or `init` found no code that builds the site and the live site is plainly a hosted platform. **Do not hunt for a repository and do not ask the user for one — there isn't one.** This folder is the workspace. A hosted site gets the full SEOAgent loop: the audit runs against the live site, keywords and strategy and briefs are the same, articles are written the same. **Only delivery differs**, and it goes through the platform's connector — its API where it has one, its editor where it does not. Set the connector up once, in the first session, before the first brief.

### 1. Identify the platform from the live site, once

`WebFetch https://{domain}/wp-json/` — a JSON body with `name`/`namespaces` is WordPress (self-hosted or WordPress.com). Otherwise read the homepage HTML: `<meta name="generator" content="WordPress …">`; `static.wixstatic.com` / `wix-` assets (Wix); `static1.squarespace.com` (Squarespace); `cdn.shopify.com` assets or `/products.json` answering (Shopify); `data-wf-site` (Webflow); `ghost` assets (Ghost); `blogger.com` assets (Blogger). Record it in `project.md`: `publishing.strategy: custom`, `publishing.cms: <wordpress | wix | squarespace | shopify | webflow | ghost | blogger | other>`, `blog_path` from the live blog URL.

### 2. Set up the connector — ask the user ONCE, with the exact steps, nothing else in that message

Before the first API call, `WebFetch` the platform's current API reference for creating a post and use what it says — endpoints and versions move; the notes below say where to look and what to ask for, not the exact request shape. Record the working call in `project.md` under `publishing.notes` so the next article is one step.

- **WordPress (self-hosted, or WordPress.com Business/Commerce):** Users → Profile → Application Passwords → create one named `seoagent`. Env: `WORDPRESS_API_URL=https://{domain}/wp-json`, `WORDPRESS_USERNAME`, `WORDPRESS_APP_PASSWORD`. Posts: `POST {WORDPRESS_API_URL}/wp/v2/posts` with HTTP Basic auth, `status: draft`. Titles and meta descriptions of existing pages are editable the same way (`/wp/v2/pages`, plus the SEO plugin's fields when Yoast or Rank Math is installed).
- **WordPress.com (Free / Personal / Premium):** the REST API lives at `https://public-api.wordpress.com/wp/v2/sites/{domain}/posts` and needs an OAuth2 bearer token from a WordPress.com app (developer.wordpress.com/apps — the user creates the app, authorizes it, and gives you the token). Env: `WPCOM_SITE`, `WPCOM_TOKEN`. Ask which of the two WordPress routes applies; the `/wp-json/` probe in step 1 answers it (Business sites answer on their own domain).
- **Wix:** Wix account → API Keys Manager → create a key with **Blog** (and Site) permissions; the **site ID** is in the site dashboard URL / Settings. Env: `WIX_API_KEY`, `WIX_SITE_ID`. The Wix REST Blog API creates a draft post (headers: `Authorization: {WIX_API_KEY}`, `wix-site-id: {WIX_SITE_ID}`), which the user publishes from the editor or you publish through the API when told to. Page titles and descriptions: the Wix SEO settings API where the key has permission, otherwise the page's SEO panel.
- **Squarespace:** no public API for posts — the connector **is the editor**. Write each article to `.seoagent/content/{slug}.md` with the exact title, URL slug, SEO title, meta description, body (headings, links, image alt text) and a one-line paste plan (Blog → + → paste body → Settings → SEO → title/description/slug). Walk the user through the first one. Titles, descriptions, redirects (Settings → Developer Tools → URL Mappings) and sitemap/GSC verification are reported with the exact panel.
- **Shopify:** custom app in the store admin with `write_content` (blog) scope → Admin API access token. Env: `SHOPIFY_STORE`, `SHOPIFY_ADMIN_TOKEN`. Articles go to the blog articles endpoint under `/admin/api/{version}/blogs/{blog_id}/articles.json`, `published: false`.
- **Webflow:** a site API token with CMS write access. Env: `WEBFLOW_TOKEN`, `WEBFLOW_COLLECTION_ID` (the blog collection). Items go to `POST https://api.webflow.com/v2/collections/{collection_id}/items` as drafts; publishing the site is the user's step unless told otherwise.
- **Ghost:** an Admin API key from Settings → Integrations. Env: `GHOST_URL`, `GHOST_ADMIN_KEY`. `POST /ghost/api/admin/posts/` with a Ghost Admin JWT, `status: draft`.
- **Blogger:** Blogger API v3 with an OAuth token from a Google Cloud project. Env: `BLOGGER_BLOG_ID`, `BLOGGER_TOKEN`. `POST https://www.googleapis.com/blogger/v3/blogs/{blogId}/posts?isDraft=true`.
- **Weebly, GoDaddy Website Builder, Carrd, Notion, Substack, Medium, Tumblr, Framer, or anything else with no post API you can use:** same as Squarespace — the editor is the connector. Say so plainly in the first session; do not promise API publishing you cannot verify.

### 3. Keep the credential in `.env` in this folder

Add `.env` to `.gitignore` if a git repo ever appears here. Never write a credential into `project.md`, a brief, `context.md` or any tracked file; record only the **env var names** in `publishing.notes`. Never ask the user to paste a key into chat when they can put it in the file themselves. If the key stops working (401/403), tell the user which variable to refresh — do not retry blindly.

### 4. Publish as a draft unless the user says otherwise

Exactly as option B: map `title`, `slug`, body (HTML for WordPress / Ghost / Shopify / Blogger / Wix; Webflow takes rich text), excerpt / meta description, and the canonical. Show the user the draft URL. When it is live, `seoagent content track --slug {slug} --url {live-url}` so the dashboard tracks it — the cloud cannot see the platform.

### 5. What else you can change on a hosted site

Most audit findings on a hosted site are settings, not code: page titles and meta descriptions, image alt text, redirects, the sitemap and robots (the platform generates them — verify, do not rewrite), Search Console verification, structured data where the platform allows custom code. Fix them through the connector when it has the permission (WordPress pages, Wix SEO settings), otherwise report each one with the exact panel and value. Never say a fix is done until you have re-fetched the live page and seen it.

### 6. Never fall back to SEOAgent Cloud hosting or a `/blog` proxy for these sites

The user's blog already exists on the platform; putting a second one next to it splits their content.

## C. SEOAgent Cloud hosting (optional — only when there's no content home) — `strategy: managed_proxy` | `subdomain`

For users with no repo content path and no CMS who don't want to build one. Requires `seoagent login`. Two shapes:

- **Managed proxy** (`managed_proxy`): a one-time rewrite (`/blog/*` → `https://proxy.seoagent.com/{site-token}/blog/*`) so posts render at `{domain}/blog/{slug}` on the user's own domain (full link equity).
- **Hosted subdomain** (`subdomain`): a CNAME from `blog.{domain}` — easiest, but a separate-site SEO trade-off.
- Only suggest these if A and B genuinely don't apply. They're a convenience, not the recommended path.

## Other / let me describe my setup — `strategy: other`

Homemade CMS, an unusual static pipeline, Notion-as-CMS, etc. Ask the user to describe their publish flow in plain English (what command/API produces a live page), capture it in `project.md` under `publishing.notes`, and treat it like A or B — you generate the file or API call per article.

## After the user picks

`Edit` `project.md` to record the choice:

```yaml
publishing:
  strategy: managed_proxy | subdomain | mdx_sync | custom | other
  cms: strapi | wordpress | sanity | contentful | webflow | shopify | ghost | payload | wix | squarespace | blogger | other  # only when strategy is custom or other
  blog_path: /blog                          # canonical URL prefix on the live site
  content_dir: content/blog                 # repo-root-relative dir where article files live (mdx_sync — lets sync auto-track from article #1)
  setup_status: pending | done              # done = the one-time setup task is complete
  notes: "Free-text — e.g., 'rewrite added to next.config.js on 2026-04-28'"
```

Then:

1. Append a one-time setup task to `roadmap.md` under "High" — e.g., "Add Vercel rewrite for /blog/* → proxy.seoagent.com" or "Scaffold app/blog/[slug]/page.tsx for MDX sync". Mark it `[ ]` until the user confirms it's deployed.
2. Append to `changelog.md`: `[date] Publishing strategy: {strategy} ({cms or n/a})`.
3. Run `seoagent sync`.
4. Stop. **Do not generate briefs or articles until `setup_status: done`** — when the user confirms the rewrite is live (or the MDX route deploys, or the CMS credentials work), `Edit` `project.md` to set `setup_status: done` and continue to Phase 3.

## Re-detecting the publishing target (when it changes)

`init` detects `cms` + `blog_path` **once**, at install. Nothing re-runs that automatically — so when the user re-architects how content is published (a very common moment: ripping out a broken CMS, moving the blog into the repo, switching CMS), `project.md` goes stale and every later phase trusts the wrong destination. When any "publishing source changed" trigger above fires, re-detect and reconcile **before** writing briefs or articles:

1. **Re-derive from the repo** — the same signals `init` uses:
   - **CMS** — dependencies in `package.json` (`strapi`/`@strapi/*`, `@sanity/client`/`next-sanity`, `contentful`, `@tryghost/content-api`, `webflow-api`, `@shopify/*`, `payload`/`@payloadcms/*`, `@directus/sdk`, `wpapi`/`wp-graphql`) and CMS env vars (`STRAPI_URL`, `SANITY_PROJECT_ID`, `CONTENTFUL_SPACE_ID`, `GHOST_URL`, `WORDPRESS_API_URL`, …). No CMS signal + local markdown under `content/`, `_posts/`, `src/content/` → `mdx-local`. No signal at all → repo-rendered routes (`mdx_sync`, `cms` omitted).
   - **blog_path** — the live route file: `app/blog/page.tsx`, `src/app/blog/page.tsx`, `pages/blog/index.tsx`, or the `/articles`, `/posts`, `/learn`, `/resources` equivalents.
2. **Diff against `project.md`** (`publishing.cms`, `publishing.strategy`, `blog_path`). If they match, do nothing — say "publishing setup unchanged" and move on.
3. **If they differ, PROPOSE — don't auto-rewrite.** Show the before/after in one line with your evidence: e.g. *"`project.md` says `cms: strapi`, but the Strapi deps + `STRAPI_URL` are gone and `/blog` now renders from `app/blog/[slug]/page.tsx`. Update to `strategy: mdx_sync`, drop `cms`, keep `blog_path: /blog`?"* Wait for the user's yes.
4. **On confirmation, `Edit` `project.md`:** update `publishing.strategy`, `publishing.cms` (remove the key when there's no CMS — never write the literal `none`), and `blog_path`. **If the `strategy` changed**, the old one-time setup no longer applies → reset `publishing.setup_status: pending` and re-run "After the user picks" (new roadmap task + re-verify the target is live via the Phase 3 Step 0 WebFetch). If only `cms`/`blog_path` shifted within the same strategy, keep `setup_status`.
5. Append to `changelog.md`: `[date] Publishing re-detected: {old} → {new}`. Run `seoagent sync`.

If you spot the drift incidentally (mid-audit, mid-edit), surface it as a one-line heads-up + offer rather than blocking — re-detect only when the user agrees, or when you're about to act on the stale target (Phase 3+).

## Where the article body lives — one source of truth

The publishing strategy decides where an article's **body** is written. Never write it twice.

- **`mdx_sync` / `custom`** — the body lives in the **repo file or CMS entry**, NOT in `.seoagent/`. Match the site's existing frontmatter and content model exactly (read an existing article first). Tracking is automatic once `publishing.content_dir` is set: the next sync registers the file. Only when no content dir is declared *and* nothing is tracked yet, run once:
  `seoagent content track --slug {slug} --url https://{domain}{blog_path}/{slug} --file {path}`
  (it self-records `content_dir`). **Never hand-write a duplicate full-body `.seoagent/content/{slug}.md`** — two copies of one article drift, and the sync then reports both.
  **Publishing a cloud-delivered draft under a different slug?** Add `--supersedes {the-delivered-slug}` (and `--action {action_id}`). Renaming a generated slug is good editorial practice, but `content track` keys on the slug — without the claim the cloud keeps the original as an unfinished draft and re-delivers the same article. See `docs/harness/DESIGN-article-identity.md`.
- **`managed_proxy` / `subdomain`** (cloud-hosted) — the body **does** live in `.seoagent/content/{slug}.md` with full SEO frontmatter (schema in `references/schemas.md`), published by `seoagent sync`.

Either way: ship repo articles the way the repo ships — PR or branch, never straight to the default branch without asking.

## Images — never block publishing on them

Always write `images:` frontmatter with `alt` + `prompt` (or `src` for a captured screenshot). If `project.md` has `image_provider`, offer `seoagent generate-image --prompt "..." --out .seoagent/content/images/{slug}-hero.png`. If it's absent, run `seoagent env-check` first — it detects keys added after `init` and records the provider. Still nothing → offer the one-line key ask, then **write prompts only and continue publishing**. Images are never a blocker.

For SaaS sites (`site_type: saas`, or a repo rendering real product UI), capture real product screenshots per `references/screenshots.md` for hero/feature/how-to spots **before** falling back to generated images.
