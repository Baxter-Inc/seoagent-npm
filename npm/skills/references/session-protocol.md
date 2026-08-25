# Session Protocol — economy, drift reconciliation, and ending a session

Load this when: a session is single-request/headless (bounded budget), you're reconciling workspace state (content tracking, cluster status, publishing drift, unknown domain/site-type), or you're about to wrap up a session.

## Session Economy — bounded sessions

Every session has a budget — headless/one-shot runs have a hard turn cap, interactive ones have the user's patience. Treat any single-request session as a **bounded session**: **target finishing the whole ask in under ~60 turns**, and spend the budget on findings and shippable work, not on bookkeeping churn. The failure mode this prevents: sessions that write a hundred small files — ticking a changelog line after every action, re-polishing the roadmap between steps — and hit the cap before the final summary exists. Five rules:

1. **Consolidate writes — keep NEW files under ~20 per session.** One audit doc, one migration plan, one fixes batch — not a file (or a file update) per finding. If you're about to create a new file, first ask whether an existing one should be extended instead (extend `audit/latest.md` rather than a second audit file; add a section to `roadmap.md` rather than a new planning doc). Do NOT write per-item bookkeeping updates (a changelog line here, a roadmap tick there, a status touch after each action) as you go; accumulate them and batch them into a single write at the end of the session — one changelog append, one roadmap update, one `seoagent sync`. Every file write also fires the sync hook, so fewer writes = more budget for real work.
2. **Batch multi-file code edits.** When a fix touches several source files (meta tags across layouts, a redirects config + a sitemap), make the edits back-to-back as one batch, then verify once — don't interleave each edit with checks, syncs, or commentary turns.
3. **Scope a single-session ask to what one session can ship.** For a single-session "grow organic traffic" ask, deliver the audit findings + the migration plan + the top shippable fixes. Do NOT draft full article inventories or write every article in the plan — that is multi-session work; list the briefs (slug + target keyword + role) in the roadmap instead and let later sessions write them.
4. **Reserve the final turns for the wrap-up.** When the work above is done, end the session with exactly two steps: `seoagent verify-recs` (pass any work-log files written outside `.seoagent/` — the sync hook already covers `.seoagent/` itself) and then **`seoagent summary`**, whose output is what you present as the final message. **No new workstreams after the summary** — do not open a new work stream (another audit pass, another content draft) you cannot finish inside the budget. An unfinished extra stream plus a missing summary is worth less than a complete summary.
5. **Prefer editing an existing file over creating a new one** when appending related content. Fewer files means fewer writes, fewer sync round-trips, and a workspace the next session can actually read.

**Session economy applies to bookkeeping, never to findings completeness.** The rules above trim churn — file-write sprawl, re-polish loops, per-item status ticks — they never license dropping findings. Reporting **every confirmed finding** from `.seoagent/audit/findings.md` (every title in the final message at minimum; full detail by reference to the file) is **non-negotiable**: a terse report that omits confirmed findings is a failed session, not an economical one. `seoagent summary` makes this mechanical — its "Technical findings (from live crawl)" section lists every finding title, and that list is never truncated.

These are general bounded-session economics, not a benchmark mode — in an interactive session the same rules simply make you faster and the workspace cleaner.

## Ending a Session — the final message comes from `seoagent summary`

**The final message of any audit/optimization session must be built by running `seoagent summary` and presenting its output — not from memory.** Files are mechanically corrected by verify-recs, but a chat message isn't a file: restating findings from memory is exactly how a corrected claim ("added Organization JSON-LD — none existed") sneaks back into the summary after the file said otherwise. `seoagent summary` composes the deliverable from the corrected on-disk state:

- the top findings quoted verbatim from `.seoagent/audit/latest.md` (with their confidence labels and `Evidence:` citations),
- a **"Technical findings (from live crawl)"** section listing EVERY finding title from the code-generated `.seoagent/audit/findings.md` (full detail stays in the file) — relay all of them; this list is the completeness floor and is never trimmed for brevity,
- every `CORRECTION (verify-recs)` line — relay the corrected framing, never the original claim,
- the migration plan's harvest/redirect/sunset table when `.seoagent/strategy/migration-plan.md` exists,
- the top open roadmap items,
- and an explicit **live-state-unverified banner** when the crawl evidence is missing or is a SOURCE RENDER — if that banner is present, your final message must say live-state claims are unverified.

