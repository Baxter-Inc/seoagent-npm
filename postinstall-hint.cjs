'use strict';

if (process.env.CI === 'true' || process.env.CI === '1') {
  process.exit(0);
}

process.stdout.write(
  '\n  @usebaxter/seoagent — Run setup (installs skill + .seoagent/):\n' +
    '    npx @usebaxter/seoagent init\n' +
    '  Or one line from project root:\n' +
    '    npm install @usebaxter/seoagent && npx @usebaxter/seoagent init\n\n'
);
