# Processing the SEOAgent Inbox

`seoagent sync` pulls **pending actions** from the dashboard into `.seoagent/inbox/`. These are autonomous decisions the cloud has made that need a human (or you, the AI agent) to apply in the user's local repo. Run `seoagent inbox` (or `--json`) to list them; each inbox file's body carries its own instructions too.

**Golden rules (these also live in the skill body):**

- **Never delete a file without explicit user confirmation on the first destructive action of the session.** Auto-prune is conservative (requires <5 clicks in 90 days, zero inbound internal links, etc.) but it can still surprise the user. Show them what's about to go. Technical-fix actions edit an existing page rather than delete, so they only need a diff review, not a destructive-action confirmation.
- Acknowledge every action you finish: `seoagent ack <action_id>` (or `seoagent ack <action_id> --failed --reason "..."` to decline). That marks it `completed` on the dashboard and removes the inbox file on the next sync.
- After processing, run `seoagent sync` once more to clean stale inbox files, then report a summary: how many applied, how many declined (and why).
- **Close with the cloud-first option, not local planning.** On a connected workspace option 3 of the output template is `Run seoagent sync and process the inbox` (or, when the inbox is empty, the next unwritten brief the sync named). **Never offer "Plan content strategy" here** — keyword research and briefs are the cloud's job on a connected workspace (`references/cloud-cta.md` § Cloud-connected mode).

## Action types

| Type | What it is | Risk |
|---|---|---|
| `cli_prune_pending` | Auto-prune decided an underperforming article should be removed from the repo | **Destructive — confirm first** |
| `cli_technical_fix` | Open technical-SEO issue (meta, schema, canonical, internal linking, …) to fix in a page's source | Safe/reversible |
| `cli_new_content` | A content brief with no article written yet — write + publish it | Safe (new content) |
| `cli_content_update` | An existing page flagged for revision (declining GSC clicks, low CTR, stale/thin) | Reversible |
| `cli_sitemap_update` | GSC can't fetch a sitemap at `/sitemap.xml` — write/refresh the project's sitemap | Safe |
| `cli_ai_files_update` | The AI-readable file layer (OKF bundle + `llms.txt`) is missing, unmanaged, or stale | Safe |
| `cli_new_landing_page` | High-value keyword (`easy_win`/`competitor_gap`) with no page covering it — write a landing page | Safe (new content) |
| `cli_draft_ready` | The cloud already wrote a complete article and synced it to `.seoagent/content/<slug>.md` — review and place it | Safe (new content) |
| `cli_send_outreach_email` | A human-approved link-building email to send **from the user's own email account** | **Outward-facing — confirm first send of the session** |
| `cli_draft_context` | Business context is missing while suggested keywords wait on the relevance judge — draft `.seoagent/context.md` | Safe (repo-local file) |
| `cli_run_audit` | The full technical audit is stale (>28 days) or has never run — re-run Skill Phase 1 and sync | Safe (read-only crawl + report) |
| `cli_outreach_drafts_ready` | Outreach email drafts await the owner's review on the dashboard — tell the user, then ack | Safe (informational) |

## Per-type procedure

**Trigger:** the user says "process the inbox", "handle pending actions", "what's in my inbox", or similar — OR `.seoagent/inbox/README.md` / `seoagent inbox` / `seoagent doctor` reports pending actions after a sync.

Start by reading `.seoagent/inbox/README.md` (or `seoagent inbox`) to see the list, then handle each file:

### `cli_prune_pending-<id>.md`

- `Read` it. The frontmatter has `action_id`, `article_id`, `slug`, and `cms_type`. The body has the original URL and title.
- **Find the local file** that corresponds to the article. Look under `content/`, `src/content/`, `app/blog/`, `posts/`, `pages/blog/`, or wherever this project's articles live. Match by slug first, then by URL path. If you can't find an exact match, ask the user before doing anything destructive.
- **Confirm with the user once per session** before deleting the first article. Show the title, slug, and the file path you intend to delete. After they confirm, proceed for the rest without re-prompting unless something looks ambiguous.
- Delete the file. If the repo uses a content frontmatter pattern (e.g., Astro, Next.js MDX), also remove any references from index/sitemap files you find.
- Acknowledge: `seoagent ack <action_id>`. If the user wants to keep the article (you disagree, false positive, etc.): `seoagent ack <action_id> --failed --reason "kept; performs well off-search"`.

