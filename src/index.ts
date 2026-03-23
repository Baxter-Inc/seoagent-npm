#!/usr/bin/env node

import { Command } from 'commander';
import { initCommand } from './commands/init.js';
import { statusCommand } from './commands/status.js';
import { upgradeCommand } from './commands/upgrade.js';

const program = new Command();

program
  .name('seoagent')
  .description('AI SEO agent for Claude Code')
  .version('0.1.0');

program
  .command('init')
  .description('Initialize SEOAgent project — creates .seoagent/ and installs the skill file')
  .action(initCommand);

program
  .command('status')
  .description('Show current SEO project state')
  .action(statusCommand);

program
  .command('upgrade')
  .description('Open SEOAgent Cloud pricing page')
  .action(upgradeCommand);

program.parse();
