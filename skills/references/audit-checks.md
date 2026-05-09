# Full Audit Check List

Loaded by Phase 1 (Technical SEO Audit) when running a full audit. The main `SKILL.md` summarizes the categories; this reference holds the complete check list with the exact pattern to match and the recommendation text.

## Crawlability & Indexation

### `robots_txt_exists`
Check: WebFetch `{domain}/robots.txt`. Pass = 200 OK.
Severity if fail: `high`
Recommendation: "Create a robots.txt file at {domain}/robots.txt. At minimum: `User-agent: *\nAllow: /\nSitemap: {domain}/sitemap.xml`."

### `robots_txt_blocks_important_paths`
Check: parse robots.txt for `Disallow:` directives. Match against the URL list in `pages.md`.
Severity: `critical` if blocks > 5 known important pages; `high` if blocks any important page.
Recommendation: List the blocking rules and which pages they affect.

### `sitemap_exists`
Check: WebFetch `{domain}/sitemap.xml`. Pass = 200 OK and parseable XML.
Severity: `high`
Recommendation: "Create a sitemap.xml. Include all canonical URLs. Submit to Google Search Console."

### `sitemap_in_robots`
Check: robots.txt contains a `Sitemap:` line.
Severity: `medium`
Recommendation: "Add `Sitemap: {domain}/sitemap.xml` to robots.txt so crawlers find it without GSC submission."

### `noindex_on_important_page`
Check: page HTML has `<meta name="robots" content="noindex">` or `X-Robots-Tag: noindex` header.
Severity: `critical` if homepage; `high` otherwise.
Recommendation: "Remove the `noindex` directive from {file/URL}."

### `canonical_tag_present`
Check: `<link rel="canonical" href="...">` exists in `<head>`.
Severity: `medium` if absent; `high` if points to a different domain.
Recommendation: "Add a self-referencing canonical tag: `<link rel=\"canonical\" href=\"{full URL}\">`."

### `redirect_chain`
Check: follow redirects, count hops.
Severity: `medium` if 2 hops; `high` if 3+; `critical` if loop.
Recommendation: "Resolve {URL} directly to {final URL} with a single 301 redirect."

### `http_to_https_redirect`
Check: WebFetch `http://{domain}` and confirm 301 to `https://`.
Severity: `high`
Recommendation: "Configure a 301 redirect from http:// to https:// at the server / CDN level."

## Render & Upstream Health

These checks catch the failure mode where a page returns `200 OK` but the body is empty or broken — Google sees a soft 404, you see a green status code, the audit silently passes. Run these on every page audited.

### `page_renders_empty`
Check: WebFetch the page, strip `<nav>`, `<footer>`, `<script>`, `<style>`, `<noscript>`, and visually-hidden elements. Count visible body words. Pass = body word count >= 30 AND a `<h1>` or main heading is present.
Severity: `critical` if the homepage or any sitemap-listed page; `high` for nav-linked pages; `medium` otherwise.
Recommendation: "Page returns 200 OK but renders empty (likely a client-side data fetch is failing — most often a CMS, API, or proxy the page calls is down). Open the network tab in DevTools or grep the codebase for the URL the page fetches. Until fixed, Google treats this as a soft 404 and will deindex the page. See `upstream_dependency_unreachable` below — they almost always go together."

### `upstream_dependency_unreachable`
Check: before auditing pages, use `Grep` to find external URLs the site depends on for content. Specifically search for:
- Cross-subdomain fetch URLs: `https://(blog|api|cms|content|admin|preview)\.{domain}` in `src/`, `app/`, `pages/`, `lib/`, `libs/`, `services/`
- `rewrites:` and `redirects:` blocks in `next.config.js`, `next.config.mjs`, `next.config.ts`, `vercel.json`
- Hardcoded API base URLs in `.env*` and `package.json`

Then WebFetch each unique base URL (and one representative API path if obvious). Pass = 2xx with non-empty body. Fail = 5xx, timeout, HTML error page, or "no healthy upstream"-style response.

