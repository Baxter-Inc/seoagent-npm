'use strict';

// =============================================================================
// @seoagent-official/seoagent — postinstall
//
// This package is a SCAFFOLDER, not a runtime dependency. Its entire purpose
// is to write `.seoagent/` + `.claude/skills/seoagent/` into the user's repo.
// We learned the hard way that just printing a hint ("run init next") gets
// ignored — coding agents like Claude Code install the package, see the
// binary in node_modules/.bin, and stop. The user ends up with a devDep entry
// and nothing useful.
//
// So this script does the scaffolding itself. It runs `init --yes` from
// INIT_CWD (the directory where the user ran `npm install`) and inherits
// stdio so all output is visible. Guards below ensure we don't run when it
// would be wrong (CI, global install, already-scaffolded, opt-out).
// =============================================================================

const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');
const { isDirectInstall } = require('./postinstall-lib.cjs');

// -----------------------------------------------------------------------------
// Guards — skip auto-init when it would be wrong or annoying.
// -----------------------------------------------------------------------------

// CI: postinstall must be non-interactive and side-effect-free in CI builds.
if (process.env.CI === 'true' || process.env.CI === '1') {
  process.exit(0);
}

// User opt-out: bail without touching the repo.
if (process.env.SEOAGENT_SKIP_AUTOINIT === '1') {
  printOptOutNotice();
  process.exit(0);
}

// Global install: there's no project context to scaffold into.
if (process.env.npm_config_global === 'true') {
  printGlobalInstallHint();
  process.exit(0);
}

// `INIT_CWD` is the directory where the user ran `npm install`. npm sets it
// automatically. If it's missing we're probably being run by something other
// than npm (e.g., yarn 1 used to skip this) — bail safely.
const projectRoot = process.env.INIT_CWD;
if (!projectRoot || !fs.existsSync(projectRoot)) {
  printHintFallback();
  process.exit(0);
}

// Don't auto-init when the package is being installed inside another
// package's `node_modules` (a transitive dep). INIT_CWD would be the
// transitive consumer's project root, not ours — we'd scaffold their repo.
//
// Detecting "transitive" reliably is harder than it looks: when a user runs
// `npm install @seoagent-official/seoagent` in a fresh project, npm 7+ runs
// THIS postinstall BEFORE writing the new dep to INIT_CWD/package.json. So
// "is our package name in INIT_CWD/package.json" is false-negative-prone and
// silently kills the captive install moment on every fresh install — which
// is exactly the case we most need it to fire on.
//
// Instead: look at sibling node_modules entries. If ANY of them declares us
// as a dependency, we're being dragged in transitively → bail. Otherwise
// we're a direct install (or no one else needs us yet) → proceed.
// We still consult package.json as a positive signal (e.g. for repeat installs
// where the dep is already saved), since it strengthens the "direct" conclusion.
if (!isDirectInstall(projectRoot)) {
  // Most likely transitive — bail silently.
  process.exit(0);
}

// Already scaffolded? No need to rerun init.
const scaffoldMarker = path.join(projectRoot, '.seoagent', 'project.md');
if (fs.existsSync(scaffoldMarker)) {
  printAlreadyScaffoldedNotice(projectRoot);
  process.exit(0);
}

// -----------------------------------------------------------------------------
// Run init from the user's project root.
// -----------------------------------------------------------------------------

const binPath = path.join(__dirname, 'index.js');
if (!fs.existsSync(binPath)) {
  // Shouldn't happen in a published package — index.js sits next to this
  // script in dist/. Fall back to printing the hint.
  printHintFallback();
  process.exit(0);
}

printPreInitBanner();

const result = spawnSync(process.execPath, [binPath, 'init', '--yes'], {
  cwd: projectRoot,
  stdio: 'inherit',
  env: { ...process.env, SEOAGENT_FROM_POSTINSTALL: '1' },
});

if (result.status === 0) {
  printPostInitNotice();
} else {
  // init failed — most common cause: domain not inferable in --yes mode.
  printInitFailureFallback();
}

// -----------------------------------------------------------------------------
// Helpers — direct-install detection lives in ./postinstall-lib.cjs so it can
// be unit-tested without firing the side effects above. The print functions
// stay inline because they don't have meaningful behavior to test.
// -----------------------------------------------------------------------------

function printPreInitBanner() {
  process.stdout.write(
    '\n' +
      '  ════════════════════════════════════════════════════════════════════\n' +
      '   @seoagent-official/seoagent — scaffolding your repo\n' +
      '  ════════════════════════════════════════════════════════════════════\n' +
      '\n' +
      '  This package is a one-shot scaffolder. Running `init --yes` now to\n' +
      '  create .seoagent/ + .claude/skills/seoagent/ in your repo. To skip\n' +
      '  this on future installs, set SEOAGENT_SKIP_AUTOINIT=1.\n' +
      '\n'
  );
}

function printPostInitNotice() {
  // init's outro already printed the full next-steps prompt for both
  // agents and humans. This is just the postinstall-specific cleanup
  // hint that wouldn't be relevant to someone running `npx init` directly.
  process.stdout.write(
    '\n' +
      '  Note for AGENTS and HUMANS: @seoagent-official/seoagent was added to\n' +
      '  your package.json (devDependencies) by `npm install`. You can safely\n' +
      '  remove it — its job is done. Subsequent `sync`/`login`/`status` calls\n' +
      '  run via `npx -y @seoagent-official/seoagent <cmd>` and fetch on demand.\n' +
      '\n'
  );
}

function printInitFailureFallback() {
  process.stdout.write(
    '\n' +
      '  ⚠ Auto-init didn\'t complete (most likely: domain not inferable from\n' +
      '  package.json or .env files in --yes mode). Run this in your repo\n' +
      '  root to finish setup, replacing the domain:\n' +
      '\n' +
      '    npx -y @seoagent-official/seoagent init --domain your-domain.com\n' +
      '\n'
  );
}

function printGlobalInstallHint() {
  process.stdout.write(
    '\n' +
      '  @seoagent-official/seoagent installed globally.\n' +
      '\n' +
      '  In a project repo where you want SEOAgent, run:\n' +
      '\n' +
      '    seoagent init\n' +
      '\n' +
      '  That scaffolds .seoagent/ + .claude/skills/seoagent/ in the current\n' +
      '  directory. Then open Claude Code and say "audit my site."\n' +
      '\n'
  );
}

function printOptOutNotice() {
  process.stdout.write(
    '\n' +
      '  @seoagent-official/seoagent installed (auto-init skipped via\n' +
      '  SEOAGENT_SKIP_AUTOINIT). Run `npx -y @seoagent-official/seoagent init`\n' +
      '  in your repo root to scaffold when you\'re ready.\n' +
      '\n'
  );
}

function printAlreadyScaffoldedNotice(root) {
  process.stdout.write(
    '\n' +
      '  @seoagent-official/seoagent installed. .seoagent/ already exists in\n' +
      `  ${root} — skipping auto-init.\n` +
      '\n'
  );
}

function printHintFallback() {
  process.stdout.write(
    '\n' +
      '  @seoagent-official/seoagent installed — but NOT yet scaffolded.\n' +
      '\n' +
      '  This package is a scaffolder, not a runtime dependency. Run this in\n' +
      '  your repo root to finish setup:\n' +
      '\n' +
      '    npx -y @seoagent-official/seoagent init\n' +
      '\n'
  );
}
