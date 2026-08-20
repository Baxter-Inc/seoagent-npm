// Regression tests for the verify-recs head-entity claim matcher.
//
// verify-recs must only rewrite lines that assert a head-level entity is
// absent or was added ("add a canonical tag", "no canonical present",
// "missing meta description"). Lines that merely contain an entity keyword
// ("canonical policy", "no canonical mismatches") must pass through
// unmodified. See the false positives fixed after v1.86.1.
//
// Run: node --test test/

import { test } from 'node:test';
import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const CLI = join(dirname(fileURLToPath(import.meta.url)), '..', 'index.js');

// Minimal live-crawl evidence: every page serves the full head, so any
// "X is missing / add X" claim about these pages is provably false and
// must be corrected — and anything else must be left alone.
const EVIDENCE = `---
domain: example.com
origin: https://example.com
source_render: false
pages_crawled: 3
capture_complete: true
---

# Live-Crawl Evidence — example.com

## https://example.com/
- HTTP 200 · 500 body words
- **title:** Example — Home
- **meta description:** The example home page.
- **canonical:** \`https://example.com/\` (server-rendered)
- **JSON-LD @types present:** \`SoftwareApplication\`, \`FAQPage\`
- **Open Graph:** og:type, og:title, og:description, og:url, og:image
- **Twitter:** twitter:card, twitter:title, twitter:description

## https://example.com/privacy
- HTTP 200 · 400 body words
- **title:** Privacy Policy — Example
- **meta description:** How example.com handles your data.
- **canonical:** \`https://example.com/privacy\` (server-rendered)
- **JSON-LD @types present:** \`WebPage\`, \`FAQPage\`
- **Open Graph:** og:type, og:title, og:description, og:url, og:image
- **Twitter:** twitter:card, twitter:title, twitter:description

## https://example.com/clean-email-alternative
- HTTP 200 · 900 body words
- **title:** Clean Email Alternative — Example
- **meta description:** Compare example.com with Clean Email.
- **canonical:** \`https://example.com/clean-email-alternative\` (server-rendered)
- **JSON-LD @types present:** \`WebPage\`
- **Open Graph:** og:type, og:title, og:description, og:url, og:image
- **Twitter:** twitter:card, twitter:title, twitter:description
`;

function runVerifyRecs(lines) {
  const ws = mkdtempSync(join(tmpdir(), 'verify-recs-test-'));
  mkdirSync(join(ws, '.seoagent', 'audit'), { recursive: true });
  writeFileSync(join(ws, '.seoagent', 'audit', 'evidence.md'), EVIDENCE);
  const target = join(ws, '.seoagent', 'roadmap.md');
  writeFileSync(target, lines.join('\n') + '\n');
  execFileSync(process.execPath, [CLI, 'verify-recs', '--quiet'], { cwd: ws });
  return readFileSync(target, 'utf-8').replace(/\n$/, '').split('\n');
}

// ---------------------------------------------------------------------------
// False positives: the keyword appears, but the line makes no
// "entity absent / entity added" claim. Must pass through unmodified.
// ---------------------------------------------------------------------------

test('"canonical" as an adjective of another noun is not an add-canonical-tag claim', () => {
  const lines = [
    '- keep the canonical policy at usebaxter.com',
    '- Recommendation: create a `/privacy` page on this domain, or keep the canonical policy at usebaxter.com and link both ways. Low urgency.',
  ];
  assert.deepEqual(runVerifyRecs(lines), lines);
});

test('"no canonical mismatches" negates "mismatches", not the canonical tag', () => {
  const lines = [
    '- 14/15 sitemap URLs indexed (93%), 0 errors, no canonical mismatches. Only /clean-email-alternative is Discovered-not-indexed.',
  ];
  assert.deepEqual(runVerifyRecs(lines), lines);
});

test('neutral lines that merely mention an entity keyword are untouched', () => {
  const lines = [
    '- Recommendation: create a `/privacy` page on this domain, or keep the authoritative policy document at usebaxter.com and link both ways. Low urgency.',
    '- [x] Flip primary domain to apex — matches shipped canonical/sitemap/OG setup. No canonical issues remain.',
  ];
  assert.deepEqual(runVerifyRecs(lines), lines);
});

// ---------------------------------------------------------------------------
// True positives: real "absent / was added" claims contradicted by the
// evidence must still be struck with a CORRECTION annotation.
// ---------------------------------------------------------------------------

test('a real "add a canonical tag / none exists" claim is still corrected', () => {
  const out = runVerifyRecs([
    '- Add a canonical tag to https://example.com/ — none exists today.',
  ]);
  assert.match(out[0], /CORRECTION \(verify-recs\)/);
  assert.match(out[0], /a canonical tag/);
});

test('a real "has no meta description" claim is still corrected', () => {
  const out = runVerifyRecs(['- The homepage has no meta description.']);
  assert.match(out[0], /CORRECTION \(verify-recs\)/);
  assert.match(out[0], /a meta description/);
});

test('a real "Twitter card missing" claim is still corrected', () => {
  const out = runVerifyRecs(['- Twitter card missing on /privacy.']);
  assert.match(out[0], /CORRECTION \(verify-recs\)/);
  assert.match(out[0], /a Twitter card/);
});

test('a real "added schema markup, previously had none" claim is still corrected', () => {
  const out = runVerifyRecs([
    '- Added FAQPage schema markup to /privacy — the page previously had none.',
  ]);
  assert.match(out[0], /CORRECTION \(verify-recs\)/);
  assert.match(out[0], /FAQPage JSON-LD/);
});
