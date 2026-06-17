<p align="center">
  <a href="https://seoagent.com?ref=npm-readme-hero">
    <img src="https://unpkg.com/@seoagent-official/seoagent/assets/hero.svg" alt="SEOAgent — the persistent AI SEO agent for Claude Code" width="900" />
  </a>
</p>

<h1 align="center">SEOAgent</h1>

<p align="center">
  <strong>The persistent AI SEO agent for <a href="https://www.anthropic.com/claude-code">Claude Code</a>.</strong><br/>
  Other SEO tools write the prompt — SEOAgent runs it.<br/>
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

### What about "agentic SEO" tools that hand you a prompt?

A new wave of SEO tools — Hado SEO's *"SEO Trace"*, and others in the same shape — diagnose your page (GSC + SERP + Googlebot render) and emit a paste-ready prompt you drop into Lovable, Cursor, Bolt, or Claude Code yourself. That's better than nothing, but the *work* lives on you: every action becomes "copy the prompt, switch tools, paste, wait, switch back, verify."

SEOAgent runs as a CLI on top of the [Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk-typescript). `seoagent process` pulls the inbox of pending actions, picks the ones you select, and runs each one end-to-end in your repo — the agent reads the action file, edits the files, verifies the result, and closes the action server-side. No copy-paste step.

> **Other tools write the prompt. SEOAgent runs it.**

## What You Get (Free, No Account)

**Technical SEO Audit** — Claude fetches your pages and runs a structured audit: meta tags, headings, internal links, Core Web Vitals, schema readiness, AI search optimization. Findings saved with severity tags to `.seoagent/audit/latest.md` as markdown checkboxes you can flip when fixed.

**Hub-and-Spoke Keyword Strategy** — Claude researches your niche with `web_search`, builds clusters with `PILLAR | SUB_PILLAR | LONG_TAIL` roles, internal links funneling authority UP to pillars. Strategy saved to `.seoagent/strategy/clusters/`.

**Page-Type-Aware Content Briefs** — Detailed briefs that follow the right protocol for landing pages, pillar articles, sub-pillars, long-tails, or programmatic pages. Each gets its own URL pattern, section structure, JSON-LD schema, and word count target. Saved to `.seoagent/briefs/`.

**SEO-Optimized Articles** — Articles written from briefs with full SEO frontmatter: meta_title, meta_description, canonical, OpenGraph, Twitter cards, JSON-LD (Article + FAQPage + HowTo as appropriate), image plans. Saved to `.seoagent/content/`.

**Image Generation (Bring Your Own Key)** — Detect `OPENAI_API_KEY`, `FAL_KEY`, or `REPLICATE_API_TOKEN` from your env. Generate hero + inline images with `npx @seoagent-official/seoagent generate-image`. You pay the LLM provider directly.

**Open Knowledge Format bundle (AEO/GEO)** — Generate a Google [Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf) bundle for your site — a curated, agent-readable knowledge layer so ChatGPT, Claude, Perplexity, and Google's AI understand and cite your business accurately. Claude maps your `.seoagent/` knowledge into OKF markdown; `npx @seoagent-official/seoagent okf scaffold` and `okf validate` handle the structure. Saved to `.seoagent/okf/`.

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
  okf/                        # Open Knowledge Format bundle for AI agents (AEO/GEO)
    index.md                  # type: Organization — business overview
    concepts/                 # type: Concept|Topic — definitive explanations
    faqs/                     # type: FAQ — answer-engine Q&A
    articles/                 # type: Article — published pages (resource = live URL)
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
    open-knowledge-format.md  # OKF bundle protocol (AEO/GEO)
    keyword-research.md       # WebSearch query patterns
    rewrite-protocol.md       # Phase 4b refresh procedure
    audit-checks.md           # Full audit check list with severity tiers
```

## The Autopilot Loop

`seoagent process` is the executive function over the rest of the CLI. It's how SEOAgent runs work end-to-end without you driving every step manually:

```
┌──────────────────────┐       ┌──────────────────────┐       ┌──────────────────────┐       ┌──────────────────────┐
│  Cloud autopilot     │       │  CLI inbox           │       │  Claude Agent SDK    │       │  Cloud dashboard     │
│  (seoagent.com)      │   →   │  .seoagent/inbox/    │   →   │  seoagent process    │   →   │  Action closed       │
│  detects + queues    │       │  (sync pulls down)   │       │  edits files,        │       │  with applied OR     │
│  technical fixes,    │       │  Read with           │       │  decides apply       │       │  declined + reason   │
│  content gaps,       │       │  seoagent inbox      │       │  vs decline,         │       │  (seoagent ack       │
│  off-strategy KWs…   │       │                      │       │  emits verdict       │       │  fires automatically)│
└──────────────────────┘       └──────────────────────┘       └──────────────────────┘       └──────────────────────┘
```

What that looks like in your terminal:

```bash
$ seoagent sync                  # Pull pending actions from your dashboard
✓ Pulled 3 pending actions → .seoagent/inbox/

$ seoagent inbox                 # See what's queued
SEOAgent inbox · 3 pending actions
▸ id 2017 · canonical · high · p:high · ⇧ +12% CTR · ⏱ 2 min — Auth pages in sitemap.xml
▸ id 2018 · meta · medium · p:medium · ⇧ +4 positions · ⏱ 5 min — Generic meta description on /pricing
▸ id 2176 · new-landing-page · medium — New page for keyword "3/0"