Severity: `critical` if the dependency powers indexable pages (blog, docs, listings, product pages); `high` if it powers logged-in flows only; `medium` for purely internal admin tools.

Recommendation: "{dependency_url} returned {status}. The pages it powers ({list}) cannot render content — they will surface as `page_renders_empty`. Either restore the dependency, or move the affected pages to a different publishing target (see Publishing Target Decision in SKILL.md). Don't generate any new content for the affected URL pattern until this is resolved — the briefs and articles will all point at a dead address."

> **Why this check matters:** the most common SEO disaster on a live site is a CMS that's been quietly down for weeks — every page returns 200, the audit looks clean, but Google has been deindexing the blog the whole time. This check catches it on the first audit.

## On-Page SEO

### `title_missing`
Check: `<title>` element is empty or absent.
Severity: `critical`
Recommendation: "Add a `<title>` tag. Target 50-60 characters with primary keyword near the start."

### `title_too_long`
Check: title > 60 characters.
Severity: `high`
Recommendation: "Shorten title from {N} to 50-60 characters: `{suggested title}`"

### `title_too_short`
Check: title < 30 characters.
Severity: `medium`
Recommendation: "Title is too short to compete. Expand to 50-60 characters with primary keyword."

### `title_duplicate`
Check: same title across multiple pages in the audit.
Severity: `high`
Recommendation: "Pages {list} all use the same title. Make each unique."

### `meta_description_missing`
Check: `<meta name="description">` absent or empty.
Severity: `medium`
Recommendation: "Add a meta description, 150-160 chars, includes primary keyword and a soft CTA."

### `meta_description_too_long`
Check: meta description > 160 characters.
Severity: `low`
Recommendation: "Trim meta description from {N} to 150-160 chars: `{suggested}`."

### `h1_missing`
Check: no `<h1>` in the page body.
Severity: `high`
Recommendation: "Add exactly one `<h1>` containing the primary keyword."

### `h1_multiple`
Check: more than one `<h1>` in body.
Severity: `medium`
Recommendation: "Reduce to one `<h1>`. Demote others to `<h2>` or `<h3>`."

### `heading_hierarchy_skipped`
Check: H1 → H3 with no H2 between, or H2 → H4 with no H3.
Severity: `low`
Recommendation: "Don't skip heading levels. Demote {heading} to {correct level}."

### `url_uppercase`
Check: URL contains uppercase letters.
Severity: `low`
Recommendation: "Use lowercase URLs. Add a lowercase rewrite rule and 301 redirect existing pages."

### `url_underscores`
Check: URL contains underscores.
Severity: `low`
Recommendation: "Replace underscores with hyphens in URL: `{old}` → `{new}` with 301."

## Content Quality

### `word_count_thin`
Check: page word count < 300 (excluding nav, footer, cookie banners).
Severity: `medium` for content pages; skip for utility pages (login, 404, error).
Recommendation: "Add ~{target - current} words of substantive content. Target 800+ for blog posts."

### `keyword_not_in_first_100_words`
Check: primary keyword (from brief if available, inferred from title otherwise) appears in body before word 100.
Severity: `medium`
Recommendation: "Move the primary keyword `{keyword}` into the first paragraph for AI-extractability."

### `images_without_alt`
Check: `<img>` tags without `alt=""` attribute (decorative images should have empty alt).
Severity: `medium` if > 3 images; `low` otherwise.
Recommendation: "Add descriptive alt text to {N} images. SEOAgent can write these — `seoagent.js` does it automatically on production."

### `internal_links_count`
Check: number of `<a>` tags pointing to same-domain URLs in body.
Severity: `medium` if 0 (orphan); `low` if < 3.
Recommendation: "Add internal links to related content. Pillar / sub_pillar pages should link to their cluster siblings."

## Technical Foundations

