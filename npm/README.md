<p align="center">
  <a href="https://seoagent.com?ref=npm-readme-hero">
    <img src="https://unpkg.com/@seoagent-official/seoagent/assets/hero.svg" alt="SEOAgent — the persistent AI SEO agent for Claude Code" width="900" />
  </a>
</p>

<h1 align="center">SEOAgent</h1>

<p align="center">
  <strong>The persistent AI SEO agent for <a href="https://www.anthropic.com/claude-code">Claude Code</a>.</strong><br/>
  Audits • Keyword strategy • Content briefs • Optimized articles — all persisted in <code>.seoagent/</code>.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@seoagent-official/seoagent"><img alt="npm version" src="https://img.shields.io/npm/v/@seoagent-official/seoagent?color=cb3837&label=npm&logo=npm&logoColor=white"></a>
  <a href="https://www.npmjs.com/package/@seoagent-official/seoagent"><img alt="downloads" src="https://img.shields.io/npm/dm/@seoagent-official/seoagent?color=22c55e&label=downloads"></a>
  <a href="https://github.com/Baxter-Inc/seoagent-npm/actions"><img alt="CI" src="https://img.shields.io/github/actions/workflow/status/Baxter-Inc/seoagent-npm/publish-npm.yml?branch=main&label=CI&logo=github"></a>
  <a href="https://github.com/Baxter-Inc/seoagent-npm/blob/main/LICENSE"><img alt="license MIT" src="https://img.shields.io/npm/l/@seoagent-official/seoagent?color=3b82f6&label=license"></a>
  <a href="https://seoagent.com?ref=npm-readme-badge"><img alt="SEOAgent Cloud" src="https://img.shields.io/badge/cloud-seoagent.com-7c3aed?logo=cloudflare&logoColor=white"></a>
</p>

<p align="center">
  <img alt="Claude Code" src="https://img.shields.io/badge/CLAUDE%20CODE-5b54f4?style=flat-square&logo=anthropic&logoColor=white">
  <img alt="TypeScript" src="https://img.shields.io/badge/TYPESCRIPT-3178c6?style=flat-square&logo=typescript&logoColor=white">
  <img alt="Node 18+" src="https://img.shields.io/badge/NODE%20%E2%89%A5%2018-339933?style=flat-square&logo=node.js&logoColor=white">
  <img alt="SEO Autopilot" src="https://img.shields.io/badge/SEO-AUTOPILOT-f97316?style=flat-square">
  <img alt="Images via OpenAI · fal.ai · Replicate" src="https://img.shields.io/badge/IMAGES-OpenAI%20%C2%B7%20fal.ai%20%C2%B7%20Replicate-ec4899?style=flat-square">
</p>

<p align="center">
  Built and maintained by <a href="https://seoagent.com?ref=npm-readme-builtby"><strong>SEOAgent.com</strong></a> ·
  <a href="https://seoagent.com/pricing?ref=npm-readme">Cloud pricing</a> ·
  <a href="https://seoagent.com?ref=npm-readme-docs">Docs &amp; dashboard</a>
</p>

---

> **This package is a one-shot scaffolder, not a runtime dependency.** Run `init` once to scaffold `.seoagent/` + the Claude Code skill in your repo. Nothing to keep in `package.json` afterwards. No `postinstall` script — installs are silent and play nicely with npm 11+.

## Install

```bash
npx -y @seoagent-official/seoagent init
```

