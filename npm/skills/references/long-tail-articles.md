# Long-Tail Article Protocol

A long_tail is a **specific question or niche article** that funnels authority UP to its parent sub_pillar. 8-10 long_tails per cluster (2-3 under each sub_pillar). Long_tails capture high-intent, low-competition queries.

## When to Use

- Brief has `role: LONG_TAIL`
- Primary keyword is a long-tail query — usually a question or a very specific use case
- Examples: "how to fix 404 errors", "what is robots.txt", "schema markup for ecommerce category pages"

## URL & Slug Rules

- `/blog/{primary-keyword}` — flat, the same flat structure as pillar and sub_pillar
- Slug = the question or query, lowercased, hyphenated
- Examples: `/blog/how-to-fix-404-errors`, `/blog/what-is-robots-txt`
- For "how to" queries: keep "how-to" in the slug — Google rewards intent-matching slugs

## Word Count Target

800–1200 words. Direct answer first, then context. If you're padding to hit 1200, cut. If you legitimately need more than 1200, this is probably a sub_pillar.

## Title Patterns

Long_tail titles match the search query as closely as possible — searchers want the title to confirm they're in the right place.

1. **How to {do specific thing}** — `How to Fix 404 Errors`
2. **What Is {specific thing}?** — `What Is robots.txt?`
3. **{Question}?** — `Should You Use Schema Markup on Category Pages?`
4. **{specific thing} for {use case}** — `Schema Markup for Ecommerce Category Pages`

Avoid: pillar-style "complete guide" framing. The reader wants a specific answer, not comprehensiveness.

## Section Structure

Long_tails are direct. Most should follow this structure:

1. **The Direct Answer** — first paragraph after H1, 30-60 words. The complete answer to the question. AI-extractable. The reader should be able to leave after reading just this paragraph and have what they came for.
2. **Why {topic} matters / What happens if you ignore it** — H2. 100-150 words.
3. **Step-by-step / How** — H2. The substantive walkthrough. Numbered list, code blocks, screenshots.
4. **Edge Cases / Variations** — H2 (optional). Common variations on the question.
5. **Related Reading** — H2. Link to the parent sub_pillar and 1-2 sibling long_tails.

Skip TL;DR — the first paragraph IS the TL;DR. Skip FAQs unless there are genuinely 3+ related sub-questions.

## Internal Linking — Long-Tail Links UP

Read `.seoagent/strategy/clusters/{cluster-slug}.md` to identify:
- The parent SUB_PILLAR — link UP at least once, prominently. The "Related Reading" section *must* link to the parent sub_pillar.
- 1-2 sibling long_tails under the same parent sub_pillar — link sideways once

The long_tail does NOT link directly to the cluster's pillar. Authority flows through the parent sub_pillar.

Anchor text:
- Linking UP: descriptive ("for the full {topic} framework, see {sub_pillar title}")
- Linking sideways: contextual ("if you also need to {sibling topic}, here's how")

## AI Search Optimization

Long_tails are the most likely format for AI Overview citations because they directly answer specific queries. Optimize hard:

- **The first paragraph IS the answer** — full, complete, standalone.
- **Use a definition block** if the topic involves a concept: `**X is** ...`
- **Numbered steps** for "how to" content — Google's AI loves these.
- **Code blocks** with syntax highlighting for technical content.
- **Tables** for comparisons or option matrices.

Don't bury the answer behind context. Context comes second.

## Metadata Defaults

```yaml
title: "{exact long-tail query, capitalized}"
meta_title: "{Query} ({year})"                                       # often the title is fine; just trim to 60 chars
meta_description: "{One-sentence direct answer}. {What the article covers in detail}." # 150-160 chars
canonical: "https://{domain}/blog/{slug}"
og:
  title: "{Title}"
  description: "{First sentence of the direct answer}"
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
    "publisher": { ... }
  }
]
```

For "how to" long_tails, add `HowTo`:
```json
{
  "@type": "HowTo",
  "name": "How to {do thing}",
  "step": [
    { "@type": "HowToStep", "name": "Step 1", "text": "..." },
    { "@type": "HowToStep", "name": "Step 2", "text": "..." }
  ]
}
```

For "what is" long_tails, the answer paragraph already powers featured snippets — `Article` is enough.

## After Writing

1. Update the cluster file — set this long_tail's `status: drafted` in the article table.
2. **Update the parent sub_pillar** — edit it to add this long_tail to a "Read more" or "Related" section if not already present. (Use `Edit`.)
3. Append to `.seoagent/changelog.md`: `[date] Long-tail drafted: {slug} ({word_count} words)`
4. Run `seoagent sync`.

## Common Pitfalls

- **Padding to hit pillar word counts.** Long_tails are short on purpose. Trust the format.
- **Burying the answer.** First paragraph = complete answer. Always.
- **Linking to the cluster pillar directly.** Authority flows UP through the parent sub_pillar, not direct.
- **Generic title.** "Tips for fixing errors" is not a long_tail; it's nothing. The title must match the search query.
