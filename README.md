# SEOAgent

**A persistent AI SEO agent for Claude Code.** Audits your site, builds keyword strategy, plans content, and writes optimized articles — all persisted across sessions in `.seoagent/`.

## Why SEOAgent?

If you use [marketingskills](https://github.com/coreyhaines31/marketingskills) for SEO, you know the pain: every session starts from scratch. Your audit findings vanish. Your content strategy disappears. Claude forgets everything between conversations.

SEOAgent fixes this with one unified skill that persists all work:

| | marketingskills | SEOAgent |
|---|---|---|
| **State** | Stateless — every session starts over | Persistent `.seoagent/` directory across sessions |
| **Workflow** | 6 separate skills, no shared context | 1 unified workflow: audit → strategize → plan → write → monitor |
| **Output** | Unstructured chat text | Structured JSON + human-readable markdown files |
| **Execution** | Advisory — Claude audits differently each time | Protocols — consistent, comparable results |
| **Continuity** | None | Roadmap compounds over time, changelog tracks progress |

## Quick Start

```bash
npx seoagent init
```

This creates a `.seoagent/` project directory and installs the SEOAgent skill file. Then open Claude Code and ask:

- "Audit my site"
- "Create an SEO strategy for my site"
- "Write the next article from my briefs"
- "What should I work on next?" (reads your roadmap)

Every action saves results to `.seoagent/` so your next session picks up where you left off.

## What You Get (Free, No Account)

**Technical SEO Audit** — Claude fetches your pages and runs a structured audit: meta tags, headings, internal links, Core Web Vitals, schema readiness, AI search optimization. Findings saved with severity scores to `.seoagent/audit/latest.json`.

**Keyword Strategy** — Claude researches your niche with `web_search`, identifies competitor gaps, builds topic clusters with pillar/subtopic hierarchy. Strategy saved to `.seoagent/strategy/clusters/`.

**Content Briefs** — Detailed briefs with target keywords, competitor analysis, outlines, word count targets, and internal linking plans. Saved to `.seoagent/briefs/`.

**SEO-Optimized Articles** — Articles written from briefs following keyword placement rules, heading structure, AI search extractability guidelines. Saved to `.seoagent/content/`.

**Compounding Roadmap** — Prioritized action plan that updates after every action. Saved to `.seoagent/roadmap.md`.

## Project Structure

```
.seoagent/
  project.json              # Your domain, site type, goals
  audit/
    latest.json             # Most recent audit with severity-scored findings
    issues.json             # Open issues grouped by severity
  strategy/
    discovery.json          # Strategy summary
    clusters/
      {cluster}.json        # Topic clusters with article roles
  briefs/
    {article}.json          # Content briefs with outlines and keyword targets
  content/
    inventory.json          # All articles with status
    {article}.md            # Written articles with frontmatter
  roadmap.md                # Prioritized next steps (human-readable)
  changelog.md              # History of all SEO work
```

## Commands

```bash
seoagent init      # Create .seoagent/ project and install skill file
seoagent status    # Show project state summary
seoagent upgrade   # Open SEOAgent Cloud pricing page
```

## SEOAgent Cloud

The free skill handles audits, strategy, and writing using Claude's native capabilities. For teams and production SEO, [SEOAgent Cloud](https://seoagent.com/pricing?ref=readme) adds:

- **Deep crawling** — JavaScript-rendered site crawling with Firecrawl (finds issues in SPAs)
- **Real keyword data** — Actual search volumes, difficulty scores, and SERP features
- **AI-generated articles** — Rich articles with images, video, and schema markup
- **Autopilot publishing** — Up to 1 article/day published to your CMS automatically
- **CMS integration** — WordPress, Ghost, Webflow, Shopify, and more
- **GSC integration** — Real clicks, impressions, CTR, and position tracking
- **Team collaboration** — Invite members, share strategy, coordinate publishing

## How It Works

SEOAgent installs a ~350-line skill file that teaches Claude structured SEO protocols. Unlike advisory skills that give general guidance, SEOAgent prescribes exact execution steps, JSON schemas for output, and scoring formulas for prioritization.

The `.seoagent/` directory is the shared state. Every action reads prior work and writes new results. Your audit informs your strategy. Your strategy generates briefs. Your briefs produce articles. Your roadmap tracks it all.

## License

MIT