### `cli_technical_fix-<id>.md`

- `Read` it. The frontmatter has `action_id`, `issue` (`meta`|`schema`|`canonical`|`internal_link`|`other`), `severity`, and `page_url`. The body describes the recommended fix per issue type.
- **Find the page's source** that renders `page_url` — the route/template/markdown under `app/`, `pages/`, `src/`, or `content/`. Match by URL path.
- Apply the fix in the source (use `Edit`/`Write`): meta → title/description (or the framework's metadata API/frontmatter); schema → JSON-LD; canonical → `<link rel="canonical">`; internal_link → add relevant internal links. Safe/reversible edits — no hard delete-confirmation needed, but still **show the user the diff** (confirm once per session, then proceed).
- Acknowledge: `seoagent ack <action_id>` (or `--failed --reason "not applicable; ..."` to decline).

### `cli_new_content-<id>.md`

- `Read` it. The frontmatter has `action_id`, `brief_slug`, `primary_keyword`, `cluster`, and `priority`. The body points at the synced brief.
- **Read the full brief** under `.seoagent/` (briefs file or `strategy/` entry matching `brief_slug`) for the outline, word-count target, and internal-link plan.
- Write the article following the skill's content-production protocol (Phase 4), then publish it where this project's content lives (repo `content/` or the connected CMS — you are the publishing engine). Show the user the draft before publishing (interactive sessions can use the visual review loop — `references/draft-review.md`).
- **If the action body has a "Screenshots to capture" section** (autopilot flagged this as a SaaS product), follow `references/screenshots.md` — capture real product screenshots from this repo's UI for the relevant sections instead of shipping illustration-only.
- Acknowledge: `seoagent ack <action_id>` (or `--failed --reason "skipped; off-strategy"`).

### `cli_content_update-<id>.md`

- `Read` it. The frontmatter has `action_id`, `reason` (`declining_clicks`|`rank_expansion`|`low_ctr`|`stale_thin`), and `page_url`; the body has the signals.
- **Check the page belongs to this site before you revise it.** Fetch `page_url` and read its `rel=canonical`. A canonical pointing at a *different origin* means the page deliberately hands its ranking to another site — a shared multi-brand app serving one brand's page on another brand's domain, a syndicated copy, a staging host. Revising it cannot lift this site, so decline: `seoagent ack <id> --failed --reason "canonicals to <origin>; not this site's page"`. Same for a `noindex` page. Only a self-canonical (or none) is yours to work on.
- **Find the page's source** for `page_url`. Apply the revision per `reason`:
  - `declining_clicks` → refresh/expand the content.
  - `rank_expansion` → the page already wins, or is in striking distance, for the queries in the body. Deepen **that** page against **those** queries; never spawn a new one.
  - `low_ctr` → **read the body, not just the reason.** Past roughly position 20 nobody sees the snippet, so the body says "Lift ranking" and a title rewrite is wasted work: fill the gaps a searcher on the page's real queries expects, and add the vocabulary those queries use if the page answers them in different words. Only when the body says "Improve CTR" (shallow position) is rewriting the title + meta description the fix.
  - `stale_thin` → expand and update.
- Follow the rewrite protocol (`references/rewrite-protocol.md`). Reversible edit — show the user the diff (confirm once per session, then proceed; interactive sessions can review the revised draft via `references/draft-review.md`).
- Acknowledge: `seoagent ack <action_id>` (or `--failed --reason "kept as-is; ..."`).

### `cli_sitemap_update-<id>.md`

- `Read` it. The frontmatter has `action_id` + `sitemap_url`; the body lists the URLs SEOAgent knows (crawled + GSC-discovered — this **includes CMS-hosted blog articles your repo doesn't contain**).
- **Find how the project serves its sitemap** (framework sitemap like Next.js `app/sitemap.ts` / `next-sitemap` / Astro integration, or a static `public/sitemap.xml`, or none yet). Prefer extending the framework sitemap so it stays current.
- **Union** the repo's own routes (which the framework sitemap usually covers) with the URL list in the file (which adds off-repo CMS articles), dedup, and ensure the result is served at `sitemap_url`. Show the user the diff. Deploy if needed — GSC fetches the live URL. See `references/sitemaps.md` for the generator-detection table.
- **Verify with `seoagent sitemap`** once deployed — it should report 200, no private leakage, and the expected URL count.
- Acknowledge: `seoagent ack <action_id>` (or `--failed --reason "sitemap already served"`). SEOAgent re-submits the sitemap to GSC on its schedule.

### `cli_ai_files_update-<id>.md`

- `Read` it. The frontmatter has `action_id` and `needs` (e.g. `okf:unmanaged, llms_txt:missing`); the body says what to do per file and lists the site's published pages.
- **`okf`** — fill `.seoagent/okf/` per `references/open-knowledge-format.md` (it is already scaffolded; `seoagent okf scaffold` covers an older project). **Replace every scaffold placeholder** and make `seoagent okf validate` pass — a placeholder or invalid bundle is deliberately NOT published. Then `seoagent sync` copies it to `<public_dir>/.well-known/okf/` (or `seoagent okf publish` on demand), and **you tell the user to commit + deploy**. `.seoagent/okf/` is the source; crawlers only read `/.well-known/okf/index.md`.
- **`llms_txt`** — run `seoagent llms`. **Do not hand-write it.** It is generated from `pages.md`, published `content/`, crawl evidence and `context.md`, so every link resolves and it regenerates on every sync instead of going stale after the next publish. If the page inventory is thin, run `seoagent refresh --crawl` first.
- **Both files must agree with the live site** on pricing, plan names, and positioning. A bundle that contradicts your own pages is worse than none. Cross-check `/pricing` before you write numbers.
- Show the user the diff, deploy, then acknowledge: `seoagent ack <action_id>` (or `--failed --reason "..."`).

### `cli_new_landing_page-<id>.md`

- `Read` it. The frontmatter has `action_id`, `keyword`, `opportunity` (`easy_win` | `competitor_gap`), `volume`, `difficulty`, and `intent`. The body explains why this keyword is worth a page.
- Cross-reference `.seoagent/keywords.md` for related keywords — they tell you which cluster this page belongs to and which secondary keywords to weave in.
- Pick an article type from `intent` (commercial/transactional → product or comparison page; informational → guide or pillar). Pick a clean URL slug from `keyword`.
- Write the article following the content-production protocol (Phase 4 — match the article type's quality rules, add internal links from related cluster pages, etc.). Show the user the draft before publishing (interactive sessions can use the visual review loop — `references/draft-review.md`).
- **If the action body has a "Screenshots to capture" section** (SaaS product), follow `references/screenshots.md` — a landing page for a SaaS product should lead with a real product screenshot in the hero + feature sections, captured from this repo's UI.
- Publish where this project's content lives (repo `content/` or the connected CMS). Safe (new content) — but still confirm the user wants this specific page before committing.
- Acknowledge: `seoagent ack <action_id>` (or `--failed --reason "already covered by /existing-page"`).

### `cli_draft_ready-<id>.md`

- `Read` it. The frontmatter has `action_id`, `article_slug`, `path`, `mode`, and (when drafted from a brief) `brief_slug`. The draft itself is at `.seoagent/<path>`.
- **Believe the task's own delivery line, not the word count.** It says either "pulled in the same sync that delivered this task" or "**NOT delivered by this sync**". The second means the pull kept your local copy and the cloud draft never reached disk: read the local file, then run the `seoagent sync --force <path>` the task prints to take the cloud version for that one file. Never publish a file whose body is a `Tracked record` pointer stub — that is the tracking placeholder, not the article.
- **Check `mode:` first.** It is the whole contract:
  - **`mode: new`** — the slug is free. Review the draft (frontmatter carries title, meta description, status), then place it where this project's content renders: repo-native (mdx_sync) → copy/adapt into the repo's content directory and `seoagent content track` it; CMS → create the entry and track it; cloud-hosted → flip frontmatter `status` to `published` and sync.
  - **`mode: revision`** — that slug **already renders live on this site** (`replaces_path` names the file). **Do not place it as a new post and do not overwrite the live file.** `diff` the two, fold in only what is genuinely new or better, and keep the live article's URL, frontmatter and dates. If the draft adds nothing, decline — that is a real answer.
- **Renaming the slug is encouraged** when the generated one reads as a full sentence; a short slug is the better URL. When you rename, pass `--supersedes <the-delivered-slug>` to `content track`. That is what tells the cloud it is the SAME article under a new name — without it the cloud keeps the original as an unfinished draft and delivers it to you all over again.
- **Close it out with `--action <action_id>` on the `content track`** — that acks the action for you, in the step you were already running. `seoagent ack <action_id>` by hand still works (or `--failed --reason "not publishing; ..."` to decline).

### `cli_send_outreach_email-<id>.md`

- `Read` it. The frontmatter has `action_id`, `to_email`, `to_name`, and `prospect_url`; the body carries the exact subject + email text the user **already reviewed and approved in the SEOAgent dashboard**. Your job is delivery only.
- **Send it from the user's own email account** using whatever email tooling this session has (Gmail connector/MCP, AgentMail, a mail CLI, …). SEOAgent never sends email itself.
- **Confirm once per session** before the first outbound email (show recipient + subject); then send subsequent approved emails without re-prompting. Send **verbatim** — no added signature, links, or attachments; the one allowed edit is fixing an obviously wrong greeting name.
- No `to_email`? Check the prospect page for the author's address or a contact form — a form submission with the body text counts as sent.
- Acknowledge after sending: `seoagent ack <action_id>` — the dashboard marks the draft **sent** and the prospect **contacted**. Declining (`--failed --reason "not sending; ..."`) dismisses the draft. A transient tooling failure should NOT be acked — leave it pending and it returns next sync.
- **No email tooling available at all?** Leave the action pending and tell the user exactly how to fix it: connect an email connector to this coding agent — e.g. the Gmail connector/MCP in Claude Code (Settings → Connectors, or `claude mcp add`) — or they can send manually from the dashboard's Outreach view.

### `cli_draft_context-<id>.md`

- `Read` it. The frontmatter has `action_id`, `artifact_path` (normally `.seoagent/context.md`), and `unjudged_keywords` — how many suggested keywords are stuck because the cloud's relevance judge has no business context for this site.
- **Draft the context file.** Open `artifact_path`; an untouched `seoagent init` scaffold carries an `AGENT:` comment with the full drafting instructions — follow those. Fill `business.type`, `business.audience`, and `business.description` from what you know of the repo (README, landing page copy), and set `business.location` ONLY if the business serves a physical area. State the reach explicitly — LOCAL, ONLINE-only, or HYBRID — the keyword gates key off it. **If you can't tell from the repo, ask the user; never guess.**
- Push it with `seoagent sync` — the next keyword-refresh run picks it up and judges the backlog.
- Acknowledge: `seoagent ack <action_id>` (or `--failed --reason "declined; ..."` if the user doesn't want context captured — SEOAgent won't ask again).

### `cli_run_audit-<id>.md`

- `Read` it. The frontmatter has `action_id`, `reason` (`never_audited`|`stale`), `last_audit_at`, and `age_days`.
- **Run the Skill's audit protocol (Phase 1)**: fresh evidence first (`seoagent crawl`, plus `seoagent indexing` when GSC is connected — evidence older than 24h doesn't count), then the per-page checks from `references/audit-checks.md`, then write `.seoagent/audit/latest.md`. If `reason` is `stale`, this is a **re-audit**: diff against the previous `latest.md` and mark what's fixed / new / regressed (skill § re-audit protocol).
- Push with `seoagent sync` — the server marks the previous report's still-open findings `superseded`, so the dashboard shows only the current audit.
- Acknowledge: `seoagent ack <action_id>` (or `--failed --reason "declined; ..."` — autopilot won't ask again until next month).

### `cli_outreach_drafts_ready-<id>.md`

- `Read` it. The frontmatter has `action_id`, `awaiting_drafts`, and `site_url`.
- **Informational — nothing to change in this repo.** The backlinks autopilot drafted link-building emails, but only the owner can approve outreach, and the approval queue lives in the SEOAgent dashboard (the site's **Outreach** tab, drafts filter). Tell the user how many drafts await and where; each shows the prospect page, pitch angle, and the exact email text (edit / approve / dismiss).
- Approved drafts return to this inbox as `cli_send_outreach_email` actions for delivery.
- Acknowledge after surfacing it: `seoagent ack <action_id>`. Decline (`--failed --reason "not now; ..."`) if the user isn't interested — the reminder returns only when the awaiting count changes on a later weekly run.
