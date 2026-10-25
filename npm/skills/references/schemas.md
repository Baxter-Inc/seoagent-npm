# File Schemas Reference

Load this when creating or repairing `.seoagent/` workspace files, writing a brief, or setting article frontmatter.

## `.seoagent/project.md`

```markdown
---
domain: example.com
site_type: saas
language: en
initialized_at: 2026-04-27T10:00:00Z
seoagent_version: 0.2.0
image_provider: openai           # optional: openai | fal | replicate | none — auto-detected by `init`/`seoagent env-check` from OPENAI_API_KEY / FAL_KEY / REPLICATE_API_TOKEN
cms: strapi                      # optional: strapi | wordpress | sanity | contentful | ghost | webflow | shopify | payload | directus | mdx-local | none
blog_path: /blog                 # optional: detected from app/blog/, pages/blog/, etc.
public_dir: public               # optional: the dir this project serves as static files — `public` (Next.js/Vite/Astro) or `static` (SvelteKit/Gatsby/Hugo). Auto-detected by `init`; it is where llms.txt and the OKF bundle get PUBLISHED, so a wrong value means none of that work is served.
llms_owner: route                # optional: only value is `route`. Set it when the project serves /llms.txt from its own route (app/llms.txt/route.ts and friends) — SEOAgent never publishes over a route, and this stops `sync` mentioning the skipped publish. Without it, sync says so once each time the generated .seoagent/llms.md changes, so the two can be compared.
---
# SEOAgent Project — example.com
```

`cms`, `blog_path`, `image_provider`, and `public_dir` are detected by `seoagent init` from package.json deps, env files, and the filesystem. Update them manually if detection got it wrong. If a user adds an image-provider key after init, `seoagent env-check` re-detects and records it. The `publishing:` block is documented in `references/publishing.md` § "After the user picks".

## `.seoagent/context.md`

Business context, facts, audience, tone, banned topics, reference URLs. Read on every session.

`# Facts` holds one product fact per line (price, plan, limit, feature, integration), each ending in `— source: <repo file or URL>`: `- Pro plan is $49/month — source: app/pricing/page.tsx`. `seoagent facts` diffs those sources against the commits since the last `seoagent facts --mark` (see `references/session-protocol.md` § Fact check against commits).

## `.seoagent/roadmap.md`

Prioritized action items grouped by Critical / High / Medium, plus the content plan (ordered checkbox list, depth-first by cluster). Updated after every action. Markdown checkboxes for fixed items.

## `.seoagent/changelog.md`

Append-only log. One line per action.

```
[2026-04-27] Audit completed: 8 pages, 18 findings (2 critical, 5 high, 8 medium, 3 low)
[2026-04-27] Strategy discovery: 4 clusters, 21 articles planned
[2026-04-28] Fixed: Homepage `noindex` meta tag
[2026-04-28] Article drafted: tech-seo-guide (3120 words)
```

## `.seoagent/pages.md`, `.seoagent/competitors.md`, `.seoagent/keywords.md`

Persisted research artifacts so each phase compounds. Format: frontmatter with `last_updated_at`, body with markdown tables / sections.

> **`keywords.md` + `pages.md` are machine-parsed — and become cloud-owned.** `keywords.md` uses the strict `## Cluster:` / `**Pillar keyword:** kw1, kw2` format (keyword phrases only — no inline metrics; see `references/keyword-research.md` Step 5). After the first `seoagent keywords` enrichment (and for `pages.md`, after the cloud regenerates it), these files carry `generated: true` and are **read-only projections of cloud state** — edits get overwritten on the next `seoagent pull`. Don't hand-edit a `generated: true` file; use the dashboard, or `seoagent keywords --purge` to clear keyword noise.

## Brief schema — `.seoagent/briefs/{slug}.md`

```markdown
---
slug: tech-seo-guide
cluster: technical-seo
role: PILLAR
title: "The Complete Technical SEO Guide for 2026"
primary_keyword: technical seo guide
secondary_keywords: [technical seo checklist, technical seo audit]
search_intent: informational
word_count_min: 2500
word_count_max: 4000
priority: high
status: ready
created_at: 2026-04-27T10:00:00Z
---

# Brief — The Complete Technical SEO Guide for 2026

## Outline
- **H2: What Is Technical SEO?** — Define clearly in first paragraph.
- **H3: Technical SEO vs On-Page vs Off-Page** — Comparison table format.
- **H2: Technical SEO Checklist** — Numbered list, 12-15 items.

## Internal Links
- → `site-speed-optimization` (anchor: "Core Web Vitals optimization")

## Content Guidelines
- 3+ statistics with sources
- Definition block in first paragraph for AI extractability
- Comparison tables for "vs" content
- 5 FAQs at the end

## Competitor Analysis
Reviewed top 3, average word count 2500. Common sections: what is, checklist, tools. Gaps: no AI search, no schema depth.
```

