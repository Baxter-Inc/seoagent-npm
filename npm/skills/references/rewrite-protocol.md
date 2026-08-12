# Rewrite & Refresh Protocol (Phase 4b)

When to rewrite an existing article instead of writing a new one. The single most-asked feature in SEO content workflows: "update my existing post."

## When to Rewrite

Strong signals an article needs a refresh:

1. **Stats / facts > 18 months old** — readers and search engines penalize stale data
2. **Ranking dropped** — used to be on page 1, now on page 3+
3. **Search intent shifted** — Google's SERP for the keyword now shows different content types
4. **Competitor content is now stronger** — newer competitors cover what you missed
5. **Cluster expanded** — new sub_pillars exist that the pillar should reference
6. **Tone drift** — the article doesn't match the current `context.md` brand voice
7. **User explicitly asks** — "rewrite this", "update this post", "refresh the homepage"

If none of these are true: don't rewrite. Refreshing for the sake of it can hurt rankings (Google sees disruptive changes to ranking pages).

## Procedure

### Step 1: Identify the Target

If the user gives a slug, file path, or URL:
- Read `.seoagent/content/{slug}.md` if it's a SEOAgent-generated article
- WebFetch the live URL if it's not in `.seoagent/`
- If neither — ask the user where the source of truth is

### Step 2: Read Context

Before any edits, read:
- `.seoagent/context.md` — current brand voice, banned topics, audience
- `.seoagent/strategy/clusters/{cluster}.md` — the article's role and link graph
- `.seoagent/briefs/{slug}.md` if it exists — the original brief
- `references/writing-rules.md` — the prose rules, especially its **"Editing existing content"** section (voice preservation, minimum effective edit)

### Step 3: Diagnose the Gaps

Run a structured diagnosis. Use this exact template — output it to the user before editing:

```markdown
## 🔍 Refresh Diagnosis — {slug}

### Stale Content
- {stat or fact} — currently says "X (2024 data)", should be updated
- {section} — references discontinued tool / outdated framework

### Missing Coverage
- New sub_pillar exists in cluster: {sub_pillar} — pillar should link to it
- Top-3 competitor now covers {topic}; we don't

### Structural Issues
- {observation about hierarchy, AI extractability, etc.}

### Tone & Voice
- {observation if context.md has shifted since article was written}

### What's Working (Preserve)
- {section} ranks well; keep largely intact
- {section} has good backlinks per current analysis

## Plan (Y/N)
1. Update {N} stats with 2026 figures
2. Add new H2: "{section title}" linking to {sub_pillar}
3. Tighten {section} — currently {old word count}, target {new word count}
4. Refresh hero image alt text + add OG card
```

Wait for user confirmation before executing.

### Step 4: Execute the Rewrite

Rules:
- **Preserve the URL slug.** Never change `slug` — even if the title changes, the URL stays.
- **Preserve sections that rank.** If a section is the page's strongest signal, keep its core wording.
- **Preserve the voice.** Follow `references/writing-rules.md` § "Editing existing content": note the article's voice signals before editing, make the minimum effective edit, remove slop patterns without flattening distinctive sentences, and never invent claims or stats the original didn't have.
- **Use `Edit`, not `Write`.** Edit one section at a time so changes are reviewable.
- **Update `dateModified`** in JSON-LD. Don't change `datePublished` — that resets ranking signal.
- **Bump `version`** in frontmatter (1 → 2 → 3).

### Step 5: Update the Frontmatter

```yaml
---
slug: tech-seo-guide
page_type: pillar
title: "The Complete Technical SEO Guide for 2026"   # year may update
status: drafted
created_at: 2024-01-15T10:00:00Z                     # NEVER change
updated_at: 2026-04-27T10:00:00Z                     # update this
version: 3                                            # bump
word_count: 3450                                      # update if changed
---
```

Add to JSON-LD:
```json
{
  "@type": "Article",
  "datePublished": "2024-01-15",
  "dateModified": "2026-04-27"
}
```

Both dates in the schema. Google uses `dateModified` to know freshness without resetting ranking signal.

### Step 5b: Optional Visual Review

In interactive sessions, offer to open the rewritten article with the visual review loop (`references/draft-review.md`): the user fixes small things directly in the browser and comments on the rest, and you apply the batch to the source. Their exact wording always wins — never revert or "improve" text they typed.

### Step 6: Update Internal Links

If the rewrite added or changed internal links:
- Update the cluster file's "Internal Linking" section
- If you added a link DOWN to a sub_pillar, also add the reverse link UP from the sub_pillar (use `Edit`)

### Step 7: Log and Sync

Append to `.seoagent/changelog.md`:
```
[2026-04-27] Rewrote tech-seo-guide v3: updated 7 stats, added "AI Search Readiness" H2 linking to ai-search-readiness sub_pillar, tightened from 3120 → 3450 words
```

Run `seoagent sync`.

## Special Cases

### Rewriting a Landing Page

Same protocol but:
- Track conversion impact — note in changelog if there's a CRO concern
- Don't ship the rewrite during a campaign in flight — coordinate with the user
- Update OG card and Twitter card alt text (often forgotten)
- Update JSON-LD `Product` / `Offer` if pricing or feature claims changed
- **Screenshot-gap pass (SaaS sites):** during the diagnosis (Step 3), scan the page for hero/feature sections that describe the product but show no real screenshot (illustration-only, stock, or empty). For each gap, capture a real product screenshot from this repo's UI per `references/screenshots.md` and fold it into the rewrite — this is how an *existing* SaaS landing page gets the screenshots it's missing.

### Rewriting Without an Existing Brief

If the article exists but `.seoagent/briefs/{slug}.md` does not:
1. Generate a brief from the live article first (Phase 3 protocol)
2. Show it to the user, confirm it represents the *intended* article
3. Then rewrite against that brief

This catches situations where the article drifted from any original spec.

### "Annual Refresh" — Updating Year References

If the user says "update for 2026" and only the year needs to change:
1. Find every `2024`, `2025` reference in the article
2. Update only the ones that genuinely refer to current-year data
3. Update `dateModified` in JSON-LD
4. Don't bump major version — this is a minor refresh

Output a brief diff summary so the user can confirm nothing else changed.

### Rewriting AI-Generated Content That Wasn't Yours

If the user wants to rewrite a post that wasn't drafted with SEOAgent (no brief, no `.seoagent/content/{slug}.md`):
1. WebFetch the live URL
2. Save a copy to `.seoagent/content/{slug}.md` with `imported_at` in frontmatter
3. Generate a brief representing the *current* article
4. Then run the diagnosis (Step 3) and rewrite

This brings the article into SEOAgent's persistence model so future refreshes have history.

## Common Pitfalls

- **Changing the URL.** Breaks backlinks, breaks rankings. Use a 301 redirect only if absolutely necessary, never silently.
- **Resetting `datePublished`.** Tells Google "this is a new article" — kills accumulated ranking signal.
- **Rewriting the entire article.** A 90% rewrite is a new article. If you're doing that, change the slug too — but accept the ranking reset.
- **Forgetting the link graph.** A pillar rewrite without updating sub_pillar links creates broken hub-and-spoke structure.
