import { existsSync, mkdirSync, writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function getSkillContent(): string {
  const candidates = [
    join(__dirname, 'templates', 'skill.md'),
    join(__dirname, '..', 'templates', 'skill.md'),
    join(__dirname, '..', '..', 'src', 'templates', 'skill.md'),
  ];
  for (const p of candidates) {
    if (existsSync(p)) return readFileSync(p, 'utf-8');
  }
  throw new Error('Could not find skill.md template');
}

export function installSkillFile(projectDir: string): string {
  const agentsDir = join(projectDir, '.agents', 'skills', 'seoagent');
  const claudeDir = join(projectDir, '.claude', 'skills');

  const useAgents = existsSync(join(projectDir, '.agents'));
  const targetDir = useAgents ? agentsDir : claudeDir;
  const targetFile = useAgents
    ? join(agentsDir, 'SKILL.md')
    : join(claudeDir, 'seoagent.md');

  mkdirSync(targetDir, { recursive: true });
  writeFileSync(targetFile, getSkillContent(), 'utf-8');

  return targetFile;
}