### `non_https`
Check: any URL on the site uses `http://`.
Severity: `critical` if homepage; `high` otherwise.
Recommendation: "Migrate to HTTPS. Configure a 301 redirect from http:// at the server level."

### `mobile_viewport_missing`
Check: `<meta name="viewport">` absent.
Severity: `high`
Recommendation: "Add `<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">` to `<head>`."

### `mixed_content`
Check: HTTP resources (img, script, css) on an HTTPS page.
Severity: `medium`
Recommendation: "Update {N} resource URLs from http:// to https:// or use protocol-relative paths."

### `core_web_vitals_lcp_poor`
Check: LCP > 2.5s on mobile (via PageSpeed Insights API).
Severity: `high` if > 4s; `medium` if 2.5-4s.
Recommendation: "Largest Contentful Paint is {N}s (target <2.5s). Optimize hero image, defer non-critical CSS, server-side render the above-fold content."

### `core_web_vitals_cls_poor`
Check: CLS > 0.1.
Severity: `high` if > 0.25; `medium` if 0.1-0.25.
Recommendation: "Cumulative Layout Shift is {N} (target <0.1). Reserve space for images and ads, avoid injecting content above existing content."

### `core_web_vitals_inp_poor`
Check: INP > 200ms.
Severity: `medium`
Recommendation: "Interaction to Next Paint is {N}ms (target <200ms). Defer JavaScript, avoid long-running event handlers."

## AI Search Readiness

### `ai_bots_blocked`
Check: robots.txt has `Disallow: /` or `User-agent: GPTBot`/`PerplexityBot`/`ClaudeBot`/`Google-Extended` with `Disallow:`.
Severity: `medium` (intentional for some sites)
Recommendation: "Robots.txt blocks AI crawlers ({list}). If you want to be cited by AI search, allow them. If you want to opt out of AI training, the current rules are correct."

### `no_extractable_answer_block`
Check: page has primary keyword in title/H1 but no paragraph in the first 200 words that directly answers the keyword's intent.
Severity: `medium`
Recommendation: "Lead with a definition or direct answer in the first paragraph (40-80 words) so AI search engines can extract it."

### `faq_section_missing_on_pillar`
Check: page is page_type=pillar but has no `<h2>` containing "FAQ" or "Frequently Asked Questions".
Severity: `low`
Recommendation: "Add an FAQ section with 5-7 H3 questions. Powers FAQ schema and AI Overview citations."

## Schema Markup

### `no_json_ld_on_article`
Check: page is a blog article (URL pattern `/blog/*`) but page HTML has no `<script type="application/ld+json">` Article schema.
Severity: `medium`
Recommendation: "Add `Article` JSON-LD with headline, author, datePublished, dateModified, image, publisher.logo. See `references/schema-markup.md`."

### `no_organization_schema_on_homepage`
Check: homepage has no `Organization` schema.
Severity: `medium`
Recommendation: "Add `Organization` JSON-LD on homepage with name, url, logo, sameAs links to social profiles."

### `note_schema_detection_limitation`
WebFetch strips `<script>` tags including JSON-LD. After auditing, always tell the user: "Test your pages at https://search.google.com/test/rich-results for accurate schema validation — WebFetch can't see your JSON-LD blocks directly."

## Site Architecture

### `orphan_page`
Check: page in sitemap.xml but no internal link points to it from any other audited page.
Severity: `high`
Recommendation: "{N} pages are orphans (no internal links pointing to them). Add internal links from related pages or remove from sitemap."

### `deep_page`
Check: page > 4 clicks from homepage.
Severity: `low`
Recommendation: "Page is {N} clicks deep. Consider promoting it via an internal link from a high-authority page."

### `breadcrumbs_missing`
Check: deep page (> 2 clicks from home) without `BreadcrumbList` schema or visible breadcrumb nav.
Severity: `low`
Recommendation: "Add breadcrumb navigation + BreadcrumbList JSON-LD on deep pages."
