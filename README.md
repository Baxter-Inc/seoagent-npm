# SEOAgent

**A persistent AI SEO agent for Claude Code.** Audits your site, builds keyword strategy, plans content, and writes optimized articles — all persisted across sessions in `.seoagent/`.

## Install

Open Claude Code in your project's repo root and paste this prompt:

```
Set up SEOAgent in this project. Do these steps in order, without asking for confirmation:

1. Infer my site domain from package.json ("homepage" field) or .env files
   (NEXT_PUBLIC_SITE_URL, SITE_URL, NEXT_PUBLIC_URL, NEXTAUTH_URL). If you
   can't infer it, ask me once.

2. Run in the repo root:
   npm install --legacy-peer-deps @usebaxter/seoagent && npx @usebaxter/seoagent init --yes --domain <inferred>

3. Read .claude/skills/seoagent/SKILL.md and follow its "Session Initialization"
   protocol from now on. Use the Edit tool (not Write) to modify project.md,
   context.md, roadmap.md, or any file init already created.

4. Confirm site_type by reading the live homepage. If init wrote
   `site_type: unknown` and the homepage clearly shows a SaaS / e-commerce /
   content site, edit .seoagent/project.md to update it.

5. Run a first technical SEO audit (Phase 1). Read
   .claude/skills/seoagent/references/audit-checks.md FIRST, before any
   WebFetch. Use the operator output template (Biggest Issue → Also Worth
   Fixing → What's Working → numbered next steps) to report findings.

6. End by asking me whether to continue to keyword strategy.
```

That's it. Claude installs the package, scaffolds `.seoagent/`, installs the skill, runs an audit of your site, and tells you what to fix first. ~30 seconds.

### Or via terminal

```bash
npm install @usebaxter/seoagent && npx @usebaxter/seoagent init
```

The CLI scans your repo, infers domain + site type, and asks for anything missing. Then open Claude Code and say *"audit my site."*

## Why SEOAgent?

