# Recurring Runs

SEOAgent's autopilot loop only pays off when a session actually happens each day: the cloud detects, the CLI executes, `ack` closes. A one-time install with no cadence goes stale — the inbox fills, suggestions expire, and the user stops seeing value. Setting up the cadence is part of first setup, not an optional extra.

## First setup: create ONE daily task

If the host harness supports scheduled or recurring tasks — Grok bot scheduled tasks, Claude Code routines, plain cron, CI schedules — offer to create **one** daily task that runs the standard session loop:

1. `seoagent sync`
2. Triage `.seoagent/inbox/`
3. Do the work
4. `seoagent ack <id>` for each completed action

**Check for an existing SEOAgent schedule first — never create a duplicate.** Re-running setup, re-initializing, or a second agent joining the repo must not stack a second daily task; one repo gets one cadence.

## No scheduler available

If the harness cannot schedule anything, say so plainly and ask the user to invoke you daily (or as often as they want SEO work done). Don't fake a schedule with sleeps or long-running loops.
