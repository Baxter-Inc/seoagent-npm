# SEOAgent plugin

SEO on autopilot for Claude Code and Codex. Installing this plugin:

- registers the SEOAgent remote MCP server (`https://seoagent.com/api/mcp`, OAuth sign-in in your browser), and
- adds the `seoagent-setup` skill. With your site's repo open, it runs `seoagent init` + `seoagent login` and hands over to the full SEOAgent skill. Without a repo, it works the SEOAgent inbox through the MCP tools.

## Install

```bash
claude plugin marketplace add Baxter-Inc/seoagent-npm && claude plugin install seoagent@seoagent-official
```

Then ask: "Set up SEOAgent for my site".

## Links

- [SEOAgent.com](https://seoagent.com?ref=claude-plugin-readme)
- [Setup guide for every agent](https://seoagent.com/agent-setup/prompt.md)
- [npm package](https://www.npmjs.com/package/@seoagent-official/seoagent)
- [Privacy policy](https://seoagent.com/privacy)

## License

MIT
