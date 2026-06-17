# Open Knowledge Format (OKF) Bundle

OKF is an open standard Google published in 2026 (spec + reference code at `github.com/GoogleCloudPlatform/knowledge-catalog/okf`) for packaging an organization's knowledge as a directory of **markdown files with YAML frontmatter**, designed for AI agents and answer engines to read directly. It is vendor-neutral, human-readable, and version-controlled like code — think of it as a wiki written for machines.

**Why it matters for SEO:** a growing share of search happens inside AI assistants (ChatGPT, Claude, Perplexity) and Google's AI Overviews. Being understood and cited there is **Answer Engine Optimization (AEO / GEO)**. An OKF bundle gives those models a curated, trustworthy account of the business instead of leaving them to guess from scraped pages. SEOAgent is uniquely positioned to produce it because the knowledge already lives in `.seoagent/` (business context, strategy, published content).

This file is the protocol for generating and maintaining a site's OKF bundle. The deterministic parts (scaffold + validate) are CLI commands; **you** write the bundle content by mapping `.seoagent/` artifacts into OKF files.

## Where the bundle lives

`.seoagent/okf/` — it syncs to the cloud like the rest of `.seoagent/`. The user publishes it themselves at `/.well-known/okf/` or `/okf/` on their site (or links it from `llms.txt`).

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

1. Run `seoagent okf scaffold` to create the directory skeleton (`index.md` + `log.md`) — it never overwrites existing files.
2. Fill `index.md` from `.seoagent/context.md` and `project.md`: what the business does, who it serves, then a linked list of the concept / FAQ / article files.
3. For each keyword cluster in `.seoagent/strategy/clusters/`, write a `concepts/<slug>.md` (`type: Concept` or `Topic`) capturing the definitive, factual explanation — not marketing fluff. Stats, definitions, and comparisons are what AI cites.
4. For each clear question the business answers, write a `faqs/<slug>.md` (`type: FAQ`): the question as the title, a tight factual answer in the body.
5. For each published article in `.seoagent/content/`, write `articles/<slug>.md` (`type: Article`) with `resource:` set to the live URL and a 2–4 sentence factual summary; cross-link related concepts.
6. Add a dated entry to `log.md`.
7. Run `seoagent okf validate` and fix every error (missing `type`, bad `timestamp`, broken link) before finishing.
8. Sync runs automatically (or `seoagent sync`) so the bundle reaches the cloud dashboard.

## Quality bar

- Write for a model, not a brochure: lead with facts, numbers, and definitions. Avoid superlatives and CTAs.
- One concept per file; keep files focused and cross-linked.
- Keep `resource:` URLs canonical and live — they are how an agent verifies and cites you.
- Regenerate when content changes so the bundle never drifts from reality.

## CLI commands

- `seoagent okf` — status (is a bundle present? how many files?)
- `seoagent okf scaffold` — create the starter `index.md` + `log.md`
- `seoagent okf validate` — assert every file has `type`, timestamps are ISO-8601, and all relative links resolve
