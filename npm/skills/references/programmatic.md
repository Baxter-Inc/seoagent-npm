# Programmatic SEO Protocol

Programmatic SEO is template-driven scale: one template + a dataset → hundreds or thousands of pages targeting long-tail keyword variations. Done well, it captures real search demand at scale. Done badly, it's thin-content spam that gets penalized.

## Core Rules (apply to every programmatic project)

1. **Every page must provide unique value.** Just swapping `{city}` in a template is thin content. Each page needs at least one piece of data that *only* this page can show.
2. **Proprietary data > public data.** "Best restaurants in {city}" using public Google data → already done. "Average response time of plumbers in {city}, based on our 50,000-job dataset" → unique.
3. **Internal linking prevents orphaning.** Every programmatic page must link to at least 3 other programmatic pages in the same set + 1 hub page.
4. **Match real search intent.** Run WebSearch on 5-10 sample queries before building. If the SERP is dominated by aggregators or directories, you may have a shot. If it's dominated by Wikipedia or government sites, skip.
5. **Quality > quantity.** 200 great pages beat 5,000 thin ones. Google's site-quality signals are aggregated — thin programmatic pages drag down your whole domain.

## The 12 Programmatic Playbooks

### 1. Comparison Pages
Pattern: `/{tool-a}-vs-{tool-b}` (e.g. `/notion-vs-airtable`)
Data needed: features matrix, pricing, use cases, reviews per tool
Search intent: high-intent, decision stage
Word count: 1500-2500
Schema: `Product` per tool + `ItemList` of comparison points
Example: G2's comparison pages, Capterra, Webflow's "Webflow vs X" pages

### 2. Alternative Pages
Pattern: `/{tool}-alternatives` (e.g. `/zapier-alternatives`)
Data needed: list of 5-15 alternatives with key differentiators per
Search intent: competitor research
Word count: 2000-3000
Schema: `ItemList` with each alternative as a `Product`
Critical: don't just list competitors; explain WHY someone should choose each one

### 3. Use Case Pages
Pattern: `/{tool}-for-{use-case}` (e.g. `/airtable-for-project-management`)
Data needed: tool capabilities, use-case-specific workflow, sample template
Search intent: evaluating fit
Word count: 1200-1800
Best when: you have a real example or template to share

### 4. Integration Pages
Pattern: `/integrations/{tool}` or `/{your-tool}-{their-tool}-integration`
Data needed: setup steps, common workflows, example automations
Search intent: people Google "{your tool} {other tool}" to verify integration exists
Word count: 800-1200
Schema: `HowTo` for the setup walkthrough
Each integration needs: setup steps, common workflows, an FAQ on quirks

### 5. Location Pages
Pattern: `/{service}-{city}` or `/{tool}/cities/{city}`
Data needed: location-specific stats, local examples, location-relevant pricing
Search intent: local-intent searches ("plumber chicago")
Word count: 600-1000
Critical: needs Local Business schema with address, geo coordinates, hours
Risk: highest spam risk — make sure each page genuinely has unique local content

### 6. Industry / Persona Pages
Pattern: `/for/{industry}` or `/{tool}-for-{persona}`
Data needed: industry-specific use cases, customers in that vertical, ROI metrics specific to that vertical
Search intent: SaaS evaluation by industry
Word count: 1000-1500

### 7. Glossary Entries
Pattern: `/glossary/{term}` or `/{topic}/{term}`
Data needed: clear definition, examples, related terms
Search intent: informational, AI-search-friendly
Word count: 400-800 (shorter than long_tails)
Schema: `DefinedTerm` + `Article`
Build at scale once: 50-100 terms in your domain's vocabulary

### 8. Listing / Directory Pages
Pattern: `/{category}/{location-or-attribute}` (e.g. `/best-{tool}-for-{use-case}`)
Data needed: curated list of items with structured data per item
Search intent: "best X" searches
Word count: 1500-3000 (mostly structured)
Schema: `ItemList`

