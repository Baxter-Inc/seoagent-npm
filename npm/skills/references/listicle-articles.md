# Listicle Article Protocol

A listicle is a **format**, not a cluster role: a ranked or curated set of items ("Top 10 X", "Best N Y", "7 Ways to Z"). By cluster role a listicle is almost always a **SUB_PILLAR** or **LONG_TAIL** (a spoke that funnels authority UP). Write it in this format *on top of* its role — tag it `article_type: listicle` (and `page_type: listicle`) so the cloud pipeline applies listicle handling + `ItemList` schema.

The win: listicles dominate **commercial-investigation** SERPs ("best", "top", "alternatives") and are the format AI answer engines quote most for "what are the best X" — a clean item list is trivially extractable.

## When to Use

- The title matches a listicle pattern the backend recognizes: `Top N`, `Best N`, `N Best`, `N Top`, `N Ways`, `N Tips`, `N Reasons`. (Inference regex: `/(top \d+|best \d+|\d+ best|\d+ top|\d+ ways|\d+ tips|\d+ reasons)/i`.)
- Intent is commercial-investigation or "show me the options": *best ai seo tools*, *clearscope alternatives*, *top next.js seo plugins*.
- You have a genuine, defensible set of items. If you can't fill N with real, distinct entries, pick a smaller N or write a guide instead.

## URL & Slug Rules