$ seoagent process               # Pick what to run; agent does the rest
[1/2] · id 2017 · canonical · high
⏺ Read(apps/web/src/app/sitemap.ts)
   ⎿ Read 47 lines
⏺ Edit(apps/web/src/app/sitemap.ts)
   ⎿ Updated apps/web/src/app/sitemap.ts
✓ id 2017 — applied in 47s
  Removed 3 auth routes from sitemap.xml

[2/2] · id 2018 · meta · medium
…
⊘ id 2176 — declined: keyword "3/0" is off-strategy for our domain

Done · ✓ 2/3 applied · 1 declined  (elapsed: 2m 14s)
```

Three things to notice:

1. **No copy-paste step.** Other "agentic SEO" tools (Hado SEO's *SEO Trace*, etc.) emit paste-ready prompts you shuttle into Lovable/Cursor/Bolt yourself. `seoagent process` runs the action end-to-end via the [Claude Agent SDK](https://github.com/anthropics/claude-agent-sdk-typescript) — agent reads the action, edits the files, verifies, closes the action server-side. No copy-paste.
2. **Priority badges** (`p:high · ⇧ +12% CTR · ⏱ 2 min`) tell you *which* actions to run first. The picker pre-selects high-priority entries by default — one Enter ships the highest-leverage work.
3. **Declines self-ack.** When the agent decides an action is off-strategy, ambiguous, or a false positive, it emits `__DECLINED__: <reason>` and `seoagent ack --failed --reason "…"` fires automatically. You never type the reason by hand.

## CLI Commands (all 19)

Grouped by what they're for. Run via `npx -y @seoagent-official/seoagent <cmd>` or, after `npm install -g @seoagent-official/seoagent`, just `seoagent <cmd>`.

**Setup + lifecycle**

| Command | What it does |
|---|---|
| `init` | Scaffold `.seoagent/` + install the SKILL bundle + write the sync hook. Run once per repo. Auto-detects domain + site type; supports `--yes --domain <d> --site-type <t>` for CI. |
| `login` | Connect this CLI to seoagent.com (browser OAuth flow). Free dashboard access; required for `sync` / `process` / `ack` / paid features. |
| `logout` | Clear stored credentials. |
| `uninstall` | Remove `.seoagent/`, the skill, and the sync hook. `--global` also wipes the login session and cache. |

**The autopilot loop**

| Command | What it does |
|---|---|
| `sync` | Two-way sync with the dashboard: pushes local `.seoagent/` artifacts up + pulls new pending actions down to `.seoagent/inbox/`. Push-only via `--push-only`. Pull-only via `seoagent pull`. Also flushes any offline-queued acks. |
| `pull` | Pull-only sync (no push). Useful when you want fresh inbox state without uploading edits. Also supports `--print <path>` to dump a single cloud artifact to stdout. |
| `inbox` | List pending actions with id, category, severity, and (when the server emits them) priority + impact + effort badges. `--json` for scripting. |
| `process` | The executive function: pick pending actions + run them end-to-end via the Claude Agent SDK. Streams Claude-Code-style narration (tool bullets, result previews, markdown). `--yes` for CI; `--model <name>` to override. |
| `ack [<id>]` | Mark an action settled server-side. With no id, opens an interactive picker. `--failed --reason "<text>"` to decline. Survives network blips via the offline ack queue. |
| `autopilot <on\|off\|status>` | Toggle the cloud-side autopilot mode (whether the dashboard actively queues actions). |

**Inspection + diagnostics**

| Command | What it does |
|---|---|
| `status` | Boxed summary of project state: account, audit, strategy, briefs, content, roadmap. Zero-network. |
| `whoami` | Show the currently logged-in account. |
| `env-check` | Detect image generation provider (`OPENAI_API_KEY` / `FAL_KEY` / `REPLICATE_API_TOKEN`). |
| `menu` | Interactive launcher — pick a command from a list when you don't remember the name. |

**Research + content**

| Command | What it does |
|---|---|
| `keywords --peek "<kw>"` | Free single-keyword DataForSEO peek (no login, daily quota per install). |
| `keywords` | Enrich your existing keyword inventory with real search volume + difficulty. `--discover` finds new targets; `--competitors` shows the gap (paid). |
| `internal-links` | Generate internal-linking recommendations from your existing pages + topic clusters. |
| `okf [scaffold\|validate]` | Generate an [Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf) bundle for AI agents (AEO/GEO) → `.seoagent/okf/`. `scaffold` starts it; `validate` checks `type` fields, ISO-8601 timestamps + cross-links. The skill fills the content. |
| `generate-image` | Generate hero / inline images via the detected provider (BYO API key). |

**Account**

| Command | What it does |
|---|---|
| `upgrade` | Open the seoagent.com pricing page. |

## Auto-Sync Hook

`init` writes a `PostToolUse` hook to `.claude/settings.json` so every Write/Edit to `.seoagent/` triggers `npx @seoagent-official/seoagent sync --silent` automatically. No-op when not logged in. The hook is race-safe: a cooperative lock keeps a manual `seoagent sync` from clobbering an in-flight hook run (and vice versa).

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
