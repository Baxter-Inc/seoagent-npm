# Landing Page Protocol

Use when writing or improving a sales / conversion / feature / pricing / homepage. Different from blog content — landing pages are conversion-focused, not authority-focused.

## When to Use

- The user asks for a homepage, feature page, pricing page, product page, or campaign landing page
- The brief has `page_type: landing`
- The URL pattern is `/`, `/{feature-name}`, `/pricing`, `/about`, `/{product-slug}` (NOT under `/blog/` or `/docs/`)

## URL & Slug Rules

- Homepage: `/`
- Feature pages: `/{feature}` — single-word or hyphenated, e.g. `/integrations`, `/case-studies`
- Pricing: `/pricing` — never `/plans-and-pricing` or other variants
- Product/feature subpages: `/{parent}/{child}` only when there is a real parent-child relationship in the IA. Otherwise flat.
- No dates, no IDs, no parameters in the slug

## Word Count Target

800–1500 words. Conversion pages are scannable, not exhaustive. If you're writing more than 1500 words, you're writing a guide — consider whether this should be a pillar article instead.

## Section Ordering (in order)

1. **Hero** — H1 with primary value prop, supporting subheadline, primary CTA, hero image/video
2. **Social proof bar** — logos of customers, press mentions, or aggregate metrics ("Trusted by 10,000+ teams")
3. **Problem / pain** — 2-3 sentences on the pain the visitor has, in their own language
4. **Solution / benefits** — 3-5 benefit blocks (icon, headline, 1-2 sentence body)
5. **How it works** — 3-step visual breakdown of the core flow
6. **Feature deep dives** — 2-4 feature sections with screenshots
7. **Detailed social proof** — testimonials with name, role, company, photo
8. **Objection handling** — FAQ section addressing top 5 objections
9. **Final CTA** — restated value prop + primary CTA + secondary CTA (e.g. "see demo")

Not every landing page needs all 9. Homepage and pricing keep all. Feature pages can drop sections 5 and 7 if redundant.

## Heading Structure

- One H1 — the primary value prop (NOT the product name)
- H2s for each major section
- H3s within sections for sub-points
- No H4+ unless critical — if you need depth, the page is too long

## Headline Formulas (in order of preference)

1. **Outcome + audience**: "Ship better SEO content, faster, for indie hackers."
2. **Time/effort save**: "Get to first ranking in 4 weeks instead of 6 months."
3. **Transformation**: "From manual SEO checklists to a persistent agent that compounds."
4. Avoid: "The {category} platform for {audience}" (generic), "Welcome to..." (no value), feature-listing headlines

## Copywriting Rules

- **Customer language over company language** — write what customers say, not what marketing says
- **Benefits over features** — "ship 3x faster" not "AI-powered automation"
- **Specificity over vagueness** — "in 4 weeks" not "quickly"; "10,000 teams" not "many teams"
- **One idea per paragraph** — if you can't summarize the paragraph in one sentence, split it
- **Active voice** — "Claude audits your site" not "Your site is audited by Claude"
- **No filler** — strike: "in today's digital landscape", "it's important to note", "when it comes to", "leverage", "robust", "streamline", "delve"

## Internal Linking

Landing pages **don't follow hub-and-spoke**. They link contextually to:
- Related landing pages (homepage → pricing, features → integrations)
- Top-of-funnel content (homepage → cluster pillar articles, e.g. "how to do X")
- Conversion pages (every page → pricing or signup)

Avoid linking to the blog from above-the-fold sections — keeps focus on conversion.

## Metadata Defaults

```yaml
title: "{Product}: {primary value prop} | {Brand}"          # 50-60 chars
meta_title: "{Action verb} {outcome} — {Brand}"             # alternative
meta_description: "{Outcome} in {timeframe}. {social proof or differentiator}. {CTA-implied}." # 150-160 chars
canonical: "https://{domain}/{slug}"
og:
  title: "{shorter, punchier than meta_title}"
  description: "{first sentence of hero subhead}"
  image_alt: "{describe the OG image scene}"
twitter:
  card: summary_large_image
```

## JSON-LD Schema

Pick by page type:

**Homepage / About** → `Organization`
```json
{
  "@type": "Organization",
  "name": "Acme",
  "url": "https://acme.com",
  "logo": "https://acme.com/logo.png",
  "sameAs": ["https://twitter.com/acme", "https://linkedin.com/company/acme"]
}
```

**Pricing / Product** → `Product` + `Offer`
```json
{
  "@type": "Product",
  "name": "Acme Pro",
  "description": "...",
  "offers": [
    { "@type": "Offer", "price": "29", "priceCurrency": "USD", "availability": "https://schema.org/InStock" }
  ]
}
```

**SaaS feature** → `SoftwareApplication`
```json
{
  "@type": "SoftwareApplication",
  "name": "Acme",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": { "@type": "Offer", "price": "29", "priceCurrency": "USD" }
}
```

**FAQ section on landing page** → also add `FAQPage`
```json
{
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "...", "acceptedAnswer": { "@type": "Answer", "text": "..." } }
  ]
}
```

You can include multiple `@type` blocks in the `json_ld` frontmatter array — they all render as separate `<script type="application/ld+json">` tags.

## CTA Copy Rules

- Primary CTA: action verb + outcome — "Start free", "Get my audit", "Show me the demo"
- Avoid: "Click here", "Learn more", "Sign up" (no value), "Submit"
- Secondary CTA: lower-friction option — "See how it works", "Read the docs", "Book a call"
- Hero CTA = final CTA (consistent destination, not different)

## Images

Landing pages need:
- 1 hero image (above fold) — product screenshot, illustration, or video poster
- 2-4 feature/inline images — actual screenshots, not stock photography
- 1 OG image — branded, includes product name and value prop, 1200×630

**For a SaaS / product site, the hero + feature images should be real product screenshots — read `references/screenshots.md`** for how to capture them from the product's own code in this repo (no Playwright/paid API) and where to place them. Real UI shots out-convert AI illustrations on a SaaS landing page; only fall back to a generated image when a screenshot isn't possible.

In article frontmatter:
```yaml
images:
  hero:
    alt: "Screenshot of the SEOAgent dashboard showing a completed audit"
    prompt: "Modern SaaS dashboard, light theme, showing an audit list with green and red severity badges, clean editorial style"
  inline:
    - alt: "..."
      placement: "after H2 'How it works'"
      prompt: "..."
```

## Persistence

Even though landing pages aren't in `strategy/clusters/`, persist the content to `.seoagent/content/{slug}.md` with `page_type: landing`. Add an entry to `changelog.md`. Run `seoagent sync`.

If the user is editing an existing landing page rather than creating a new one, follow `references/rewrite-protocol.md` instead.
