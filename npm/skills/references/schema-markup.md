# Schema Markup Library

JSON-LD is the recommended format. Embed in `<script type="application/ld+json">` tags in `<head>`. The article frontmatter `json_ld` array becomes one or more `<script>` tags at render time.

## Recommended Schema by Page Type

| Page type | Required | Add when relevant |
|---|---|---|
| Pillar article | `Article` | `FAQPage`, `HowTo` |
| Sub-pillar article | `Article` | `FAQPage`, `HowTo` |
| Long-tail article | `Article` | `HowTo` |
| Landing page (homepage / about) | `Organization` | `WebSite`, `BreadcrumbList` |
| Landing page (pricing / product) | `Product` + `Offer` | `AggregateRating`, `Review` |
| Landing page (SaaS feature) | `SoftwareApplication` | `Offer` |
| FAQ page | `FAQPage` | — |
| Glossary entry | `Article` + `DefinedTerm` | — |
| Programmatic listing | `ItemList` | `Product`, `Organization`, `Place` per item |
| Local business / location | `LocalBusiness` (or specific subtype) | `OpeningHoursSpecification`, `GeoCoordinates` |
| Recipe (rare for SaaS — included for completeness) | `Recipe` | — |

## Article Schema Templates

### Article (default for blog content)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Complete Technical SEO Guide for 2026",
  "author": {
    "@type": "Person",
    "name": "Jane Doe",
    "url": "https://example.com/authors/jane"
  },
  "datePublished": "2026-04-27",
  "dateModified": "2026-04-27",
  "image": "https://example.com/blog/technical-seo-guide/hero.png",
  "publisher": {
    "@type": "Organization",
    "name": "Acme",
    "logo": {
      "@type": "ImageObject",
      "url": "https://example.com/logo.png"
    }
  },
  "mainEntityOfPage": "https://example.com/blog/technical-seo-guide"
}
```

Required: `headline`, `author`, `datePublished`, `dateModified`, `image`, `publisher.logo`. Missing any of these and Google may reject the rich result.

### FAQPage (add to articles with FAQ sections)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is technical SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Technical SEO is the practice of optimizing a website's infrastructure so search engines can crawl, render, and index it efficiently. It covers crawlability, indexation, site speed, schema markup, and AI search readiness."
      }
    },
    {
      "@type": "Question",
      "name": "How is technical SEO different from on-page SEO?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Technical SEO covers infrastructure (crawl, render, index, speed). On-page SEO covers content and HTML structure (titles, meta, headings, keywords, internal links). Both matter; they target different layers."
      }
    }
  ]
}
```

The `Answer.text` should be the actual paragraph from the article — Google flags mismatches.

### HowTo (add to step-by-step content)

```json
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Submit a Sitemap to Google Search Console",
  "description": "Step-by-step guide to submitting your sitemap.xml to Google Search Console.",
  "totalTime": "PT5M",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Open Google Search Console",
      "text": "Sign in to Google Search Console at search.google.com/search-console.",
      "url": "https://example.com/blog/submit-sitemap-gsc#step-1"
    },
    {
      "@type": "HowToStep",
      "name": "Navigate to Sitemaps",
      "text": "In the left sidebar, click 'Sitemaps' under the 'Indexing' section.",
      "url": "https://example.com/blog/submit-sitemap-gsc#step-2"
    }
  ]
}
```

Each step's `url` should be a fragment link to that step's heading on the article page. Use anchor IDs.

## Landing Page Schema Templates

### Organization (homepage)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Acme",
  "url": "https://acme.com",
  "logo": "https://acme.com/logo.png",
  "description": "Acme builds invoicing software for freelancers and small businesses.",
  "foundingDate": "2024",
  "sameAs": [
    "https://twitter.com/acme",
    "https://linkedin.com/company/acme",
    "https://github.com/acme"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "support@acme.com"
  }
}
```

### WebSite (homepage — for sitelinks search box)

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://acme.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://acme.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### Product (pricing / product page)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Acme Pro",
  "description": "...",
  "brand": { "@type": "Brand", "name": "Acme" },
  "offers": [
    {
      "@type": "Offer",
      "name": "Starter",
      "price": "29",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://acme.com/pricing#starter"
    },
    {
      "@type": "Offer",
      "name": "Pro",
      "price": "79",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "url": "https://acme.com/pricing#pro"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "127"
  }
}
```

Only include `aggregateRating` if you have real review data — Google will manually penalize fake ratings.

### SoftwareApplication (SaaS feature page)

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Acme",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "29",
    "priceCurrency": "USD"
  }
}
```

### LocalBusiness (location page)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Acme Plumbing — Chicago",
  "image": "https://acme.com/locations/chicago.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main St",
    "addressLocality": "Chicago",
    "addressRegion": "IL",
    "postalCode": "60601",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "41.8781",
    "longitude": "-87.6298"
  },
  "telephone": "+1-555-0100",
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "18:00"
    }
  ]
}
```

Specific subtypes (`Restaurant`, `Plumber`, `Dentist`, etc.) win over generic `LocalBusiness` if your business fits one. See https://schema.org/LocalBusiness for the list.

## Cross-Cutting Schemas

### BreadcrumbList (every non-homepage page)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://acme.com" },
    { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://acme.com/blog" },
    { "@type": "ListItem", "position": 3, "name": "Technical SEO Guide", "item": "https://acme.com/blog/technical-seo-guide" }
  ]
}
```

### DefinedTerm (glossary entries)

```json
{
  "@context": "https://schema.org",
  "@type": "DefinedTerm",
  "name": "Crawl Budget",
  "description": "The number of pages a search engine crawler will fetch from a site within a given timeframe.",
  "inDefinedTermSet": {
    "@type": "DefinedTermSet",
    "name": "Acme SEO Glossary"
  },
  "url": "https://acme.com/glossary/crawl-budget"
}
```

## Validation

Always tell users to test before deploying:
- **Rich Results Test**: https://search.google.com/test/rich-results — checks if Google can parse the markup and which rich-result types it qualifies for
- **Schema Validator**: https://validator.schema.org — checks pure schema.org compliance
- Both tools accept either a URL or pasted code

Common validation errors:
- Missing required fields (`Article` requires `image`, `Product` requires `offers` with `price`)
- Invalid date formats (use ISO 8601: `2026-04-27` or `2026-04-27T10:00:00Z`)
- Wrong type for a field (`price` must be a string, not a number, in JSON-LD)
- Mismatched content (FAQ schema's `Answer.text` doesn't match the visible page text)

## When Multiple Schema Types Apply

A pillar article with FAQs and step-by-step instructions can have all three:
```yaml
json_ld:
  - "@type": Article
    ...
  - "@type": FAQPage
    ...
  - "@type": HowTo
    ...
```

Each renders as a separate `<script type="application/ld+json">` tag. Multiple types on one page is supported and recommended.
