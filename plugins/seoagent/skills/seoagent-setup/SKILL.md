---
name: seoagent-setup
description: "Set up or run SEOAgent (SEO on autopilot: audits, keyword strategy, briefs, articles, technical fixes). Use when the user asks to install or set up SEOAgent, connect their site to SEOAgent, work their SEOAgent inbox, or improve their site's SEO and SEOAgent is not yet set up in this project."
---

# SEOAgent setup

SEOAgent audits a site, plans keywords, and drafts articles and fixes. It never publishes by itself: you apply the work. This plugin gives you two things: this skill, and the `seoagent` MCP server (tools such as `sites_list`, `actions_list`, `action_get`, `action_ack`). The server signs in through the user's browser. Never ask the user for a password, API key or token.

Pick ONE path.

## Path 1: the website's repo is in this workspace (preferred)

Use this when the workspace holds the source code that builds the user's website.

1. If `.seoagent/` already exists at the repo root, skip to step 4.
2. Run at the repo root: `npx -y @seoagent-official/seoagent@latest init --yes`. It prints where it installed the full SEOAgent skill.
3. Run: `npx -y @seoagent-official/seoagent@latest login`. It opens a browser page; tell the user to sign in or create an account. Wait for "Logged in".
4. Read the full skill file that `init` installed (the path it printed; usually `.claude/skills/seoagent/SKILL.md`) and follow it from "Session start". From here the full skill is the authority, not this one.

The repo path does more than the connector: deep crawl audits, and articles written straight into the repo and tracked.

## Path 2: no repo here

Use the `seoagent` MCP tools. If they are not connected yet, run `/mcp`, choose `seoagent`, and let the user sign in.

1. `sites_list`. If the user's site is not listed, `site_add` with the domain the user named. Never add a domain the user did not name.
2. `actions_list` for the site. A new site gets a free 7-day Autopilot trial; autopilot queues its first work within 6 hours, so an empty list at first is normal. Meanwhile `content_ideas_suggest` and `keywords_strategy_get` work after about a minute.
3. For each action: `action_get`, apply it with the tools you have (a git, CMS or store connector), then `action_ack` with outcome `completed` (and the published URL) or `declined` with a reason. If you cannot apply it, give the user the exact change and leave the action pending.

If you find the site's repo later, switch to Path 1.

## Links

- Setup guide for every agent: https://seoagent.com/agent-setup/prompt.md
- Docs: https://seoagent.com/docs