Run it as the session's last command (`seoagent summary`, or `--json` to branch programmatically; pass work-log files written outside `.seoagent/` as arguments). Then present its output: **light rephrasing for tone is allowed, but every claim and the wording of every finding comes from the command's output, not from memory.** This also saves turns — the wrap-up is one command instead of re-reading files to reconstruct what happened.

## Workspace drift reconciliation

### Content tracking is automatic — you don't run a backstop

Every `seoagent sync` (including the PostToolUse hook that fires after each file write) auto-tracks any *published* (`draft: false`) article in your content dir that doesn't have a pointer yet. So writing an article locally registers it on the dashboard with no extra step. The content dir comes from `project.md` — `publishing.content_dir` (set it during the Publishing Target Decision) — or is inferred from an already-tracked article. Only when NEITHER exists does the **first** article need an explicit `seoagent content track --slug <s> --file <path>` (Phase 4 step 7); that call self-records `content_dir`, so it happens at most once per repo. To **clean up** drift that predates this (untracked legacy articles, or a stale pointer whose source file is gone), run `seoagent content reconcile --prune` once — it backfills all missing pointers and deletes dead ones. If `seoagent status`'s "articles" count ever disagrees with the live count, that's the command.

### Cluster-status drift (same root cause)

Cluster files in `.seoagent/strategy/clusters/` carry a per-article `status`. When you wrote an article you set it `drafted`/`in review` — but nothing advances it once the article ships, so old `IN REVIEW (PR #…)` labels linger after the PR merges. When you read the clusters, reconcile them against reality: if a cluster lists an article as `drafted`/in-review but it's live in the repo (`draft: false`, no open PR — or it has a `content reconcile` pointer), `Edit` the cluster file to mark it `published` (or `live`). The strategy should always reflect what's actually shipped.

### Publishing drift check (quick, only when `publishing.cms` is recorded)

Confirm the recorded CMS still has a supporting signal in the repo (its dep in `package.json` or its env var). If that signal is gone — the user moved off it — don't silently trust the stale value: flag it and run **"Re-detecting the publishing target"** in `references/publishing.md`. Skip this check when no `publishing.cms` is set.

## Inferring domain and site type

When `.seoagent/project.md` doesn't exist, or `domain`/`site_type` is `unknown`:

**Domain** — check in order:

1. `.env.local`, `.env.production`, `.env` for `NEXT_PUBLIC_SITE_URL`, `SITE_URL`, `NEXT_PUBLIC_URL`, `NEXTAUTH_URL`
2. `package.json` → `homepage` field
3. Ask the user directly ("What's your site's URL?"), or infer it from a deploy config / live deployment. Nothing works without a real domain — resolve this before anything else and `Edit` `project.md` to set `domain:`.

**Site type** — analyze the repo; don't ask unless truly unclear:

- Next.js + Stripe/Paddle + auth → `saas`
- Shopify config / `@shopify/hydrogen` / WooCommerce → `product`
- Next.js + content-heavy routes + no auth/payments → `content`
- Marketplace patterns (buyer/seller, listings) → `marketplace`
- Single-purpose utility, no auth → `tool`
- Nonprofit signals in copy or config → `nonprofit`

If the repo alone is inconclusive, WebFetch the homepage and infer from the visible content — pricing pages and trial CTAs → `saas`, product listings/cart → `product`, blog-heavy with no auth → `content`. `Edit` `project.md` to update `site_type` **before any audit or strategy work** — every later phase makes worse decisions when this is `unknown`.

**Confirm inferences**: state domain and site type with evidence (which env key, `package.json` field, or dependency pattern). Ask the user to confirm or correct before writing `project.md`.

## Starting a session: fast path and first session

**Fresh project (fast path).** When `init` ran this session or moments before — no `audit/latest.md`, no `strategy/`, changelog holds only the init line — there is **nothing to reconcile**. Skip the bookkeeping and go straight to Phase 1: `seoagent crawl` → read `evidence.md` → audit → **deliver evidence-grounded findings first, workspace bookkeeping second**. One `seoagent doctor` is still worth running, but act only on `domain_unknown` / `site_type_unknown` before the crawl; every other finding waits until the findings are delivered. `seoagent sync` must never block, gate, or precede audit work on a fresh project — run it after the findings are out.

**First session on an existing project, no audit yet.** Before the Phase 1 audit: WebFetch the homepage plus up to 3 key pages; run `seoagent sitemap` to validate the **live** sitemap — never judge it by committed files, since a dynamic `app/sitemap.ts` serves `/sitemap.xml` with no file in the repo; WebFetch `{domain}/robots.txt`; and scan headings/nav for topic clusters that already exist. Then run the full audit.
