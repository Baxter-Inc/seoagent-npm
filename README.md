<p align="center">
  <a href="https://seoagent.com?ref=npm-readme-hero">
    <img src="https://unpkg.com/@seoagent-official/seoagent/assets/hero.svg" alt="SEOAgent — the persistent AI SEO agent for Claude Code" width="900" />
  </a>
</p>

<h1 align="center">SEOAgent</h1>

<p align="center">
  <strong>The persistent AI SEO agent for <a href="https://www.anthropic.com/claude-code">Claude Code</a>.</strong><br/>
  Other SEO tools write the prompt — SEOAgent runs it, on your own model, in your own repo.<br/>
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
  <img alt="Product screenshots from your repo" src="https://img.shields.io/badge/PRODUCT-SCREENSHOTS-0ea5e9?style=flat-square">
</p>

<p align="center">
  <a href="https://seoagent.com/join-slack?c=seoagent">
    <img alt="Join the SEOAgent Slack community" height="52" src="https://img.shields.io/badge/Join%20our%20Slack%20Community-4A154B?style=for-the-badge&logoColor=white&labelColor=4A154B&color=4A154B&logo=data%3Aimage%2Fsvg%2Bxml%3Bbase64%2CPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjIuOCAxMjIuOCI%2BPHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI1LjggNzcuNmMwIDcuMS01LjggMTIuOS0xMi45IDEyLjlTMCA4NC43IDAgNzcuNnM1LjgtMTIuOSAxMi45LTEyLjloMTIuOXptNi41IDBjMC03LjEgNS44LTEyLjkgMTIuOS0xMi45czEyLjkgNS44IDEyLjkgMTIuOXYzMi4zYzAgNy4xLTUuOCAxMi45LTEyLjkgMTIuOXMtMTIuOS01LjgtMTIuOS0xMi45eiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik00NS4yIDI1LjhjLTcuMSAwLTEyLjktNS44LTEyLjktMTIuOVMzOC4xIDAgNDUuMiAwczEyLjkgNS44IDEyLjkgMTIuOXYxMi45em0wIDYuNWM3LjEgMCAxMi45IDUuOCAxMi45IDEyLjlzLTUuOCAxMi45LTEyLjkgMTIuOUgxMi45QzUuOCA1OC4xIDAgNTIuMyAwIDQ1LjJzNS44LTEyLjkgMTIuOS0xMi45eiIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik05NyA0NS4yYzAtNy4xIDUuOC0xMi45IDEyLjktMTIuOXMxMi45IDUuOCAxMi45IDEyLjktNS44IDEyLjktMTIuOSAxMi45SDk3em0tNi41IDBjMCA3LjEtNS44IDEyLjktMTIuOSAxMi45cy0xMi45LTUuOC0xMi45LTEyLjlWMTIuOUM2NC43IDUuOCA3MC41IDAgNzcuNiAwczEyLjkgNS44IDEyLjkgMTIuOXoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNzcuNiA5N2M3LjEgMCAxMi45IDUuOCAxMi45IDEyLjlzLTUuOCAxMi45LTEyLjkgMTIuOS0xMi45LTUuOC0xMi45LTEyLjlWOTd6bTAtNi41Yy03LjEgMC0xMi45LTUuOC0xMi45LTEyLjlzNS44LTEyLjkgMTIuOS0xMi45aDMyLjNjNy4xIDAgMTIuOSA1LjggMTIuOSAxMi45cy01LjggMTIuOS0xMi45IDEyLjl6Ii8%2BPC9zdmc%2B">
  </a>
</p>

<p align="center">
  Built and maintained by <a href="https://seoagent.com?ref=npm-readme-builtby"><strong>SEOAgent.com</strong></a> ·
  <a href="https://seoagent.com/pricing?ref=npm-readme">Cloud pricing</a> ·
  <a href="https://seoagent.com?ref=npm-readme-docs">Docs &amp; dashboard</a>
</p>

---

> **This package is a one-shot scaffolder, not a runtime dependency.** Run `init` once to scaffold `.seoagent/` + the Claude Code skill in your repo. Nothing to keep in `package.json` afterwards. No `postinstall` script — installs are silent and play nicely with npm 11+.
>
> **Upgrading is hands-off.** When a newer CLI is published, the next time you open Claude Code, the session-start hook surfaces a notice and Claude can offer to run `seoagent update-cli` — which updates the binary **and** refreshes every project on your machine to it in one go. Prefer to do nothing? Each project also self-updates on its own the next time you open it (the `SessionStart` hook runs `seoagent sync` before the skill loads). Refreshes rewrite the skill files and re-scan your codebase for newly-added pages (merged into `.seoagent/pages.md` without touching your edits); nothing else in `.seoagent/` is changed. (No more `rm -rf .seoagent && seoagent init`.) Run `seoagent refresh --all` anytime to sweep every project yourself — that's also the way to re-discover pages you've added since setup.