If you use [marketingskills](https://github.com/coreyhaines31/marketingskills) for SEO, you know the pain: every session starts from scratch. Your audit findings vanish. Your content strategy disappears. Claude forgets everything between conversations.

SEOAgent fixes this with one unified skill that persists all work:

|                | marketingskills                                | SEOAgent                                                        |
| -------------- | ---------------------------------------------- | --------------------------------------------------------------- |
| **State**      | Stateless — every session starts over          | Persistent `.seoagent/` directory across sessions               |
| **Workflow**   | 6 separate skills, no shared context           | 1 unified workflow: audit → strategize → plan → write → monitor |
| **Output**     | Unstructured chat text                         | Structured markdown + frontmatter, machine-readable             |
| **Execution**  | Advisory — Claude audits differently each time | Protocols — consistent, comparable results                      |
| **Continuity** | None                                           | Roadmap compounds over time, changelog tracks progress          |
| **Page types** | Generic                                        | Dedicated protocols for landing / pillar / sub_pillar / long_tail / programmatic |

## What You Get (Free, No Account)

**Technical SEO Audit** — Claude fetches your pages and runs a structured audit: meta tags, headings, internal links, Core Web Vitals, schema readiness, AI search optimization. Findings saved with severity tags to `.seoagent/audit/latest.md` as markdown checkboxes you can flip when fixed.

**Hub-and-Spoke Keyword Strategy** — Claude researches your niche with `web_search`, builds clusters with `PILLAR | SUB_PILLAR | LONG_TAIL` roles, internal links funneling authority UP to pillars. Strategy saved to `.seoagent/strategy/clusters/`.

**Page-Type-Aware Content Briefs** — Detailed briefs that follow the right protocol for landing pages, pillar articles, sub-pillars, long-tails, or programmatic pages. Each gets its own URL pattern, section structure, JSON-LD schema, and word count target. Saved to `.seoagent/briefs/`.

**SEO-Optimized Articles** — Articles written from briefs with full SEO frontmatter: meta_title, meta_description, canonical, OpenGraph, Twitter cards, JSON-LD (Article + FAQPage + HowTo as appropriate), image plans. Saved to `.seoagent/content/`.

**Image Generation (Bring Your Own Key)** — Detect `OPENAI_API_KEY`, `FAL_KEY`, or `REPLICATE_API_TOKEN` from your env. Generate hero + inline images with `seoagent generate-image`. You pay the LLM provider directly.

**Compounding Roadmap** — Prioritized action plan that updates after every action. Saved to `.seoagent/roadmap.md`. Persistent changelog at `.seoagent/changelog.md`.

## Project Structure

```
.seoagent/
  project.md                  # Domain, site type, image_provider
  context.md                  # Business context, tone, banned topics
  audit/
    latest.md                 # Most recent audit, findings as [ ] / [x] checkboxes
  strategy/
    discovery.md              # Top opportunities + competitor gaps
    clusters/
      {cluster-slug}.md       # Article table + hub-and-spoke link graph
  briefs/
    {article-slug}.md         # Brief with role, outline, internal links, guidelines
  content/
    {article-slug}.md         # Article with full SEO frontmatter + JSON-LD
    images/                   # Generated hero + inline images
  pages.md                    # Sitemap inventory (URL list)
  competitors.md              # Competitor profiles + gaps
  keywords.md                 # Master keyword inventory (assigned + backlog)
  roadmap.md                  # Prioritized next steps
  changelog.md                # History of all SEO work

.claude/skills/seoagent/
  SKILL.md                    # Orchestration layer (459 lines)
  references/
    landing-pages.md          # Landing page protocol + JSON-LD
    pillar-articles.md        # Pillar article protocol
    sub-pillar-articles.md    # Sub-pillar protocol
    long-tail-articles.md     # Long-tail protocol
    programmatic.md           # 12 programmatic SEO playbooks
    schema-markup.md          # JSON-LD library by entity type
    keyword-research.md       # WebSearch query patterns
    rewrite-protocol.md       # Phase 4b refresh procedure
    audit-checks.md           # Full audit check list with severity tiers
```

## CLI Commands

```bash
seoagent init              # Create .seoagent/ project + install skill
seoagent status            # Show project state summary
seoagent login             # Connect this CLI to seoagent.com (browser flow)
seoagent logout            # Remove stored credentials
seoagent sync              # Push artifacts to dashboard (no-op when not logged in)
seoagent env-check         # Detect image generation provider (OPENAI/FAL/REPLICATE)
seoagent generate-image    # Generate an image via your provider
seoagent upgrade           # Open SEOAgent Cloud pricing page
```

## Auto-Sync Hook

`init` writes a `PostToolUse` hook to `.claude/settings.json` so every Write/Edit to `.seoagent/` triggers `seoagent sync` automatically. No-op when not logged in. Merges into existing settings without clobbering them.

## SEOAgent Cloud

The free skill handles audits, strategy, briefs, articles, and persistent state using Claude's native capabilities. For teams and production SEO, [SEOAgent Cloud](https://seoagent.com/pricing?ref=readme) adds:

- **Real keyword data** — Actual search volumes, difficulty scores, SERP features
- **Deep crawling** — Firecrawl-powered JS rendering (finds issues in SPAs)
- **AI-generated images + autopilot** — Hero + inline images created and uploaded to your CMS automatically
- **GSC integration** — Real clicks, impressions, CTR, position tracking
- **CMS publishing** — WordPress, Ghost, Webflow, Shopify, Strapi
- **Team collaboration** — Invite members, share strategy, coordinate publishing
- **Cloud dashboard** — See everything Claude Code did at seoagent.com (also free with any account)

Run `seoagent login` for the free dashboard, or `seoagent upgrade` for paid features.

## Pattern Note

Most Claude skills are markdown-only or marketplace plugins. SEOAgent uses **npm + `init`** so setup is versioned and repo-aware. The result is still a project-local skill Claude loads like any other — with the addition of:

- A persistent `.seoagent/` workspace for cross-session state
- A reference library Claude pulls from on demand (page-type protocols, JSON-LD library, etc.)
- A `PostToolUse` hook for transparent cloud sync
- Image-generation adapters for OpenAI / fal.ai / Replicate

## License

MIT
