# Open Knowledge Format (OKF) Bundle

OKF is an open standard Google published in 2026 (spec + reference code at `github.com/GoogleCloudPlatform/knowledge-catalog/okf`) for packaging an organization's knowledge as a directory of **markdown files with YAML frontmatter**, designed for AI agents and answer engines to read directly. It is vendor-neutral, human-readable, and version-controlled like code — think of it as a wiki written for machines.

**Why it matters for SEO:** a growing share of search happens inside AI assistants (ChatGPT, Claude, Perplexity) and Google's AI Overviews. Being understood and cited there is **Answer Engine Optimization (AEO / GEO)**. An OKF bundle gives those models a curated, trustworthy account of the business instead of leaving them to guess from scraped pages. SEOAgent is uniquely positioned to produce it because the knowledge already lives in `.seoagent/` (business context, strategy, published content).

This file is the protocol for generating and maintaining a site's OKF bundle. The deterministic parts (scaffold + validate) are CLI commands; **you** write the bundle content by mapping `.seoagent/` artifacts into OKF files.

## Where the bundle lives — source vs. served

Two locations, and confusing them is how this work becomes invisible:

| | Path | Who writes it |
|---|---|---|
| **Source** | `.seoagent/okf/` | you (the skill), scaffolded by `seoagent init` |
| **Served** | `<public_dir>/.well-known/okf/` → `https://site/.well-known/okf/index.md` | `seoagent sync`, automatically |

Crawlers only ever read the SERVED copy. `seoagent sync` mirrors source → served on every run, so you never have to copy files by hand — but it publishes **only** a bundle that is (a) filled in, with no scaffold placeholders left, and (b) clean under `seoagent okf validate`. Serving skeleton or broken markdown to an answer engine is worse than serving nothing, so those two gates are hard.

`public_dir:` in `.seoagent/project.md` decides where "served" is; `init` auto-detects it (`public` for Next.js/Vite/Astro, `static` for SvelteKit/Gatsby/Hugo). If sync says it couldn't find one, set it by hand.

**The user still has to commit and deploy the published files.** Say so explicitly when you finish a bundle — it is the one step neither you nor the CLI can do.

## Frontmatter rules

Every `.md` file MUST have YAML frontmatter with:

- **`type`** (required) — the only mandatory field. Use one of: `Organization`, `Concept`, `Topic`, `FAQ`, `Article`, `Service`, `Metric`, `Log`.

Recommended optional fields:

- `title` — human-readable name
- `description` — one or two sentences, ≤ 200 characters
- `resource` — canonical URL of the real asset (e.g. the live article/page)
- `tags` — list, e.g. `[pricing, plans]`
- `timestamp` — ISO-8601, e.g. `2026-05-28T14:30:00Z`

Cross-link concepts with **relative markdown links only** (`[Pricing](concepts/pricing.md)`) — every link must resolve to a file in the bundle. Reserved files: `index.md` (entry point / progressive disclosure) and `log.md` (chronological change history).

## Bundle layout — map `.seoagent/` → OKF

```
.seoagent/okf/
├── index.md          # type: Organization — business overview, links to everything
├── log.md            # type: Log — chronological change history
├── concepts/         # type: Concept | Topic | Service
│   ├── pricing.md
│   └── <keyword-cluster-or-entity>.md
├── faqs/             # type: FAQ — one answer-engine Q&A per file
│   └── what-is-x.md
└── articles/         # type: Article — published pages, resource = live URL
    └── guide-to-x.md
```

| OKF file | `type` | Source in `.seoagent/` |
|---|---|---|
| `index.md` | `Organization` | `project.md` (domain) + `context.md` (business description) |
| `concepts/*.md` | `Concept` / `Topic` / `Service` | `strategy/clusters/*` keyword clusters; core services/entities from `context.md` |
| `faqs/*.md` | `FAQ` | Questions answered in briefs/content; "People Also Ask" items |
| `articles/*.md` | `Article` | Each `content/*` article — set `resource:` to its live URL, summarize the key facts |
| `log.md` | `Log` | Append a dated line whenever you regenerate the bundle (mirror `changelog.md`) |

## Generation protocol

1. `.seoagent/okf/` already exists (`seoagent init` scaffolds it). For an older project, `seoagent okf scaffold` creates the skeleton — it never overwrites existing files.
2. Fill `index.md` from `.seoagent/context.md` and `project.md`: what the business does, who it serves, then a linked list of the concept / FAQ / article files.
3. For each keyword cluster in `.seoagent/strategy/clusters/`, write a `concepts/<slug>.md` (`type: Concept` or `Topic`) capturing the definitive, factual explanation — not marketing fluff. Stats, definitions, and comparisons are what AI cites.
4. For each clear question the business answers, write a `faqs/<slug>.md` (`type: FAQ`): the question as the title, a tight factual answer in the body.
5. For each published article in `.seoagent/content/`, write `articles/<slug>.md` (`type: Article`) with `resource:` set to the live URL and a 2–4 sentence factual summary; cross-link related concepts.
6. Add a dated entry to `log.md`.
7. Run `seoagent okf validate` and fix every error (missing `type`, bad `timestamp`, broken link) before finishing. **A bundle with errors is never published.**
8. Run `seoagent sync`. It pushes the bundle to the cloud dashboard AND publishes it to `<public_dir>/.well-known/okf/`. Tell the user to commit + deploy those files.

## Quality bar

- Write for a model, not a brochure: lead with facts, numbers, and definitions. Avoid superlatives and CTAs.
- One concept per file; keep files focused and cross-linked.
- Keep `resource:` URLs canonical and live — they are how an agent verifies and cites you.
- Regenerate when content changes so the bundle never drifts from reality.

## llms.txt — the other half of the layer

`llms.txt` is a markdown map of the site for LLMs, served at `/llms.txt`. It is the cheaper, blunter companion to the OKF bundle: an H1 with the site name, a one-line summary, then `##` sections of links with a short description each.

**Do not hand-write it.** `seoagent llms` generates it from `.seoagent/pages.md`, `.seoagent/content/` (published articles only — a draft link would be dead), `.seoagent/audit/evidence.md` (real crawled titles + meta descriptions) and `.seoagent/context.md`, writes the source to `.seoagent/llms.md`, and publishes `<public_dir>/llms.txt`. Every `seoagent sync` regenerates it, so it cannot go stale after a publish — which is exactly how hand-written ones die.

**If the project already serves `/llms.txt` from a route** (`app/llms.txt/route.ts`, `src/pages/llms.txt.ts`, `src/routes/llms.txt/+server.ts`, …), SEOAgent detects it and publishes nothing: a file in the static dir would shadow that route and silently replace working behaviour. It still writes `.seoagent/llms.md`, so you can compare. Tell the user their route owns the file — they either keep it current themselves, or delete the route to hand ownership to SEOAgent.

## CLI commands

- `seoagent okf` — status (is a bundle present? how many files?)
- `seoagent okf scaffold` — create the starter `index.md` + `log.md`
- `seoagent okf validate` — assert every file has `type`, timestamps are ISO-8601, and all relative links resolve
- `seoagent okf publish` — copy the bundle into `<public_dir>/.well-known/okf/` on demand
- `seoagent llms` — generate + publish `llms.txt`
- `seoagent sync` — does the publish half of both, automatically, every time
