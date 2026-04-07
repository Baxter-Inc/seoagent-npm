'use strict';

if (process.env.CI === 'true' || process.env.CI === '1') {
  process.exit(0);
}

process.stdout.write(
  '\n  @usebaxter/seoagent — Next step: npx @usebaxter/seoagent init\n' +
    '  (Creates .seoagent/ and installs the Claude skill.)\n\n'
);
