'use strict';

// =============================================================================
// postinstall-lib — pure helpers used by postinstall-hint.cjs
//
// Lives in its own file (instead of inline in postinstall-hint.cjs) for two
// reasons:
//   1. Unit-testable. The main script has top-level side effects
//      (process.exit, spawnSync) that fire on require — splitting the pure
//      logic out means vitest can require THIS file safely.
//   2. The regression we're guarding against is subtle: npm 7+ writes the
//      newly-installed package to the parent's package.json AFTER running
//      the package's postinstall script. So the old "is our name in
//      INIT_CWD/package.json" check returned false on every fresh install,
//      silently killing the captive moment we built the package around.
//      Tests for THIS file pin the corrected behavior in place.
// =============================================================================

const fs = require('fs');
const path = require('path');

const PKG_NAME = '@seoagent-official/seoagent';

/**
 * Decide whether this postinstall is firing for a DIRECT install (user/agent
 * explicitly added us) vs a TRANSITIVE install (we're a dep of someone else's
 * dep). Returns true ⇒ scaffold; false ⇒ silent bail.
 *
 * Strategy is two-step because both signals alone are unreliable:
 *   1. POSITIVE — INIT_CWD/package.json already lists us. Confirms direct
 *      (but is FALSE on the most common case: first-time `npm install <us>`,
 *      because npm 7+ writes package.json AFTER lifecycle scripts).
 *   2. NEGATIVE — Look at every sibling under INIT_CWD/node_modules and check
 *      if any of THEIR package.json lists us as a dep. If yes → transitive.
 *      If no → direct (or top-level install with no other consumer yet).
 *
 * If both are inconclusive (e.g. no package.json at all because the user ran
 * `npm install <us>` in an empty dir), default to "direct" — scaffolding is
 * the whole point of the package and the existing `.seoagent/project.md`
 * idempotency guard prevents double-scaffolding on subsequent runs.
 */
function isDirectInstall(root) {
  if (!root) return true; // No INIT_CWD: nothing else we can check; scaffold.
  if (declaredInProjectJson(root)) return true;
  if (anySiblingDependsOnUs(root)) return false;
  return true;
}

function declaredInProjectJson(root) {
  try {
    const pkgPath = path.join(root, 'package.json');
    if (!fs.existsSync(pkgPath)) return false;
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
    const all = mergeAllDepKinds(pkg);
    return PKG_NAME in all;
  } catch {
    return false;
  }
}

function anySiblingDependsOnUs(root) {
  try {
    const nm = path.join(root, 'node_modules');
    if (!fs.existsSync(nm)) return false;
    for (const entry of fs.readdirSync(nm, { withFileTypes: true })) {
      if (!entry.isDirectory() || entry.name.startsWith('.')) continue;
      // Scoped packages: recurse one level.
      if (entry.name.startsWith('@')) {
        const scopeDir = path.join(nm, entry.name);
        let scoped;
        try {
          scoped = fs.readdirSync(scopeDir, { withFileTypes: true });
        } catch {
          continue;
        }
        for (const inner of scoped) {
          if (!inner.isDirectory()) continue;
          // Skip ourselves.
          if (entry.name === '@seoagent-official' && inner.name === 'seoagent') continue;
          if (pkgListsUs(path.join(scopeDir, inner.name, 'package.json'))) return true;
        }
        continue;
      }
      if (pkgListsUs(path.join(nm, entry.name, 'package.json'))) return true;
    }
    return false;
  } catch {
    return false;
  }
}

function pkgListsUs(pkgJsonPath) {
  try {
    if (!fs.existsSync(pkgJsonPath)) return false;
    const pkg = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf-8'));
    return PKG_NAME in mergeAllDepKinds(pkg);
  } catch {
    return false;
  }
}

function mergeAllDepKinds(pkg) {
  return {
    ...(pkg.dependencies || {}),
    ...(pkg.devDependencies || {}),
    ...(pkg.optionalDependencies || {}),
    ...(pkg.peerDependencies || {}),
  };
}

module.exports = {
  PKG_NAME,
  isDirectInstall,
  declaredInProjectJson,
  anySiblingDependsOnUs,
  pkgListsUs,
};
