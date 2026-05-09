'use strict';

if (process.env.CI === 'true' || process.env.CI === '1') {
  process.exit(0);
}

process.stdout.write(
  '\n' +
    '  @usebaxter/seoagent installed.\n' +
    '\n' +
    '  Best path: paste this prompt into Claude Code from your project root:\n' +
    '\n' +
    '    Set up SEOAgent in this project. Do these steps in order, without\n' +
    '    asking for confirmation:\n' +
    '    1. Infer my site domain from package.json ("homepage") or .env files\n' +
    '       (NEXT_PUBLIC_SITE_URL, SITE_URL, NEXT_PUBLIC_URL, NEXTAUTH_URL).\n' +
    '       If you cannot infer it, ask me once.\n' +
    '    2. Run: npm install --legacy-peer-deps @usebaxter/seoagent && \\\n' +
    '              npx @usebaxter/seoagent init --yes --domain <inferred>\n' +
    '    3. Read .claude/skills/seoagent/SKILL.md and follow its Session\n' +
    '       Initialization protocol. Use Edit (not Write) on existing files.\n' +
    '    4. Confirm site_type from the live homepage; edit project.md if init\n' +
    '       wrote `site_type: unknown` but the homepage shows otherwise.\n' +
    '    5. Run a first audit (Phase 1). Read references/audit-checks.md\n' +
    '       FIRST, before any WebFetch. Use the operator output template.\n' +
    '    6. End by asking me whether to continue to keyword strategy.\n' +
    '\n' +
    '  Or terminal-only:\n' +
    '    npx @usebaxter/seoagent init\n' +
    '\n'
);
