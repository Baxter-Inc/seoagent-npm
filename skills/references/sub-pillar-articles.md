# Sub-Pillar Article Protocol

A sub_pillar is a **focused subtopic article** that funnels authority UP to its cluster's pillar. 3-5 sub_pillars per cluster. Sub_pillars rank for medium-tail terms within the cluster's topic space.

## When to Use

- Brief has `role: SUB_PILLAR`
- Primary keyword is a focused subtopic of the cluster (e.g. cluster = "technical seo" → sub_pillar = "site speed optimization")
- The sub_pillar has 1-3 long_tail articles that will link UP to it

## URL & Slug Rules

- `/blog/{primary-keyword}` — flat, NOT nested under cluster or pillar
- Examples: `/blog/site-speed-optimization`, `/blog/crawlability-and-indexation`, `/blog/schema-markup-essentials`
- Don't include "guide", "tutorial", or year suffixes in the slug — keep it the keyword

## Word Count Target

1200–1800 words. Tight, focused, opinionated. If you need 2500+, the topic is pillar-sized — promote it.

## Title Patterns

1. **{Subtopic} Explained** — direct, classic
2. **{Subtopic}: A Practical Guide** — implies actionable, not theoretical
3. **How to {do subtopic}** — when the subtopic is action-oriented
4. **{Subtopic} for {audience}** — when targeting a specific user segment

Avoid pillar-style titles ("The Complete Guide") — those promise comprehensiveness this format can't deliver in 1500 words.

## Section Structure

Required sections:

1. **TL;DR** — 30-60 words, direct answer. AI-extractable.
2. **What Is {Subtopic}?** — H2 if non-obvious. Skip if the keyword is self-explanatory.
3. **Why {Subtopic} Matters** — H2. Stakes specific to this subtopic.
4. **{Subtopic} Step-by-Step / Checklist** — H2. The substantive how.
5. **Tools & Resources** — H2 (optional). Tools that help with this specific subtopic.
6. **Common Mistakes** — H2. 3-4 mistakes specific to this subtopic.
7. **FAQs** — H2 with 3-5 H3 questions.

Sub_pillars don't need a "vs adjacent concepts" section unless that comparison is *the* hook. Save that for pillars.

## Internal Linking — Sub-Pillar Links UP and Sideways

Read `.seoagent/strategy/clusters/{cluster-slug}.md` to identify:
- The cluster's PILLAR — link UP at least twice (once early, once in conclusion)
- Sibling SUB_PILLARs — link sideways 1-2 times where contextually relevant
- Long-tail children of this sub_pillar — optionally link DOWN to them after they exist

Anchor text rules:
- Linking UP to the pillar: use the pillar's primary keyword as anchor
- Linking sideways: descriptive, contextual ("for more on {sibling topic}, see {sibling title}")
- NEVER use "click here", "learn more", or naked URLs

The first internal link in the body should be UP to the pillar. This signals to search engines that the pillar is the cluster authority.

## AI Search Optimization

Same principles as pillars but tighter:
- One-sentence answer per H2
- Tables and numbered lists where the format fits
- 3-5 stats with cited sources
- FAQ section at the end

## Metadata Defaults

```yaml
title: "{Subtopic Title}"
meta_title: "{Subtopic}: {Hook} ({year})"                    # 50-60 chars
meta_description: "{Outcome of doing the subtopic}. {Specific takeaway from the article}. Includes {tools/checklist/examples}." # 150-160 chars
canonical: "https://{domain}/blog/{slug}"
og:
  title: "{Subtopic}: {Hook}"
  description: "{first sentence of TL;DR}"
  image_alt: "{...}"
twitter:
  card: summary_large_image
```

## JSON-LD Schema

```json
[
  {
    "@type": "Article",
    "headline": "{Title}",
    "author": { "@type": "Person", "name": "{Author}" },
    "datePublished": "{ISO date}",
    "dateModified": "{ISO date}",
    "image": "https://{domain}/{hero}",
    "publisher": { "@type": "Organization", "name": "{Brand}", "logo": { "@type": "ImageObject", "url": "..." } }
  },
  {
    "@type": "FAQPage",
    "mainEntity": [...]
  }
]
```

Add `HowTo` schema when the article is an action-oriented step-by-step (title starts with "How to..." or has a numbered checklist as the main content).

## After Writing

1. Update `.seoagent/strategy/clusters/{cluster-slug}.md` — set this sub_pillar's `status: drafted`.
2. **Update the pillar's link graph** — if the cluster's pillar exists and is drafted, edit the pillar to add a "Read more →" link to this sub_pillar. (Use `Edit`, not full rewrite.)
3. Append to `.seoagent/changelog.md`: `[date] Sub-pillar drafted: {slug} ({word_count} words)`
4. Run `seoagent sync`.

## Common Pitfalls

- **Trying to be the pillar.** If the article needs to "cover everything," it's a pillar.
- **Forgetting to link UP.** Authority funnels up via internal links — every sub_pillar must link to its pillar.
- **Generic conclusions.** End with a specific next step that ties back to the cluster: link to the pillar, suggest a long_tail, or reference a tool.