The scaffolder will:
- Scan your repo for `package.json` `homepage` field + common `.env` files (`NEXT_PUBLIC_SITE_URL`, `SITE_URL`, etc.) to infer your domain
- Create `.seoagent/` with `project.md`, `context.md`, and folders for audits, briefs, content
- Install the skill at `.claude/skills/seoagent/SKILL.md` so Claude Code picks it up
- Add a `PostToolUse` hook to `.claude/settings.json` so edits to `.seoagent/` auto-sync to the cloud (when you're logged in)

The scaffolded sync hook uses `npx -y @seoagent-official/seoagent sync --silent` so the package is fetched on demand from then on — no `package.json` entry needed.

Then open Claude Code in this repo and say *"audit my site."* The skill takes it from there.

<!-- Claude Code marketplace install is wired (the mirror serves the plugin
     tree) but intentionally NOT documented here yet — holding promotion
     until the plugin-install → init flow is validated end-to-end. Restore
     the marketplace install section once that's confirmed. -->

### Headless / non-interactive

```bash
npx -y @seoagent-official/seoagent init --yes --domain example.com
```

### Optional: install globally for a bare `seoagent` command

```bash
npm install -g @seoagent-official/seoagent
seoagent init   # in your project repo
```

## Why SEOAgent?

If you use [marketingskills](https://github.com/coreyhaines31/marketingskills) for SEO, you know the pain: every session starts from scratch. Your audit findings vanish. Your content strategy disappears. Claude forgets everything between conversations.

SEOAgent fixes this with one unified skill that persists all work:

|                | marketingskills                                | SEOAgent                                                        |
| -------------- | ---------------------------------------------- | --------------------------------------------------------------- |
| **State**      | Stateless — every session starts over          | Persistent `.seoagent/` directory across sessions               |
| **Workflow**   | 6 separate skills, no shared context           | 1 unified workflow: audit → strategize → plan → write → monitor |
| **Output**     | Unstructured chat text                         | Structured markdown + frontmatter, machine-readable             |
| **Execution**  | Advisory — Claude audits differently each time | Protocols — consistent, comparable results                      |
| **Continuity** | None                                           | Roadmap compounds over time, changelog tracks progress          |
| **Page types** | Generic                                        | Dedicated protocols for landing / pillar / sub_pillar / long_tail / programmatic |

## What You Get (Free, No Account)

**Technical SEO Audit** — Claude fetches your pages and runs a structured audit: meta tags, headings, internal links, Core Web Vitals, schema readiness, AI search optimization. Findings saved with severity tags to `.seoagent/audit/latest.md` as markdown checkboxes you can flip when fixed.

**Hub-and-Spoke Keyword Strategy** — Claude researches your niche with `web_search`, builds clusters with `PILLAR | SUB_PILLAR | LONG_TAIL` roles, internal links funneling authority UP to pillars. Strategy saved to `.seoagent/strategy/clusters/`.

**Page-Type-Aware Content Briefs** — Detailed briefs that follow the right protocol for landing pages, pillar articles, sub-pillars, long-tails, or programmatic pages. Each gets its own URL pattern, section structure, JSON-LD schema, and word count target. Saved to `.seoagent/briefs/`.

**SEO-Optimized Articles** — Articles written from briefs with full SEO frontmatter: meta_title, meta_description, canonical, OpenGraph, Twitter cards, JSON-LD (Article + FAQPage + HowTo as appropriate), image plans. Saved to `.seoagent/content/`.

**Image Generation (Bring Your Own Key)** — Detect `OPENAI_API_KEY`, `FAL_KEY`, or `REPLICATE_API_TOKEN` from your env. Generate hero + inline images with `npx @seoagent-official/seoagent generate-image`. You pay the LLM provider directly.

**Compounding Roadmap** — Prioritized action plan that updates after every action. Saved to `.seoagent/roadmap.md`. Persistent changelog at `.seoagent/changelog.md`.

## Project Structure

```
.seoagent/
  project.md                  # Domain, site type, image_provider
  context.md                  # Business context, tone, banned topics
  audit/
    latest.md                 # Most recent audit, findings as [ ] / [x] checkboxes
  strategy/
    discovery.md              # Top opportunities + competitor gaps
    clusters/
      {cluster-slug}.md       # Article table + hub-and-spoke link graph
  briefs/
    {article-slug}.md         # Brief with role, outline, internal links, guidelines
  content/
    {article-slug}.md         # Article with full SEO frontmatter + JSON-LD
    images/                   # Generated hero + inline images
  pages.md                    # Sitemap inventory (URL list)
  competitors.md              # Competitor profiles + gaps
  keywords.md                 # Master keyword inventory (assigned + backlog)
  roadmap.md                  # Prioritized next steps
  changelog.md                # History of all SEO work

.claude/skills/seoagent/
  SKILL.md                    # Orchestration layer (459 lines)
  references/
    landing-pages.md          # Landing page protocol + JSON-LD
    pillar-articles.md        # Pillar article protocol
    sub-pillar-articles.md    # Sub-pillar protocol
    long-tail-articles.md     # Long-tail protocol
    programmatic.md           # 12 programmatic SEO playbooks
    schema-markup.md          # JSON-LD library by entity type
    keyword-research.md       # WebSearch query patterns
    rewrite-protocol.md       # Phase 4b refresh procedure
    audit-checks.md           # Full audit check list with severity tiers
```

## CLI Commands

Run via `npx` (works after a local install or as a one-shot fetch):

```bash
npx @seoagent-official/seoagent init                    # Create .seoagent/ project + install skill
npx @seoagent-official/seoagent keywords --peek "<kw>"  # Free single-keyword DataForSEO peek (no login, daily quota)
npx @seoagent-official/seoagent uninstall         # Remove .seoagent/, the skill, and the sync hook (--global also wipes login)
npx @seoagent-official/seoagent status            # Show project state summary
npx @seoagent-official/seoagent login             # Connect this CLI to seoagent.com (browser flow)
npx @seoagent-official/seoagent logout            # Remove stored credentials
npx @seoagent-official/seoagent sync              # Push artifacts to dashboard (no-op when not logged in)
npx @seoagent-official/seoagent env-check         # Detect image generation provider (OPENAI/FAL/REPLICATE)
npx @seoagent-official/seoagent generate-image    # Generate an image via your provider
npx @seoagent-official/seoagent upgrade           # Open SEOAgent Cloud pricing page
```

> Prefer the shorter `seoagent <cmd>` form? Install globally once:
> `npm install -g @seoagent-official/seoagent`. After that, bare `seoagent <cmd>` works in any directory.

## Auto-Sync Hook

`init` writes a `PostToolUse` hook to `.claude/settings.json` so every Write/Edit to `.seoagent/` triggers `npx @seoagent-official/seoagent sync` automatically. No-op when not logged in. Merges into existing settings without clobbering them.

## SEOAgent Cloud

The free skill handles audits, strategy, briefs, articles, and persistent state using Claude's native capabilities. For teams and production SEO, [SEOAgent Cloud](https://seoagent.com/pricing?ref=readme) adds:

- **Real keyword data (DataForSEO)** — Actual search volumes, difficulty scores, and opportunity classification (easy-win / striking-distance / competitor-gap). Free login enriches your top ~25 keywords (`keywords`); paid lifts the cap and unlocks discovery of new targets (`--discover`) and competitor-gap analysis (`--competitors`).
- **Deep crawling** — Firecrawl-powered JS rendering (finds issues in SPAs)
- **AI-generated images + autopilot** — Hero + inline images created and uploaded to your CMS automatically
- **GSC integration** — Real clicks, impressions, CTR, position tracking
- **CMS publishing** — WordPress, Ghost, Webflow, Shopify, Strapi
- **Team collaboration** — Invite members, share strategy, coordinate publishing
- **Cloud dashboard** — See everything Claude Code did at seoagent.com (also free with any account)

Run `npx @seoagent-official/seoagent login` for the free dashboard, or `npx @seoagent-official/seoagent upgrade` for paid features.

## Pattern Note

Most Claude skills are markdown-only or marketplace plugins. SEOAgent uses **npm + `init`** so setup is versioned and repo-aware. The result is still a project-local skill Claude loads like any other — with the addition of:

- A persistent `.seoagent/` workspace for cross-session state
- A reference library Claude pulls from on demand (page-type protocols, JSON-LD library, etc.)
- A `PostToolUse` hook for transparent cloud sync
- Image-generation adapters for OpenAI / fal.ai / Replicate

## License

MIT
