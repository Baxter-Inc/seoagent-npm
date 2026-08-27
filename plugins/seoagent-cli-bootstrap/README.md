# SEOAgent

The persistent AI SEO agent for Claude Code. Other SEO tools write the prompt — SEOAgent runs it, on your own model, in your own repo.

This plugin is a **bootstrap**: it adds one skill that walks Claude through installing the real `seoagent` CLI from npm. The CLI then scaffolds `.seoagent/` in your project and installs the full, versioned SEOAgent skill — audits, keyword strategy, content briefs, and articles — directly into your repo.

## What you get after install

- **Technical SEO audits** — crawl errors, indexing issues, schema markup, Core Web Vitals
- **Keyword strategy** — clustering, competitor research, topic gap analysis
- **Content briefs and articles** — written by your own coding agent, into your own repo
- **Product screenshots** — captured live from your running app for use in content
- **`.seoagent/`** — a plain-markdown workspace, committed to your repo, that every surface (CLI, cloud chat, autopilot) reads and writes

## Install

Ask Claude: *"Install SEOAgent in this repo"* — this skill responds with the exact commands, or run them yourself:

```bash
npm install @seoagent-official/seoagent && npx @seoagent-official/seoagent init
```

`init` scans your `package.json` and env files to infer your domain, then creates `.seoagent/` and installs the skill at `.claude/skills/seoagent/SKILL.md`.

## Links

- [npm package](https://www.npmjs.com/package/@seoagent-official/seoagent)
- [SEOAgent.com](https://seoagent.com?ref=claude-plugin-readme)
- [Source](https://github.com/Baxter-Inc/seoagent-npm)
- [Privacy policy](https://seoagent.com/privacy)

## Publisher

Baxter Inc — contact: alec@seoagent.com

## License

MIT
