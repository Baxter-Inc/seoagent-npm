# Keyword Research Protocol

**Use the richest real data the account is entitled to — WebSearch estimates are the fallback, not the default.** Check the tier (you usually know it; else `seoagent whoami` → `plan`/`paid`):

| Tier | Data path |
|---|---|
| **Pro / paid** | **Full DataForSEO** — `seoagent keywords` (enrich, no quota) + `--discover` (new targets) + `--competitors` (gap keywords). Don't fall back to WebSearch estimates for a paid user. |
| **Free account (logged in)** | `seoagent keywords` — real volume/difficulty for the top ~25 (no quota). WebSearch for breadth beyond 25. Surface the Pro upsell. |
| **Anonymous (no login)** | `keywords --peek "<kw>"` — a *single*-keyword spot-check, ~10/day quota. WebSearch H/M/L for breadth. Recommend `seoagent login`. |

**Never loop `--peek` across many keywords** — it's the anonymous single-keyword tool and will hit its ~10/day quota. Logged in, `seoagent keywords` enriches the whole top set at once with no quota. Use `--peek` only when not logged in, or to validate one finalist.

**WebSearch H/M/L priorities are directional** — use them only when real numbers aren't available (anonymous breadth, beyond the free ~25, a `402` gate, or first-mover terms below). Never invent numeric scores.

> **First-mover terms DataForSEO can't size = opportunity.** Brand-new on-strategy categories (`claude code seo`, `cursor seo`, an emerging product term) often return **no volume / no data**. For a first-mover that means low competition you can own before the volume arrives — **don't discard an on-strategy term for lack of data**; mark it `first_mover`/high-opportunity (cite `context.md` + any GSC impressions or WebSearch signal) and prioritize. Treat no-data as low-value only when the term is *also* off-strategy.

**Cold start — seed from Search Console.** On a site with **no keyword inventory yet**, the best first move (once `seoagent login` + GSC are connected) is `seoagent keywords --seed`: it adds the site's **own impressed GSC queries** — real, inherently relevant, winnable terms (page-2 queries become "striking distance"). It's **additive** (adds new queries, keeps any existing keywords — never overwrites). Do this *before* `--discover`/`--competitors`, which need a topic signal and otherwise return noise.

**Cold start — seed from Search Console.** On a site with **no keyword inventory yet**, the best first move (once `seoagent login` + GSC are connected) is `seoagent keywords --seed`: it adds the site's **own impressed GSC queries** — real, inherently relevant, winnable terms (page-2 queries become "striking distance"). It's **additive** (adds new queries, keeps any existing keywords — never overwrites). Do this *before* `--discover`/`--competitors`, which need a topic signal and otherwise return noise.

