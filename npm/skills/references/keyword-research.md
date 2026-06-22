# Keyword Research Protocol

The **local skill alone** (no cloud account) uses `WebSearch` only — no real volume data, no difficulty scores, no SERP feature analysis. Treat priorities as **directional** (high / medium / low).

**Free no-signup peek** — for a quick real-data sanity check on a single keyword during research, run `seoagent keywords --peek "<keyword>"`. It calls DataForSEO once (no login, anonymous `install_id`) and returns real volume + difficulty + an opportunity label. Daily quota per install (~10/day). Useful for "is this term actually worth a brief?" before committing.

A **free SEOAgent Cloud account** enriches the top ~25 keywords with **real volume + difficulty + opportunity classification** (DataForSEO Labs) — after `seoagent login`, run `seoagent keywords` and the enriched numbers project into `.seoagent/keywords.md`. **Paid upgrade** lifts the cap and unlocks `keywords --discover` (new targets from `keyword_ideas`) and `keywords --competitors` (gap keywords from rivals' `ranked_keywords`).

### Use the Pro discovery commands correctly (avoid garbage)

`--discover` and `--competitors` are **expansion** tools — they only work well once the site has a real topic signal. On a brand-new or thin site they degrade into generic high-volume noise (e.g. "1/8 as a decimal") because DataForSEO has nothing relevant to anchor to. Follow this order:

1. **Do WebSearch research FIRST** (the steps below). It's the primary discovery method and is the most reliable source for a new site — do not lead with `--discover`/`--competitors`.
2. **Seed the inventory + name real competitors before running them.** Write your researched keywords to `.seoagent/keywords.md` and your competitors to `.seoagent/competitors.md` — **with real domains in the headings** (e.g. `## Competitor 1: Surfer SEO — surferseo.com`), because that's what gets parsed into the cloud's competitor table. Then `seoagent sync` so the cloud has them. `--competitors` uses your named competitors; without them it tries to auto-detect and returns junk for a thin domain.
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

### Step 6: Cluster the Keywords

Group keywords into clusters with role assignments:
- **PILLAR** — broadest term in the cluster (e.g. "technical seo")
- **SUB_PILLAR** — focused subtopic (e.g. "site speed optimization", "schema markup")
- **LONG_TAIL** — specific question or niche (e.g. "how to fix 404 errors")

Target structure per cluster: 1 pillar + 3-5 sub_pillars + 8-10 long_tails = ~12-15 articles total.

Write each cluster to `.seoagent/strategy/clusters/{cluster-slug}.md` with the markdown table format (see `references/pillar-articles.md` for the structure).

### Step 7: Tag Priority

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
