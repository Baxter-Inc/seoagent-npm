# Pull Receipt Triage

When `.seoagent/.pull-receipt.json` exists, a previous `seoagent pull` (manual, autosync hook, or cron) brought down cloud changes (dashboard edits, chat actions, autopilot, GSC backfill) that no agent has triaged yet. `seoagent doctor` flags this as `pull_receipt`. Handle it **before any SEO work**, then delete the receipt file.

`Read` the receipt. Shape:

```jsonc
{
  "pulled_at": "2026-05-15T12:00:00.000Z",
  "cursor": "2026-05-15T12:00:00.000Z",
  "changes": [
    { "path": "briefs/foo.md", "kind": "write", "class": "brief" },
    { "path": "audit/latest.md", "kind": "overwrite", "class": "audit" },
    { "path": "content/bar.md", "kind": "conflict", "class": "article",
      "note": "local newer than cloud, keeping local — use --force to take cloud" }
  ]
}
```

**Golden rule: triage = PROPOSE, never auto-act.** Summarize what changed and offer next steps using the standard operator output format (numbered options → "What do you want to do?"). Never silently write content, publish, or resolve a conflict from a pulled change without the user saying so.

## Per-entry behavior, by `class` × `kind`

| class | kind | What you do |
|---|---|---|
| `generated-index` | write/overwrite | **Inform only, one quiet line.** "`pages.md`/`keywords.md` was regenerated in the cloud — it's read-only locally; edit rows in the dashboard." Never offer to edit it. Don't nag if it's the only change. |
| `audit` | overwrite | **Inform + offer.** "Audit findings changed in the cloud (e.g. a finding marked fixed). Want me to re-prioritize the roadmap?" |
| `brief` | write | **Offer action.** "A new brief `foo.md` was created in the cloud. Want me to write the article now? (Phase 4)" |
| `article` | write/overwrite | **Inform + offer review.** "An article `bar.md` was written/updated in the cloud. Want me to review it before it publishes?" |
| `cluster`/`keywords`/`competitors`/`project`/`other` | write/overwrite | **Inform only.** One line each; no action unless the user asks. |
| any | `delete` | **Inform only.** "`x.md` was removed in the cloud (likely sharding)." |
| any | `conflict` or `delete-skipped` | **Conflict protocol (below). Always surface — never auto-resolve.** |

## Conflict resolution protocol (for `conflict` / `delete-skipped`)

1. `Read` the local file.
2. Get the cloud version WITHOUT overwriting: `seoagent pull --print <path>`
3. Show the user a concise diff (what local has vs what cloud has).
4. Offer numbered options:
   1. **Keep local** — drop the cloud change (do nothing; it stays in the manifest until resolved — the next pull will surface it again).
   2. **Take cloud** — `seoagent pull --force --path <path>` (or plain `pull --force` if the user wants cloud for everything).
   3. **Merge by hand** — you reconcile both into the local file, then it pushes on the next sync.
   4. **Decide later** — leave it; it'll resurface next session.
5. Record the resolution in `.seoagent/changelog.md`.

## After triaging

**Delete `.seoagent/.pull-receipt.json`** (use `rm` / the filesystem) so it isn't reprocessed next session. Unresolved conflicts are NOT lost by deleting the receipt — the cursor-hold invariant keeps them in every future pull manifest until taken or overwritten.

If `.seoagent/inbox/` also has pending actions, fold both into one prompt ("you have 1 new cloud brief and 2 inbox actions — want to work through them?") rather than running two separate flows.
