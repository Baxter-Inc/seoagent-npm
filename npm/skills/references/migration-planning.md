# Migration Planning — Legacy Ranking Authority

Loaded when the site has **repositioned** and its historical Google Search Console authority ranks for the *old* story. This is the differentiating capability: a per-asset plan (`seoagent migrate`) that decides, URL by URL, whether to **harvest**, **redirect**, or **sunset** the legacy equity — instead of stranding it or accidentally rebuilding the outdated narrative.

## When to run migration planning

Run it the moment you detect a **positioning shift / legacy-authority mismatch**:

- The live product/positioning (homepage, `context.md`) describes a **different** thing than the site's top GSC queries/pages rank for.
- A **pivot, rebrand, new ICP, or dropped product line** has happened — the user says so, or `keywords --seed` / the audit surfaces high-impression URLs that are off-message for the current direction.
- Phase 2 step 3 ("segment GSC seeds against current positioning") turns up a substantial **legacy / off-strategy** bucket with real impressions — that bucket is exactly what this plan dispositions.

If the site's live direction and its GSC history are aligned, you do **not** need this — normal keyword strategy (Phase 2) covers it. Migration planning is specifically for the mismatch case.

## Inputs

1. **The new direction.** Inferred from `.seoagent/project.md` (domain, `site_type`) + `.seoagent/context.md` (business type, audience, industry, description, writing instructions). Override the summary with `--direction "<what the site is now about>"`.
2. **GSC performance data — real ranking pages/queries with impressions, position, clicks.**
   - **CSV export (no-credentials path — primary).** Search Console → Performance → set the date range → **Export → CSV** → use the **Pages** or **Queries** sheet. The header shape is `Top pages,Clicks,Impressions,CTR,Position` (or `Top queries,...`). Pass it: `seoagent migrate --csv <path>`.
   - **Cloud GSC (`keywords --seed`).** The CLI's other GSC access is query-oriented and projects into `.seoagent/keywords.md`. It's a useful *supplementary* query signal, but for **per-URL page authority** the CSV export is the reliable input — always prefer `--csv` for a real migration plan.

## The harvest / redirect / sunset protocol

For each legacy URL/query cluster with real impressions, the disposition is a function of **(topical relevance to the new direction, impressions, position)**:

| Disposition | Condition | Action |
|---|---|---|
| **harvest** | On-topic for the new direction **and** real impressions | Refresh/repurpose into the new narrative. **Keep the URL**, retarget the content. The equity is bridgeable — reuse it. |
| **redirect** | Off-topic for the new direction **but** holds authority (meaningful impressions and/or a decent position) | **301** into the most relevant new page. Don't throw the authority away — pass it forward. |
| **sunset** | Negligible impressions **or** off-topic with nothing worth preserving | Let it decay / `noindex`. Not worth active migration. |

Default thresholds (`migration-planner.ts`): a row needs ≥ **50 impressions** to count as "worth preserving" (below that, off-topic rows sunset rather than redirect), and must share ≥ **34%** of the direction's vocabulary to count as on-topic. These are deliberate, tunable heuristics — sanity-check the borderline rows.

## Output

`seoagent migrate --csv <path>` writes **`.seoagent/strategy/migration-plan.md`** (created dir if needed):

- Frontmatter counts (`harvest` / `redirect` / `sunset`) + the new-direction summary.
- Per-asset, grouped by disposition: the URL/query, the **GSC evidence** (impressions, clicks, avg position), the **rationale**, and the **concrete action** — each as a `- [ ]` checkbox so it's trackable.
- A **"Redirect config (proposed — approval-gated)"** block listing the `redirect` pages as `source -> <choose the closest new page>` pairs.

**Surface a concise summary in the audit/operator output** — e.g. *"Migration plan: 6 harvest · 4 redirect · 11 sunset across 21 legacy assets → `.seoagent/strategy/migration-plan.md`."*

## Applying redirects (approval-gated)

The proposed 301s are **never applied silently**. If the repo can express redirects as config (a redirects list, `next.config.js` `redirects()`, a `vercel.json` `redirects` array, `_redirects`, etc.):

1. Pick the target new page for each `redirect` row (the closest topical match in the current site).
2. **Show the diff** of the config change before writing — consistent with the skill's plan-then-execute / approval model.
3. Only write after the user confirms.

Harvest actions (refresh/repurpose) flow through the normal rewrite protocol (`references/rewrite-protocol.md`); sunset actions are usually just a `noindex` or removal from the sitemap — also propose, don't auto-apply.

## Relationship to keyword strategy

Migration planning is the **backward-looking** counterpart to Phase 2's forward-looking clusters. Run `keywords --seed` to see the historical demand, split on/off strategy (Phase 2 step 3), then use `seoagent migrate` to give the **off-strategy-but-valuable** bucket a concrete per-URL disposition. The new direction's forward clusters still come from `context.md` + WebSearch (they have little GSC history yet).
