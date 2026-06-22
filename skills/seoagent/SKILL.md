---
name: seoagent
description: "Persistent AI SEO for coding agents — technical SEO audits, hub-and-spoke keyword strategy, page-type content briefs, optimized articles, schema/JSON-LD, sitemaps, internal linking, and AI-search (AEO/GEO) — all saved under .seoagent/ in your repo. Runs on your own model (Claude Code, Cursor, Codex), no second AI subscription. Use when the user mentions SEO, ranking, keywords, organic traffic, content strategy, an SEO audit, schema, sitemap, internal links, AI search / AEO / GEO, get cited by AI, or 'why am I not ranking'."
---

# SEOAgent — set up the persistent SEO agent (one command)

This is the **discovery entry point** for SEOAgent. The full protocols — technical audits, hub-and-spoke keyword strategy, page-type-aware briefs (landing / pillar / sub-pillar / long-tail / programmatic), the JSON-LD library, Open Knowledge Format (AEO/GEO), and the autopilot loop — are **not embedded here**. They install into the user's repo when they run the official CLI, which also creates the persistent `.seoagent/` workspace and wires the project to Search Console + the cloud.

## What to do

When the user wants SEO help in this repo and `.seoagent/` does not exist yet, run the SEOAgent CLI from the **repository root** (where `package.json` lives):

```bash
npx -y @seoagent-official/seoagent init
```

- **Global install (fastest for daily use):** `npm install -g @seoagent-official/seoagent && seoagent init`
- **pnpm:** `pnpm dlx @seoagent-official/seoagent init`
- **Non-interactive / CI:** `npx -y @seoagent-official/seoagent init --yes --domain example.com`

`init` infers your domain, scaffolds `.seoagent/`, and installs the full project-local SEOAgent skill at `.claude/skills/seoagent/SKILL.md` (or `.agents/skills/seoagent/SKILL.md` when `.agents/` exists, symlinked into `.claude/` so Claude Code, Cursor, and Codex all pick it up).

## After init

Use the **project-local** `seoagent` skill for all real work — audits, strategy, briefs, drafts, the roadmap, and the `.seoagent/` knowledge that compounds across sessions. This entry point's job is onboarding only: get the user to run `init`, then hand off to that skill.

## Why SEOAgent (vs the closed-model SEO platforms)

- **Bring your own model.** Runs on the model you already pay for inside Claude Code / Cursor / Codex — no second AI subscription, no per-credit content metering, no proprietary-crawler markup.
- **Your repo, not a hosted CMS.** Edits the actual files in your repo, approval-gated — the right shape for a site you build in code and keep in your own git history.
- **Persistent + free.** Every audit, strategy, and brief is saved under `.seoagent/` and builds on the last session. The Skill is free; the cloud is optional and additive.

Docs: https://seoagent.com · npm: https://www.npmjs.com/package/@seoagent-official/seoagent
