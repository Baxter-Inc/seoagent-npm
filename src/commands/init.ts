import { createInterface } from 'readline';
import { projectExists, writeProject, initDirectories, type ProjectState } from '../lib/local-state.js';
import { installSkillFile } from '../lib/skill-installer.js';
import { submitEmailLead } from '../lib/email-capture.js';

function prompt(question: string): Promise<string> {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => {
    rl.question(question, answer => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

export async function initCommand(): Promise<void> {
  const cwd = process.cwd();

  if (projectExists(cwd)) {
    console.log('\n  SEOAgent project already exists in this directory.');
    console.log('  Run `seoagent status` to see your project state.\n');
    return;
  }

  console.log('\n  🔍 SEOAgent — AI SEO Agent\n');

  const domain = await prompt('  What is your website domain? (e.g., example.com): ');
  if (!domain) {
    console.log('  Domain is required. Exiting.\n');
    process.exit(1);
  }

  const siteType = await prompt('  Site type? (saas / ecommerce / blog / local / other): ');
  const goal = await prompt('  Primary SEO goal? (traffic / leads / brand / sales): ');

  const project: ProjectState = {
    domain,
    site_type: siteType || 'other',
    goal: goal || 'traffic',
    language: 'en',
    initialized_at: new Date().toISOString(),
    seoagent_version: '0.1.0',
  };

  initDirectories(cwd);
  writeProject(cwd, project);

  const skillPath = installSkillFile(cwd);
  console.log(`\n  ✅ Created .seoagent/ project for ${domain}`);
  console.log(`  ✅ Installed skill file at ${skillPath}`);

  const email = await prompt('\n  Want SEO tips and product updates? Enter your email (or press Enter to skip): ');
  if (email && email.includes('@')) {
    const ok = await submitEmailLead(email, domain);
    if (ok) {
      console.log('  ✅ Subscribed! We\'ll send SEO tips, not spam.');
    }
  }

  console.log('\n  🚀 Ready! Open Claude Code and ask:');
  console.log('     "Audit my site" or "Create an SEO strategy for my site"');
  console.log('\n  Your AI SEO agent will persist all work in .seoagent/ across sessions.\n');
}
