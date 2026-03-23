import { exec } from 'child_process';
import { readProject } from '../lib/local-state.js';

export function upgradeCommand(): void {
  const cwd = process.cwd();
  const project = readProject(cwd);
  const domain = project?.domain ?? '';

  const url = `https://seoagent.com/pricing?ref=cli${domain ? `&domain=${encodeURIComponent(domain)}` : ''}`;

  console.log(`\n  Opening SEOAgent Cloud pricing...\n`);
  console.log(`  URL: ${url}\n`);

  const cmd = process.platform === 'darwin'
    ? `open "${url}"`
    : process.platform === 'win32'
      ? `start "${url}"`
      : `xdg-open "${url}"`;

  exec(cmd, err => {
    if (err) {
      console.log(`  Could not open browser. Visit the URL above to upgrade.\n`);
    }
  });
}
