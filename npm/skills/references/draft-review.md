# Draft Review — Visual Review Loop (human-review)

An optional, higher-fidelity way for the user to review a draft before it publishes. Instead of pasting the draft into chat and collecting feedback as prose, open it in the browser with [human-review](https://github.com/petergyang/human-review) (MIT, runs fully local via `npx`, no account or API key). The user edits text directly, drags blocks, and leaves comments anchored to exact phrases; you receive everything as one structured batch and apply it to the source.

## When to use it

Offer this loop in **interactive sessions**, after you have written or rewritten something the user will read: an article (Phase 4), a landing page, a rewrite (Phase 4b), or a draft from an inbox action (`cli_new_content`, `cli_content_update`, `cli_new_landing_page`). It replaces the "show the user the draft in chat" step with a real review surface.

Do NOT use it when:

- The session is headless / non-interactive (CI, autopilot one-shots) — nobody is there to review.
- `npx` is unavailable.
- The user prefers chat review or a PR diff — the PR remains the review surface for `mdx_sync` cluster batches.

Offer it once; if the user declines, fall back to chat/PR review and don't re-offer in the session.

## The loop

1. Write or update the draft file first (repo article, `.seoagent/content/{slug}.md`, or landing page source).
2. Open it for the user:

   ```bash
   npx -y human-review path/to/draft.md
   ```

   For a page served by a local dev server the user already runs, open the real route instead of recreating it as a file:

   ```bash
   npx -y human-review http://localhost:3000/blog/my-post
   ```

3. Wait for feedback. This blocks until the user hits Send, or the timeout passes:

   ```bash
   npx -y human-review poll path/to/draft.md --timeout 600
   ```

   Keep the poll in the foreground; don't end your turn while it waits. `{"status":"timeout"}` means no feedback yet — run the same poll again. `{"status":"closed"}` means the user ended the review from the browser — stop polling; unsent feedback ships on the next review of the same target.

4. Apply the batch, then acknowledge and wait again:

   ```bash
   npx -y human-review poll path/to/draft.md --ack --timeout 600
   ```

   Repeat 3–4 until the user says they are done. To check for waiting feedback without blocking (e.g. at the start of a new turn):

   ```bash
   npx -y human-review status path/to/draft.md
   ```

## Applying the feedback batch

The batch is JSON with `pages[]`, each carrying `comments[]` (anchored to an exact `quote`) and `edits[]` (`before` / `after`, plus `after_html` when formatting changed). Rules:

- **`edits` are changes the user already made. `after` is their exact wording — carry it verbatim and never revert or "improve" it.** The user's own words always win over the writing rules; do not run the no-slop pass over text the user typed.
- Markdown files open rendered; quotes and edits reference the rendered text. Apply every change to the **markdown source**, keeping its syntax (`<strong>` → `**`, pasted `<img src="assets/...">` → `![](assets/...)`, keep the relative path).
- For a localhost page (`kind: "url"`), find the project source that renders the route (MDX, TSX, template) and apply the edits there — never write rendered HTML back into the app.
- An edit with `kind: "moved"` relocates a whole block — reposition it in the source without rewriting its content.
- Find each comment by its `quote`; fix every page in `pages`, not just the first.
- When a comment asks for a rewrite, apply the writing rules from `references/writing-rules.md` — including its voice-preservation section — to YOUR new text, never to the user's.
- **Do not write a chat reply for each item.** The page reloads when you save; the user sees the result there. Summarize what you applied once per batch.

## After the review

1. Re-run the self-check from `references/writing-rules.md` on any text you (not the user) rewrote.
2. Continue the normal flow: `seoagent sync`, cluster link-graph updates, publish per `publishing.strategy`.
3. Log one changelog line: `[date] Applied human-review batch to {slug}: {N} edits, {M} comments`.
