# Pillar Article Protocol

A pillar is the **authority post** for a topic cluster. One per cluster. It establishes topical depth, ranks for the broadest keyword in the cluster, and links DOWN to every sub_pillar in the cluster. Authority funnels UP from sub_pillars and long_tails into the pillar.

## When to Use

- Brief has `role: PILLAR`
- Primary keyword is the cluster's broad term (e.g. "technical seo", "content marketing", "react state management")
- This is the first article in a new cluster, OR the user is rewriting the existing pillar

## URL & Slug Rules

- `/blog/{primary-keyword}` — flat, NOT nested under cluster
- Use the primary keyword as the slug — hyphenated lowercase, no stop words removed
- Examples: `/blog/technical-seo-guide`, `/blog/content-marketing`, `/blog/react-state-management`
- Don't append year suffixes to the slug (`/technical-seo-2026`) — use `dateModified` in JSON-LD instead

## Word Count Target

2500–4000 words. A pillar must be comprehensively the best result for its term. If you're writing under 2500, it's probably a sub_pillar.

## Title & Heading Patterns

Title formulas (in order of preference):
1. **The Complete {Topic} Guide** — `The Complete Technical SEO Guide`
2. **{Topic}: Definition, Examples, and How to {action}** — `Topic Clusters: Definition, Examples, and How to Build Them`
3. **{Topic} for {audience}** — `Technical SEO for SaaS Companies` (when targeting a vertical)
4. **A 2026 Guide to {Topic}** — only if recency is part of the value prop

Avoid: clickbait ("X mistakes you're making"), listicle-style ("10 things..." — that's a sub_pillar or long_tail format)

## Section Structure

Required sections in this order:

1. **TL;DR** — 40-80 words, direct answer to "what is {topic}". This is the first paragraph after H1, before any H2. AI-extractable for featured snippets and AI Overview citations.
2. **What Is {Topic}?** — H2. Define clearly with bold definition in first sentence. ~150-250 words.
3. **{Topic} vs Adjacent Concepts** — H2 with comparison table. Differentiate the topic from neighbors.
4. **Why {Topic} Matters** — H2. Stakes, business impact, what happens if you ignore it. ~200-300 words.
5. **The {Topic} Framework / Checklist** — H2. The substantive how. Numbered list or step-by-step. The longest section.
6. **{Topic} {sub_pillar 1}** — H2. Brief overview that links out to your sub_pillar article on this subtopic.
7. **{Topic} {sub_pillar 2}** — H2. Same pattern.
8. **(continue for each sub_pillar in the cluster)** — Each gets one H2 section + a "Read more: [sub_pillar title]" link.
9. **Common Mistakes** — H2. 4-6 numbered mistakes with explanations.
10. **{Topic} for Different Use Cases** — H2 (optional). Vertical or audience-specific applications.
11. **FAQs** — H2 with 5-7 H3 questions in natural language. Powers FAQ schema.
12. **Conclusion** — H2. Restate the framework, give a clear next step (link to a sub_pillar or to your tool).

## Internal Linking — Pillar Links DOWN

The pillar links to **every existing SUB_PILLAR** in its cluster. Read `.seoagent/strategy/clusters/{cluster-slug}.md` first to find them.

Linking pattern:
- Each sub_pillar gets one section (H2) in the pillar with a clear "Read more →" link to the sub_pillar article
- Body links throughout naturally, not just in the dedicated section
- Anchor text matches the sub_pillar's primary keyword

The pillar may also link UP to the homepage or a top-level category page (e.g. `/blog`).

The pillar should NOT link to long_tails directly — those funnel through their parent sub_pillar.

## AI Search Optimization

Pillars are the most likely to be cited by AI Overviews and AI assistants. Optimize for extraction:

- **Definition block**: First paragraph after H1 must answer "what is {topic}" in 40-80 words
- **One-sentence answer per H2**: Open every H2 with a direct one-sentence answer before expanding
- **Comparison tables**: Use tables for "vs" content (Google's AI Overviews love these)
- **Step-by-step lists**: Use numbered lists for processes
- **Stats with sources**: Include 3-5 statistics with cited sources (real ones, not invented)
- **FAQ section**: 5-7 natural-language questions

## Metadata Defaults

```yaml
title: "{The Complete Topic Guide} | {Brand}"
meta_title: "{Topic}: The Complete Guide ({year}) — {Brand}"   # 50-60 chars
meta_description: "{Topic} explained: {key benefit 1}, {key benefit 2}, {key benefit 3}. {Outcome promise} with our complete guide." # 150-160 chars
canonical: "https://{domain}/blog/{slug}"
og:
  title: "{Topic}: The Complete Guide"
  description: "{first sentence of TL;DR}"
  image_alt: "{describe the OG image — usually a hero illustration}"
twitter:
  card: summary_large_image
```

## JSON-LD Schema

Pillars almost always need both `Article` and `FAQPage`:

```json
[
  {
    "@type": "Article",
    "headline": "{Title}",
    "author": { "@type": "Person", "name": "{Author Name}" },
    "datePublished": "{ISO date}",
    "dateModified": "{ISO date}",
    "image": "https://{domain}/{hero-image}",
    "publisher": {
      "@type": "Organization",
      "name": "{Brand}",
      "logo": { "@type": "ImageObject", "url": "https://{domain}/logo.png" }
    }
  },
  {
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "{H3}", "acceptedAnswer": { "@type": "Answer", "text": "{first paragraph of section}" } }
    ]
  }
]
```

If the pillar contains step-by-step processes, also add `HowTo` schema. If it contains a glossary section, add `DefinedTermSet`.

## After Writing

1. Update `.seoagent/strategy/clusters/{cluster-slug}.md` — set the pillar's `status: drafted` in the article table.
2. Update the cluster file's "Internal Linking" section to confirm the pillar's outbound links.
3. Append to `.seoagent/changelog.md`: `[date] Pillar drafted: {slug} ({word_count} words)`
4. Run `seoagent sync`.

## When to Rewrite an Existing Pillar

See `references/rewrite-protocol.md`. Triggers: facts > 18 months old, new sub_pillars added that need to be referenced, ranking dropped, search intent shifted.