**End every brief with a `## Writing rules (no AI slop)` section** — copy the "Banned words", "Phrases that delay the point", and "Formatting" rules from `references/writing-rules.md` in compact form (cloud-generated briefs already carry this section; local briefs must match). The brief travels to whoever writes the article, so the rules must travel with it.

## Article frontmatter schema

```yaml
---
slug: tech-seo-guide
page_type: pillar              # role: landing | pillar | sub_pillar | long_tail | programmatic
article_type: guide            # format (optional): guide | listicle | how_to | comparison | faq — drives the cloud pipeline + schema
title: "The Complete Technical SEO Guide for 2026"
meta_title: "Technical SEO Guide: 47-Step Checklist (2026)"
meta_description: "Master technical SEO with our 47-step checklist..."
canonical: "https://example.com/blog/technical-seo-guide"
primary_keyword: technical seo guide
secondary_keywords: [technical seo checklist, technical seo audit]
word_count: 3120
status: drafted
created_at: 2026-04-27T10:00:00Z
brief: tech-seo-guide
# Byline: present only when the site owner added a person author (cloud drafts carry it).
author: "Jane Doe"
author_title: "Founder, Acme"
author_url: "https://www.linkedin.com/in/janedoe"            # the byline link (profile, else website)
author_same_as: ["https://www.linkedin.com/in/janedoe", "https://janedoe.com"]
author_key: "jane-doe"         # optional: how this repo names the author (learned from `content track --author-key`)
images:
  hero:
    alt: "Diagram of the technical SEO audit flow from crawl to indexation"
    prompt: "Flat illustration of a website being crawled, blue/teal palette, isometric"
internal_links:
  - target: site-speed-optimization
    anchor: "Core Web Vitals optimization"
json_ld:
  - "@type": Article
    headline: "The Complete Technical SEO Guide for 2026"
    datePublished: "2026-04-27"
    dateModified: "2026-04-27"
  - "@type": FAQPage
    mainEntity: []
---
```

**Byline fields** (`author`, `author_title`, `author_url`, `author_same_as`, `author_key`): the cloud writes them into a draft only when the site owner set a person author (Site settings → Authors, or the `site.authors.set` chat tool). No `author` means the site has no author or uses the company name: write no author fields. When you place the article, put the byline where the repo's own posts keep theirs and fill the Article JSON-LD's author `Person` from these fields (the AUTHOR RULE in `references/inbox.md`).

## Audit output — `.seoagent/audit/latest.md`

```markdown
---
domain: example.com
audited_at: 2026-04-27T10:00:00Z
pages_audited: 8
critical: 2
high: 5
medium: 8
low: 3
---

# Audit — example.com

## Critical
- [ ] **Homepage `noindex` meta tag** — blocks Google from indexing the home page entirely. (Confirmed)
  - URL: https://example.com
  - Evidence: evidence.md § https://example.com — server HTML contains `<meta name="robots" content="noindex">`
  - Recommendation: Remove the `noindex` directive — likely in `app/layout.tsx`.

## High
- [ ] Homepage title is 72 chars (target 50-60). Move primary keyword to start. (Confirmed)
  - Evidence: evidence.md § https://example.com — title: "…"

## Medium
- [ ] **2 blog URLs return HTTP 404** — internal links point at deleted posts. (Confirmed)
  - URLs: https://example.com/blog/old-post, https://example.com/blog/older-post
  - Linked from: /guides/seo-basics, /blog/launch
  - Evidence: evidence.md § Pages NOT captured
  - Recommendation: Repoint the links to live posts, or 301 each slug to the nearest live article.

## What's Working
- HTTPS site-wide with HSTS
- Mobile viewport on every page
```

A finding about several pages lists **every one** under `- URLs:` (absolute URLs or site-root paths, comma-separated; wrapping is fine), and the pages that link to them under `- Linked from:` when you know them. The cloud copies both lists into the inbox action, so whoever fixes it does not search for them again. One page → `- URL:`.

Findings use markdown checkboxes (`- [ ]` open, `- [x]` fixed). When the user says "I fixed X": flip the checkbox with `Edit`, append `[date] Fixed: {finding}` to `changelog.md`, run `seoagent sync`.

## Authentication

The CLI manages credentials at `~/.config/seoagent/auth.json` — outside the project tree. Never write tokens into `.seoagent/`. Tell the user to run `seoagent login` if they want sync.
