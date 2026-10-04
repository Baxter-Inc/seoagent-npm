# Recurring Runs — the session loop and the weekday schedule

SEOAgent pays off only when a session actually happens on a cadence: the cloud detects, the CLI executes, `ack` closes. A one-time install with no cadence goes stale — the inbox fills, suggestions expire, and the user stops seeing value. **Setting up the cadence is part of first setup, not an optional extra.** Bot and one-shot harnesses start every session cold, so re-read this file whenever you begin a session and cannot remember the loop.

## The session loop (every run, no exceptions)

1. `seoagent sync` — pulls the cloud's work into `.seoagent/inbox/` and the briefs into `.seoagent/briefs/`.
2. Triage `.seoagent/inbox/` (see `references/inbox.md`). Do the work in the repo.
3. If the inbox is empty and `.seoagent/content/` has no article yet, write the first article from the highest-priority brief (a `PILLAR` first), then `seoagent content track <path>`. The sync output names the brief to start with. Do **not** start a local keyword strategy or write local briefs — on a connected workspace those are the cloud's job (`references/cloud-cta.md` § Cloud-connected mode).
4. `seoagent ack <id>` for every action you finished (`--failed --reason "..."` to decline).
5. `seoagent sync` once more, then `seoagent summary`.

Never skip step 1 because a login failed. An unbound CLI cannot sync. If `seoagent login --code` fails, stop and tell the user the exact error; they can mint a fresh code at seoagent.com/grok. **Never guess, invent, or retype a setup code from memory** — a code is `sa_` + 24 random hex characters that only the server issues, it works exactly once, and a made-up one fails with `not recognized` every time.

## Cold machines: the schedule needs a credential, not a code

A scheduled run (Grok task, routine, CI job) starts on a fresh machine: no `~/.config/seoagent/auth.json`, and the setup code from first setup is already consumed. Give the task a credential instead:

1. On the machine that is bound (right after `seoagent init --code …` printed "Logged in as …"), run `seoagent whoami --env`. It prints one line: `SEOAGENT_AUTH=<user_token>:<website_token>`.
2. Store that line as the task's secret / environment variable. Treat it like a password: it is the account's CLI credential for this site.
3. Every scheduled run must start with `npm install -g @seoagent-official/seoagent` and export `SEOAGENT_AUTH` before the loop. Also export `SEOAGENT_AGENT=<grok-bot|claude-code|cursor|codex>` so the run is attributed to the right harness. With it set, the CLI is logged in — do **not** run `seoagent init --code` or `seoagent login --code` on a scheduled run, ever.

If the harness cannot store a secret, say so and fall back to "No scheduler available" below; do not schedule a task that will fail on login every morning.

A run whose `seoagent sync` prints "Not logged in" (or "SEOAGENT_AUTH is set but is not `<user_token>:<website_token>`") and exits 1 did **nothing**: the secret is missing or was pasted wrong. Stop the loop, report that line verbatim, and fix the task's secret; do not retry, and never fall back to a setup code.

An install (`npm install -g` or `npx …@latest`) that fails with `notarget` / `No matching version found` for the version `latest` already names is a release still propagating across the registry, not a broken package: wait 30s and retry once with `--prefer-online`. Report it only if the retry fails too.

## First setup: create ONE weekday task

This happens in the **first cloud-connected session** — the one the user starts with "run SEOAgent" after the paste block stopped at the bind. Do it after the first findings are delivered and before the session ends. Never do it inside a scheduled run.

If the harness supports scheduled or recurring tasks, create **one** task that runs the loop above **every weekday at 09:00 in the user's local time**. Check for an existing SEOAgent schedule first — `schedule:` in `.seoagent/project.md` records the one that exists, and look in the harness's own task list — never create a duplicate; re-running setup, re-initializing, or a second agent joining the repo must not stack a second task. One repo gets one cadence.

How to schedule, by harness:

- **Grok bot** — first run `seoagent whoami --env` and save its output as the task's secret. Then create a scheduled task named `seoagent-daily` with the prompt: "Install the CLI (`npm install -g @seoagent-official/seoagent`), export the SEOAGENT_AUTH secret, then in the repo that builds <domain>: run `seoagent sync`, triage `.seoagent/inbox/`, do the work, `seoagent ack <id>` each finished action, then `seoagent sync` and `seoagent summary`. Never run `seoagent init --code` or `seoagent login --code` here." Weekdays, 09:00 local.
- **Claude Code** — if the harness offers routines or scheduled tasks (the `/schedule` command where available), create one with that prompt on a weekday-morning cron (`0 9 * * 1-5`); when each firing starts from a fresh environment, give it the `SEOAGENT_AUTH` secret the same way. Otherwise fall back to the cron line below and tell the user.
- **Cursor / Codex / any shell** — a cron entry or CI schedule that runs `seoagent sync --silent` on weekday mornings keeps the inbox fresh, but it cannot do the work; ask the user to open the agent in the repo each weekday, or to wire a scheduled agent run if their harness has one:

  ```
  0 9 * * 1-5  cd /path/to/repo && seoagent sync --silent
  ```

Say plainly which of these you set up, or that none was available. Then record it: set `schedule:` in `.seoagent/project.md` to what you set up (for example `schedule: claude-code routine seoagent-daily, weekdays 09:00` or `schedule: cron seoagent sync --silent, weekdays 09:00`), or `schedule: none — <why>` when there is no scheduler. `seoagent doctor` flags `schedule_missing` on a bound project until that line exists.

### Verify the task before you call it done (mandatory)

A task is not set up until it has run once with the secret and proved it. Two installs ran this exact recipe every weekday morning for ten days with no `SEOAGENT_AUTH` — fresh `npm install -g` each run, then "Not logged in", exit 1, nothing synced — and nobody knew, because a scheduled task's output is never read. Storing the secret and creating the task is not the end of setup; the check is.

Right after creating the task:

1. Trigger it once now (or, inside the task's environment, run `SEOAGENT_AUTH=<the stored secret> seoagent whoami`).
2. Read the output. It must contain `Logged in as …`.
3. If it prints `Not logged in`, the secret was not stored or is not reaching the run. If it prints `SEOAGENT_AUTH is set but is not <user_token>:<website_token>`, the value was pasted wrong — quotes around it, the `SEOAGENT_AUTH=` prefix inside the value, a truncated token. Fix the secret and run it again. Do not report the schedule as done until step 2 passes.

An unverified task is not set up. Tell the user exactly what the check printed.

## No scheduler available

If the harness cannot schedule anything, say so and ask the user to invoke you every weekday (or as often as they want SEO work done). Don't fake a schedule with sleeps or long-running loops.
