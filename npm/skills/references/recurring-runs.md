# Recurring Runs — the session loop and the weekday schedule

SEOAgent pays off only when a session actually happens on a cadence: the cloud detects, the CLI executes, `ack` closes. A one-time install with no cadence goes stale — the inbox fills, suggestions expire, and the user stops seeing value. **Setting up the cadence is part of first setup, not an optional extra.** Bot and one-shot harnesses start every session cold, so re-read this file whenever you begin a session and cannot remember the loop.

## The session loop (every run, no exceptions)

1. `seoagent sync` — pulls the cloud's work into `.seoagent/inbox/` and the briefs into `.seoagent/briefs/`.
2. Triage `.seoagent/inbox/` (see `references/inbox.md`). Do the work in the repo.
3. If the inbox is empty and `.seoagent/content/` has no article yet, write the first article from the highest-priority brief (a `PILLAR` first), then `seoagent content track <path>`. The sync output names the brief to start with. Do **not** start a local keyword strategy or write local briefs — on a connected workspace those are the cloud's job (`references/cloud-cta.md` § Cloud-connected mode).
4. `seoagent ack <id>` for every action you finished (`--failed --reason "..."` to decline).
5. `seoagent sync` once more, then `seoagent summary`.

Never skip step 1 because a login failed. An unbound CLI cannot sync. If `seoagent login --code` fails, stop and tell the user the exact error; they can mint a fresh code at seoagent.com/grok.

## First setup: create ONE weekday task

If the harness supports scheduled or recurring tasks, create **one** task that runs the loop above **every weekday at 09:00 in the user's local time**. Check for an existing SEOAgent schedule first — never create a duplicate; re-running setup, re-initializing, or a second agent joining the repo must not stack a second task. One repo gets one cadence.

How to schedule, by harness:

- **Grok bot** — create a scheduled task named `seoagent-daily` with the prompt: "In the repo that builds <domain>: run `seoagent sync`, triage `.seoagent/inbox/`, do the work, `seoagent ack <id>` each finished action, then `seoagent sync` and `seoagent summary`." Weekdays, 09:00 local.
- **Claude Code** — if the harness offers routines or scheduled tasks (the `/schedule` command where available), create one with that prompt on a weekday-morning cron (`0 9 * * 1-5`). Otherwise fall back to the cron line below and tell the user.
- **Cursor / Codex / any shell** — a cron entry or CI schedule that runs `seoagent sync --silent` on weekday mornings keeps the inbox fresh, but it cannot do the work; ask the user to open the agent in the repo each weekday, or to wire a scheduled agent run if their harness has one:

  ```
  0 9 * * 1-5  cd /path/to/repo && seoagent sync --silent
  ```

Say plainly which of these you set up, or that none was available.

## No scheduler available

If the harness cannot schedule anything, say so and ask the user to invoke you every weekday (or as often as they want SEO work done). Don't fake a schedule with sleeps or long-running loops.