### 9. Calculator / Tool Pages
Pattern: `/{topic}-calculator` or `/{tool}-calculator`
Data needed: a working calculator + explanatory content
Search intent: high — the calculator IS the value
Word count: 600-1000 of explainer copy alongside the tool
Best programmatic format: the tool itself is unique value per page

### 10. Template / Example Pages
Pattern: `/templates/{template-slug}`
Data needed: a downloadable or copyable template + use case explanation
Search intent: people Googling "{x} template"
Word count: 500-1000
Schema: `CreativeWork` or specific subtype

### 11. Profile / Listing-of-Things Pages
Pattern: `/companies/{company}` or `/people/{person}` or `/products/{product}`
Data needed: structured profile with proprietary data
Search intent: branded searches for individual entities
Word count: 800-1500 with structured data carrying weight
Schema: `Organization`, `Person`, or `Product` as appropriate

### 12. Translated Pages
Pattern: `/{lang}/{slug}` or subdomain
Data needed: properly translated content (not machine-translated boilerplate)
Search intent: language-specific search demand
Critical: machine translation is detected by Google. Use professional translation or skip.
Schema: hreflang tags + canonical

## Choosing a Playbook

Match the playbook to your assets:
- **Have unique data?** → Listing pages (#8), Profile pages (#11), Comparison pages (#1)
- **Have a tool?** → Calculator pages (#9), Integration pages (#4)
- **Have customers in many segments?** → Industry pages (#6), Use case pages (#3)
- **Have many integrations?** → Integration pages (#4)
- **Have geographic relevance?** → Location pages (#5) (with caution)

You can combine playbooks: comparison pages × industry → `/{tool-a}-vs-{tool-b}-for-{industry}`. Be selective — combinatorial explosions create thin content fast.

## Implementation Framework

1. **Keyword Pattern Research**
   - Run WebSearch on 5-10 sample queries that fit the pattern
   - Identify search volume signals (autocomplete, "people also ask")
   - Confirm the SERP isn't dominated by Wikipedia or government sites
2. **Data Source**
   - Identify your data source. Is it proprietary? Public-but-aggregated? User-generated?
   - Each page needs at least one *unique* data point
3. **Template Design**
   - Mock up the template with a real example. Is it 600+ words of actual content per page?
   - Design the URL pattern. Flat is better than nested.
4. **Internal Linking Strategy**
   - Plan the hub page (a category index)
   - Plan how programmatic pages link to each other (related, alternatives)
5. **Build a Pilot Set**
   - Build 10-20 pages first. Wait 4-8 weeks. Check rankings.
   - If those rank, scale up. If they don't, diagnose before building 1,000.
6. **Sitemap & Indexation**
   - Submit programmatic pages in a separate sitemap so you can monitor indexation rate
   - If <50% are indexed after 8 weeks, you have a quality problem — Google is rejecting them
7. **Monitor and Prune**
   - Pages ranking on positions 50+ after 6 months are dragging down site quality
   - Either improve them or `noindex` them

## When NOT to Build Programmatic

- The SERP is owned by Wikipedia, government, or huge brands → skip
- You don't have unique data → skip (or get unique data first)
- Your dataset has gaps that produce empty/thin pages → tighten the dataset first
- Your domain is new (< 6 months old) → focus on traditional content first

## After Building

1. Add a hub page that lists all programmatic pages with internal linking
2. Submit a dedicated sitemap to Google Search Console
3. Track indexation rate weekly for the first 8 weeks
4. Persist the pattern to `.seoagent/strategy/clusters/programmatic-{pattern}.md` so the agent knows about it next session

## Persistence

Programmatic pages get saved to `.seoagent/content/programmatic/{slug}.md` with `page_type: programmatic`. The cluster file in `strategy/clusters/` tracks the pattern (template) and the URL list.