**But GSC is historical — segment it against the current positioning.** The queries reflect *past* demand; if the brand/product has **pivoted or rebranded**, some seeds are legacy. Read `.seoagent/context.md`, then split the seeds into **on-strategy** (keep + prioritize) and **legacy/off-strategy** (harvest/defend only — don't anchor the new strategy to them). The pivot's new terms have little GSC history, so generate those forward-looking clusters from the positioning + WebSearch, not from `--seed`. If GSC isn't connected, recommend it (Phase 2 in `seoagent.md`); if the seeded data looks weeks stale, flag a possible GSC-sync lag.

### Use the Pro discovery commands correctly (avoid garbage)

`--discover` and `--competitors` are **expansion** tools — they only work well once the site has a real topic signal. On a brand-new or thin site they degrade into generic high-volume noise (e.g. "1/8 as a decimal") because DataForSEO has nothing relevant to anchor to. Follow this order:

1. **Seed the inventory FIRST so discovery has a signal** — via `keywords --seed` (GSC) and/or a WebSearch pass (the steps below). This isn't "WebSearch instead of DataForSEO"; it's giving `--discover`/`--competitors` a real topic to anchor to so they don't return generic noise. Once there's an inventory, real DataForSEO leads.
2. **Name real competitors (improves `--competitors`).** Write competitors to `.seoagent/competitors.md` **with real domains in the headings** (e.g. `## Competitor 1: Surfer SEO — surferseo.com`) — that's what's parsed into the cloud's competitor table. `seoagent sync`. On Pro, `--competitors` will *also* auto-discover rivals (DataForSEO `competitors_domain`) and merge them, but naming the obvious ones up front gives it a cleaner anchor on a thin domain. (No DataForSEO/Pro? A WebSearch competitor pass into `competitors.md` is the free substitute.)
3. **Then** run `seoagent keywords` (enrich) → `--discover` → `--competitors`.
4. **Always relevance-check what they return.** Treat every `status='suggested'` keyword as a *candidate*, not a fact — drop anything off-topic for the business before adding it to the strategy, no matter how high the volume or low the difficulty. The server now filters obvious noise, but you are the final gate.
5. **For a single keyword's real numbers without the bulk commands, use `--peek`** — it's reliable and quota-limited; ideal for validating finalists.

## Goals of Free-Tier Research

1. **Discover the keyword space** — what terms is the audience actually searching?
2. **Estimate competition direction** — is the SERP dominated by aggregators (you can compete), Wikipedia/government (skip), or thin results (huge opportunity)?
3. **Build the cluster structure** — group keywords into pillar / sub_pillar / long_tail
4. **Persist findings** so future sessions don't re-research from scratch

## Research Procedure

### Step 1: Understand the Site

Read `.seoagent/project.md` and `.seoagent/context.md`. Confirm:
- Domain
- Site type (saas, content, product, etc.)
- Industry / niche
- Target audience
- Business model (B2B SaaS? B2C product? Content-monetized?)

### Step 2: Seed Topics

From the homepage WebFetch and context.md, identify 5-10 seed topics. These are broad terms the business naturally cares about — e.g. for an invoicing SaaS: "invoicing", "freelance billing", "small business accounting".

### Step 3: Run WebSearch Queries

Run 10-15 queries across the search funnel. Pattern templates:

**Awareness stage (informational)**
- `what is {seed}`
- `{seed} for beginners`
- `how does {seed} work`
- `{seed} explained`
- `{seed} guide`

**Consideration stage (commercial investigation)**
- `best {seed} tools`
- `{seed} vs {alternative}`
- `top {seed} {audience}`
- `{seed} alternatives`
- `{seed} comparison`

**Decision stage (commercial)**
- `{seed} pricing`
- `{seed} reviews`
- `is {seed} worth it`
- `{seed} for {specific use case}`

**Long-tail (specific intent)**
- `{seed} for {audience}`
- `{seed} in {year}`
- `{seed} examples`
- `{seed} mistakes`
- `how to {do action with seed}`
- `why is my {seed} {problem}`

For each query, observe:
- **Top 3-5 results** — who ranks? What format (article, listing, video, tool)?
- **People Also Ask** — surfaces related queries
- **Featured snippet** — if present, what format (definition, list, table)?
- **Search intent** — informational, commercial, transactional?

### Step 4: Identify Competitors

From the SERP results, note who shows up across multiple queries. Likely competitors. WebFetch their blog index (`/blog`) to see their topic coverage. Persist to `.seoagent/competitors.md`:

```markdown
---
last_updated_at: 2026-04-27T10:00:00Z
---

# Competitors — example.com

## Competitor 1: SuperRival.com
**Domain authority signal:** Appears in top 3 for 8 of 12 our seed queries.
**Content focus:** Heavy on tutorials, light on advanced guides.
**Coverage gaps:** No content on AI search optimization, no schema markup deep-dives.
**Style:** Long-form, listicle-heavy, lots of comparison tables.

## Competitor 2: BetterAlt.com
...
```

### Step 5: Build the Keyword Inventory

Persist all candidate keywords (assigned + backlog) to `.seoagent/keywords.md`:

```markdown
---
last_updated_at: 2026-04-27T10:00:00Z
total_keywords: 47
assigned: 21
backlog: 26
---

# Keyword Inventory — example.com

## Cluster: Technical SEO

**Pillar keyword:** technical seo guide
**Sub-pillar keywords:** site speed optimization, crawlability, schema markup, internal linking
**Long-tail (assigned):** how to fix 404 errors, what is robots.txt, technical seo checklist
**Long-tail (backlog):** technical seo for next.js, how to test core web vitals, sitemap.xml not indexing

## Cluster: AI Search

**Pillar keyword:** ai search optimization
**Sub-pillar keywords:** AEO, GEO, generative search optimization
**Long-tail (assigned):** how to optimize for chatgpt, what is google's ai overview
**Long-tail (backlog):** perplexity citation optimization, ai search vs traditional seo

## Unclustered (To Triage)

- "seo for indie hackers" — could be pillar of new cluster, or sub_pillar under "seo for saas"
- "technical seo audit checklist" — backlog under technical-seo cluster
```

> **⚠️ `keywords.md` is parsed by a strict machine format — write keyword phrases ONLY.** After each `**…:**` label, write a plain comma-separated list of keyword *phrases* and nothing else. **Do NOT inline volume, KD/difficulty, intent, stars, or notes into this file** — the parser splits on commas and persists every fragment as a keyword, so `**Pillar keyword:** ai seo tools — vol 2400, KD 10` becomes the junk keywords `KD 10` and `ai seo tools — vol 2400` in the cloud. Put all metrics, analysis, and commentary in `strategy/discovery.md` or the cluster files instead. In the Unclustered list, a short ` — annotation` after the phrase is fine (it's stripped), but keep the phrase itself clean. Once you've run `seoagent keywords` (cloud enrichment), `keywords.md` becomes a **read-only projection** (`generated: true`) — don't hand-edit it then; clear discovery noise with `seoagent keywords --purge`.

### Step 6: Cluster the Keywords

Group keywords into clusters with role assignments:
- **PILLAR** — broadest term in the cluster (e.g. "technical seo")
- **SUB_PILLAR** — focused subtopic (e.g. "site speed optimization", "schema markup")
- **LONG_TAIL** — specific question or niche (e.g. "how to fix 404 errors")

Target structure per cluster: 1 pillar + 3-5 sub_pillars + 8-10 long_tails = ~12-15 articles total.

Write each cluster to `.seoagent/strategy/clusters/{cluster-slug}.md` with the markdown table format (see `references/pillar-articles.md` for the structure).

### Step 7: Tag Priority

**Use real DataForSEO volume + difficulty + opportunity labels when the account has them** (logged in → top ~25; Pro → the whole inventory). H/M/L bins below are the **fallback** for terms you only have WebSearch signal for (and for first-mover terms with no data — tag those high-opportunity, not low). Don't downgrade a real low-difficulty/striking-distance term to "M" on a hunch when the data says otherwise.

Use H/M/L bins:
- **High** — high search demand signals (autocomplete, multiple SERP results, "people also ask"), low competition (no Wikipedia, no government, no huge brands), strong business fit
- **Medium** — decent demand but competitive, OR low demand but easy to win
- **Low** — niche, exploratory, or weak business fit

Don't invent numerical scores. The free tier doesn't have data to support them.

## Identifying SERP Patterns

Different SERP patterns suggest different content formats:

| SERP pattern | What ranks | What to write |
|---|---|---|
| Featured snippet (definition) | Articles starting with "X is..." | Sub-pillar with strong opening definition |
| Featured snippet (list) | Listicle articles | Numbered list format, 7-15 items |
| Featured snippet (table) | Comparison content | Comparison table early in article |
| "People Also Ask" boxes | FAQ-format content | Long_tail Q&A articles |
| Top results = listings (Capterra, G2) | Aggregator listings | Build a comparison or alternative page |
| Top results = Wikipedia | Encyclopedic content | Skip — you can't beat Wikipedia |
| Top results = your competitors | Branded blog content | Pillar / sub_pillar content |
| Mostly product pages | Transactional intent | Don't write a blog post — ranks with a product page |
| Mostly tools (calculators, generators) | Interactive content | Build a tool, not an article |

## When to Skip a Keyword

- SERP dominated by Wikipedia, government, or huge brands → skip
- SERP dominated by product pages and the user is searching to buy → write a product page, not content
- Top results all > 5,000 words and you can't realistically commit to that → skip or pivot to a related long_tail
- Audience too far from your business → skip even if rankable

## Cloud Upgrade Hook

After completing keyword research, mention: "These priorities are my estimates from search results. SEOAgent Cloud provides actual search volumes, difficulty scores, and SERP features — `seoagent upgrade`."