- `/blog/{primary-keyword}` — flat, same as every other post.
- Slug = the keyword, not the number: `best-ai-seo-tools`, **not** `top-10-ai-seo-tools` (the count changes when you update the list; the keyword doesn't). Keep the number in the title, out of the slug.

## Word Count Target

Driven by item count, not a fixed total: **~120–250 words per item** + ~150-word intro + ~150-word conclusion. So a Top 7 ≈ 1,300–1,900 words; a Top 12 ≈ 1,900–3,200. Don't pad thin items to match the fat ones — uneven depth is fine if the item warrants it, but every item earns its slot.

## Title Patterns

The number is part of the promise — keep it. Add the year for freshness on "best/top" commercial terms.

1. **{N} Best {category} ({year})** — `10 Best AI SEO Tools (2026)`
2. **Top {N} {category} for {audience/use case}** — `Top 7 SEO Tools for Next.js Developers`
3. **{N} {category} {qualifier}** — `9 Free Keyword Research Tools`
4. **Best {category} for {use case}** (no number — a curated "best of") — `Best AI SEO Tools for Indie Hackers`

Match the number in the title to the actual item count. A title that says 10 with 8 items reads as sloppy and Google notices the mismatch.

## Section Structure

1. **Intro (≤150 words)** — what the list covers, who it's for, and *how you chose* (the selection criteria — one line builds trust + E-E-A-T). Don't bury the list behind a 600-word preamble; searchers came for the items.
2. **Quick-pick summary** — 2–5 bolded verdicts right after the intro: **Best overall:** X · **Best free:** Y · **Best for {use case}:** Z. This is the AI-extractable / featured-snippet payload — put it high.
3. **At-a-glance comparison table** (strongly recommended for tools/products) — columns like Tool · Best for · Price · Standout. One row per item. Tables are the single most-quoted element in AI Overviews for "best X".
4. **The items** — one H2 per item, **identical sub-structure for every item** (see below). Consistency *is* the quality bar for a listicle.
5. **How to choose** — a short H2 helping the reader self-select ("pick X if…, Y if…"). Reinforces the quick-pick.
6. **FAQ** — only if there are genuinely 3+ recurring sub-questions ("is there a free option?", "which works with WordPress?").

### Per-item structure (keep it identical across all items)

Each item is an H2 (`## 1. {Item name}` — numbered so the count is unmistakable), then the **same** beats in the **same order**:

- **One-line verdict** (bold) — the take. *"The most automated option if you live in your editor."*
- **What it is** — 1–2 sentences.
- **Standout / why it's on the list** — the differentiator.
- **Best for** — the audience this item suits.
- **Pricing** — real, current, or "free / from $X/mo" (don't invent numbers — leave it out if unknown).
- *(Optional)* **Pros / Cons** — 2–3 each, as tight bullets.
- A link — to the item's site, or to your own page if it's your product/an internal target.

## Honesty & positioning (when your own product is on the list)

Including yourself is fine and expected — but **earn the placement**. State real strengths and real limits; don't auto-rank yourself #1 over obviously stronger incumbents. A listicle that's transparently self-serving loses the trust (and the citations) that make the format work. If you're a first-mover in the category, say *why* you're listed (the honest differentiator), not just *that* you're #1. Follow `.seoagent/context.md` for current positioning and banned claims.

## Internal Linking — a listicle links UP and OUT

Read `.seoagent/strategy/clusters/{cluster-slug}.md`:
- **Link UP** to the parent (sub_pillar if this is a long_tail; the pillar if this is a sub_pillar) — at least once.
- **Link OUT to your own pages** when an item *is* your product or maps to one of your `/compare`, `/features`, or pillar pages — the listicle is a hub that distributes authority to commercial pages.
- Link sideways to a sibling listicle/spoke once if relevant.

## AI Search Optimization

Listicles are prime AI-Overview real estate. Optimize for extraction:
- **Quick-pick verdicts + comparison table high on the page** — these are what gets quoted.
- **Consistent per-item structure** so an LLM can parse each entry into the same fields.
- **The number in an H2 per item** (`## 3. …`) makes the list machine-countable.
- Keep verdicts declarative and standalone ("X is the best free option because…").

## Metadata Defaults

```yaml
title: "{N} Best {category} ({year})"
article_type: listicle          # so the cloud pipeline applies listicle handling
page_type: listicle
meta_title: "{N} Best {category} ({year})"                              # ≤60 chars
meta_description: "Our pick of the {N} best {category} for {audience} in {year} — {best-overall} for X, {best-free} for Y, and more." # 150-160 chars
canonical: "https://{domain}/blog/{slug}"
og:
  title: "{Title}"
  description: "{The quick-pick verdicts in one line}"
  image_alt: "{...}"
twitter:
  card: summary_large_image
```

## JSON-LD Schema

A listicle's defining schema is **`ItemList`** (in addition to `Article`). For tool/product round-ups, type each item as `SoftwareApplication`/`Product`; add `Review`/`AggregateRating` only if you have real ratings.

```json
[
  {
    "@type": "Article",
    "headline": "{Title}",
    "author": { "@type": "Person", "name": "{Author}" },
    "datePublished": "{ISO date}",
    "dateModified": "{ISO date}",
    "image": "https://{domain}/{hero}",
    "publisher": { "...": "..." }
  },
  {
    "@type": "ItemList",
    "itemListOrder": "https://schema.org/ItemListOrderDescending",
    "numberOfItems": "{N}",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "{Item 1}", "url": "{item-1-url}" },
      { "@type": "ListItem", "position": 2, "name": "{Item 2}", "url": "{item-2-url}" }
    ]
  }
]
```

Use `itemListOrder` `…OrderAscending`/`…OrderDescending` for a true ranking; omit it (or use unordered) for an unranked "best of". See `references/schema-markup.md` for the full JSON-LD rules.

## Quality rules — a listicle is LIGHTER than a guide/pillar

The cloud's type-conditional quality bar does **not** require Principle Callouts, a Boundary section, Reusable Artifacts, or Citations on a listicle (those are for guide/pillar/how_to). Don't force pillar-style scaffolding onto a list — it bloats it. The listicle's quality bar is: **complete & current item set, consistent per-item structure, honest verdicts, a comparison table, and the quick-pick summary.**

## After Writing

1. Update the cluster file — set this article's `status: drafted` and note `format: listicle` in the article table.
2. **Link UP** — edit the parent (sub_pillar/pillar) to reference this listicle if it isn't already linked.
3. Append to `.seoagent/changelog.md`: `[date] Listicle drafted: {slug} ({N} items, {word_count} words)`.
4. Run `seoagent sync`.

## Common Pitfalls

- **Title/count mismatch.** Title says 10, body has 8. Fix one or the other.
- **Uneven items.** Item 1 gets 400 words, item 7 gets 40. Keep the per-item structure consistent.
- **Number in the slug.** `top-10-…` rots when the list changes; use the keyword.
- **Burying the list.** A 600-word intro before item 1. Lead with the quick-pick + table.
- **Dishonest self-ranking.** Putting your product #1 over clearly stronger tools — kills trust and citations.
- **Padding to pillar length.** A listicle is as long as its items justify; don't inflate to 3,000 words.
- **No comparison table / no quick-pick.** You're leaving the AI-Overview and featured-snippet wins on the table.