## Install — pick one

You can run SEOAgent two ways. Pick whichever fits how you work; both end up scaffolding the same `.seoagent/` workspace and installing the same Claude Code skill.

### Option A — Global install (recommended for daily use)

```bash
npm install -g @seoagent-official/seoagent
seoagent init
```

**Why this way:** `seoagent` is on your PATH so every command is `seoagent <cmd>` — short to type, instant to run (no npm fetch per call). Claude Code can also call `seoagent <cmd>` directly via its Bash tool, so the skill runs at full speed with no per-call latency.

### Option B — One-shot via `npx` (no global install)

```bash
npx -y @seoagent-official/seoagent@latest init
```

**Why this way:** nothing global on your machine, every invocation pulls the latest published version. Great for CI / one-off use / trying SEOAgent before committing. Trade-off: every command pays a ~2s npm fetch on cold cache, and Claude Code's Bash calls do the same.

---

Either way, `init` will:

- Scan your repo for `package.json` `homepage` field + common `.env` files (`NEXT_PUBLIC_SITE_URL`, `SITE_URL`, etc.) to infer your domain
- Create `.seoagent/` with `project.md`, `context.md`, and folders for audits, briefs, content
- Install the skill at `.claude/skills/seoagent/SKILL.md` so Claude Code picks it up
- Add a `PostToolUse` hook to `.claude/settings.json` so edits to `.seoagent/` auto-sync to the cloud (when you're logged in)

The scaffolded sync hook uses `npx -y @seoagent-official/seoagent@latest sync --silent` either way — it's infrastructure that survives your environment changing (so it works even if you later uninstall the global package), and the `@latest` pin keeps it from getting stuck on a stale npx-cached version.

Then open Claude Code in this repo and say *"audit my site."* The skill takes it from there.

### Option C — Plugin marketplace (Claude Code or Codex)

Prefer to discover and install from inside your agent? SEOAgent ships a plugin marketplace. The plugin is a thin **bootstrap**: installing it adds a `seoagent-cli-setup` skill that walks the agent through the one-time npm `init` above — which lands the full skill bundle + `.seoagent/` workspace. So you still end up in the same place as Options A/B; this is just a discovery path.

**Claude Code:**

```text
/plugin marketplace add Baxter-Inc/seoagent-npm
/plugin install seoagent-cli-bootstrap@seoagent-official
```

**Codex** (requires a Codex version with plugin support):

```bash
codex plugin marketplace add Baxter-Inc/seoagent-npm
# then open the plugins list and install SEOAgent:
codex /plugins
```

Then tell the agent *"set up SEOAgent"* — it runs `init`, installing the skill to `.claude/skills/seoagent/` (Claude Code) or `.agents/skills/seoagent/` (Codex / Cursor), symlinking the other location so both agents discover it.

<!-- `npx skills add Baxter-Inc/seoagent-npm` is also wired (build.ts step 6b
     emits skills/seoagent/SKILL.md at the mirror root for the Vercel `npx skills`
     resolver + skills.sh discovery). Same hold: not promoted here until the
     skills-add → init funnel is validated end-to-end. See MIRROR_REPO.md. -->

### Headless / non-interactive

Global install:

```bash
seoagent init --yes --domain example.com
```

Via npx:

```bash
npx -y @seoagent-official/seoagent@latest init --yes --domain example.com
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

### What about the all-in-one platforms that now ship an MCP?

A second wave — Frase, with Surfer and Ahrefs heading the same way — wraps a full pipeline (research → write → optimize → publish → monitor → auto-fix) behind an MCP or API you connect to your coding agent. Genuinely capable. But three things are baked into that model that SEOAgent does differently:

- **Bring your own model.** Those platforms run their *own* closed model and crawler — that's what the subscription buys (roughly $29–$1,500/mo across this category). SEOAgent runs on the model you already pay for inside Claude Code / Cursor / Codex. No second AI subscription, no per-credit content metering, no proprietary-crawler markup.
- **Your repo, not their CMS.** They publish to a *hosted CMS* (WordPress, Webflow, their own). SEOAgent edits the actual files in your repo, approval-gated — the right shape for a site you build in code (Next.js, SSR, Lovable, Framer-export, etc.) and keep in your own git history.
- **Free and open.** The Skill is free forever and the package is open source. The cloud is optional, per-site, and additive — not the thing that makes the agent work.

Same agent-native convenience. None of the lock-in.

## What You Get (Free, No Account)

**Technical SEO Audit** — Claude fetches your pages and runs a structured audit: meta tags, headings, internal links, Core Web Vitals, schema readiness, AI search optimization. Findings saved with severity tags to `.seoagent/audit/latest.md` as markdown checkboxes you can flip when fixed.

**Hub-and-Spoke Keyword Strategy** — Claude researches your niche with `web_search`, builds clusters with `PILLAR | SUB_PILLAR | LONG_TAIL` roles, internal links funneling authority UP to pillars. Strategy saved to `.seoagent/strategy/clusters/`.

**Page-Type-Aware Content Briefs** — Detailed briefs that follow the right protocol for landing pages, pillar articles, sub-pillars, long-tails, or programmatic pages. Each gets its own URL pattern, section structure, JSON-LD schema, and word count target. Saved to `.seoagent/briefs/`.

**SEO-Optimized Articles** — Articles written from briefs with full SEO frontmatter: meta_title, meta_description, canonical, OpenGraph, Twitter cards, JSON-LD (Article + FAQPage + HowTo as appropriate), image plans. Saved to `.seoagent/content/`.

**Image Generation (Bring Your Own Key)** — Detect `OPENAI_API_KEY`, `FAL_KEY`, or `REPLICATE_API_TOKEN` from your env. Generate hero + inline images with `seoagent generate-image`. You pay the LLM provider directly.

**Real Product Screenshots (SaaS)** — For SaaS/product sites, Claude captures **real screenshots of your product straight from your repo's own UI** and places them in landing-page heroes, feature sections, and how-to steps — the highest-converting visual on a SaaS page, and one no other SEO tool gives you. No Playwright dependency, no paid screenshot API, no stock photos: it renders your product locally and shoots the actual screens. It evaluates where a screenshot would help and is missing, fills the gap, and falls back to an AI image only when a real shot isn't possible. Cloud-suggested SaaS pages carry the instruction too, so a page SEOAgent queues gets the same screenshots when you run it in your repo.

**Open Knowledge Format bundle (AEO/GEO)** — Generate a Google [Open Knowledge Format](https://github.com/GoogleCloudPlatform/knowledge-catalog/tree/main/okf) bundle for your site — a curated, agent-readable knowledge layer so ChatGPT, Claude, Perplexity, and Google's AI understand and cite your business accurately. Claude maps your `.seoagent/` knowledge into OKF markdown; `seoagent okf scaffold` and `seoagent okf validate` handle the structure. Saved to `.seoagent/okf/`.

**AI Citation Tracker (the measurement half of AEO)** — Publishing an OKF bundle makes you *citable*; `seoagent citations` tells you whether it's *working*. It runs a set of buyer-intent questions through the Claude Agent SDK **with live web search** and reports which ones surface your business — a web-grounded proxy for how ChatGPT, Perplexity, and Google's AI Overviews answer. It's a real tracker, not a one-shot read: every run is saved to `.seoagent/citations/history/` and the scorecard shows the **trend** vs your last run, the **URL each engine cited** (yours when you win, the page that beat you when you don't), and — with `--competitors "Frase,Otterly"` — a **share-of-voice** table ranking you against them. Saved to `.seoagent/citations/scorecard.md`. The paid trackers (Frase, Otterly, Profound) gate exactly this behind $50–500/mo; we do it free on your own model. (Honest by design: it measures Claude + web search, not a per-engine guarantee.)

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
  citations/                  # AI citation scorecards (measure the OKF/AEO loop)
    scorecard.md              # Which buyer-intent queries surface you, web-grounded
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
    screenshots.md            # Capture real product screenshots from your repo (SaaS)
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

## CLI Commands (all 22)

Grouped by what they're for. Run as bare `seoagent <cmd>` after the one-time `npm install -g @seoagent-official/seoagent`. (Or `npx -y @seoagent-official/seoagent@latest <cmd>` for a one-shot CI invocation.)

**Setup + lifecycle**

| Command | What it does |
|---|---|
| `init` | Scaffold `.seoagent/` + install the SKILL bundle + write the sync hook. Run once per repo. Auto-detects domain + site type; supports `--yes --domain <d> --site-type <t>` for CI. **Re-running later refreshes the skill in place** (non-destructive — never touches `.seoagent/`), handy to force the skill up to your current CLI version. |
| `login` | Connect this CLI to seoagent.com (browser OAuth flow). Free dashboard access; required for `sync` / `process` / `ack` / paid features. **You can be logged into multiple sites at once** — run `login` again from a different project and it adds that site rather than replacing the first; each project auto-selects its own via `.seoagent/project.md`'s domain. |
| `logout` | Clear stored credentials for the current project's site. `--all` clears every site this machine is logged into. |
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
| `citations` | Track whether answer engines cite you (AEO/GEO). Runs buyer-intent queries through the Claude Agent SDK **with live web search** → `.seoagent/citations/scorecard.md`, with run **history** (`.seoagent/citations/history/`), trend vs last run, source-attribution, and competitor **share-of-voice**. `--queries <1-12>` (default 6), `--competitors <a,b,c>`, `--model <name>`, `--json`. Uses your `claude login` session or `ANTHROPIC_API_KEY`, same as `process`. |
| `generate-image` | Generate hero / inline images via the detected provider (BYO API key). |

**Account + maintenance**

| Command | What it does |
|---|---|
| `upgrade` | Open the seoagent.com pricing page. |
| `update-cli` | Update the CLI to the latest npm version, **then refresh every project on this machine** to it (spawns `refresh --all`). `--no-projects` skips the sweep; `--dry-run` previews. |
| `refresh` | Force the installed skill up to your CLI version (non-destructive). `--all` sweeps every SEOAgent project on the machine — handy right after an upgrade so you don't have to open each one. |

## Auto-Sync Hook

`init` writes two hooks to `.claude/settings.json`, both running `npx -y @seoagent-official/seoagent@latest sync --silent`:

- a **`SessionStart`** hook — runs at the start of every Claude Code session, **before** Claude reads the skill, so the skill is always current (this is what makes a CLI upgrade take effect on your *next* session);
- a **`PostToolUse`** (`Write|Edit`) hook — keeps `.seoagent/` synced as the agent edits during a session.

The hooks deliberately use the `npx -y …@latest` form (not bare `seoagent`) so they survive `npm uninstall -g` **and actually stay current** — pinning `@latest` forces npx to re-resolve the newest version each run instead of silently reusing a stale `~/.npm/_npx` cache. No-op when not logged in. Race-safe: a cooperative lock keeps a manual `seoagent sync` from clobbering an in-flight hook run. Both run the same `sync`, which **auto-refreshes the installed skill** when the CLI is newer than the project's `skill_version` — rewriting only the skill bundle, never `.seoagent/`.

## Telemetry (anonymous, disclosed, opt-out)

`seoagent init` sends **one anonymous ping** so we can count installs: a random
install id (the same UUID `keywords --peek` uses), the event name (`init` /
`reinit`), the CLI version, and your OS platform. **Nothing else** — no domain,
no file paths, no environment contents, no username. The CLI prints a
disclosure line whenever a ping is sent.

`init` also runs one **free keyword peek** on your domain's brand name (the
same `keywords --peek` lookup, shown to you in the output) so you see real
keyword data immediately; that request carries your project domain, exactly
like a manual `--peek`.

Opt out of both with either:

```bash
export SEOAGENT_TELEMETRY=0   # SEOAgent-specific
export DO_NOT_TRACK=1         # the cross-tool convention — also respected
```

## SEOAgent Cloud

The free skill handles audits, strategy, briefs, articles, and persistent state using Claude's native capabilities. For teams and production SEO, [SEOAgent Cloud](https://seoagent.com/pricing?ref=npm-readme-pricing) adds:

- **Real keyword data (DataForSEO)** — Actual search volumes, difficulty scores, and opportunity classification (easy-win / striking-distance / competitor-gap). Free login enriches your top ~25 keywords (`keywords`); paid lifts the cap and unlocks discovery of new targets (`--discover`) and competitor-gap analysis (`--competitors`).
- **Deep crawling** — Firecrawl-powered JS rendering (finds issues in SPAs)
- **AI-generated images + autopilot** — Hero + inline images created and uploaded to your CMS automatically
- **GSC integration** — Real clicks, impressions, CTR, position tracking
- **CMS publishing** — WordPress, Ghost, Webflow, Shopify, Strapi
- **Team collaboration** — Invite members, share strategy, coordinate publishing
- **Cloud dashboard** — See everything Claude Code did at [seoagent.com](https://seoagent.com?ref=npm-readme-dashboard) (also free with any account)

Run `seoagent login` (or `npx -y @seoagent-official/seoagent@latest login`) for the free dashboard, or `seoagent upgrade` for paid features.

## Pattern Note

Most Claude skills are markdown-only or marketplace plugins. SEOAgent uses **npm + `init`** so setup is versioned and repo-aware. The result is still a project-local skill Claude loads like any other — with the addition of:

- A persistent `.seoagent/` workspace for cross-session state
- A reference library Claude pulls from on demand (page-type protocols, JSON-LD library, etc.)
- A `PostToolUse` hook for transparent cloud sync
- Image-generation adapters for OpenAI / fal.ai / Replicate

## License

MIT

## 1.87.0 — the skill attention diet

SKILL.md body cut 17,237 → 5,228 words (~27k → ~9k activation tokens); situational protocols moved to `skills/references/` (inbox, pull-receipt, session-protocol, publishing, cloud-cta, schemas); `seoagent doctor` routes the agent to the right reference file (`inbox_pending` finding added). Trigger description unchanged. Methodology: seoagent.com/blog/claude-skills-token-cost
