import { existsSync, readFileSync, mkdirSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

export interface ProjectState {
  domain: string;
  site_type: string;
  goal: string;
  language: string;
  initialized_at: string;
  seoagent_version: string;
}

export interface StatusSummary {
  domain: string;
  audit: { exists: boolean; date?: string; issueCount?: number } | null;
  strategy: { exists: boolean; clusterCount?: number; articleCount?: number } | null;
  briefs: { exists: boolean; count?: number } | null;
  content: { exists: boolean; count?: number } | null;
  roadmap: { exists: boolean; updatedAt?: string } | null;
}

const SEOAGENT_DIR = '.seoagent';

export function getSeoagentDir(projectDir: string): string {
  return join(projectDir, SEOAGENT_DIR);
}

export function projectExists(projectDir: string): boolean {
  return existsSync(join(getSeoagentDir(projectDir), 'project.json'));
}

export function readProject(projectDir: string): ProjectState | null {
  const filePath = join(getSeoagentDir(projectDir), 'project.json');
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

export function writeProject(projectDir: string, state: ProjectState): void {
  const dir = getSeoagentDir(projectDir);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'project.json'), JSON.stringify(state, null, 2), 'utf-8');
}

export function initDirectories(projectDir: string): void {
  const base = getSeoagentDir(projectDir);
  const dirs = ['audit', 'strategy/clusters', 'briefs', 'content', 'performance'];
  for (const d of dirs) {
    mkdirSync(join(base, d), { recursive: true });
  }
}

export function getStatusSummary(projectDir: string): StatusSummary | null {
  const project = readProject(projectDir);
  if (!project) return null;

  const base = getSeoagentDir(projectDir);

  let audit: StatusSummary['audit'] = null;
  const auditPath = join(base, 'audit', 'latest.json');
  if (existsSync(auditPath)) {
    try {
      const data = JSON.parse(readFileSync(auditPath, 'utf-8'));
      const total = data.summary
        ? data.summary.critical + data.summary.high + data.summary.medium + data.summary.low
        : 0;
      audit = { exists: true, date: data.audited_at, issueCount: total };
    } catch {
      audit = { exists: true };
    }
  }

  let strategy: StatusSummary['strategy'] = null;
  const clustersDir = join(base, 'strategy', 'clusters');
  if (existsSync(clustersDir)) {
    const files = readdirSync(clustersDir).filter(f => f.endsWith('.json'));
    let articleCount = 0;
    for (const f of files) {
      try {
        const data = JSON.parse(readFileSync(join(clustersDir, f), 'utf-8'));
        articleCount += data.articles?.length ?? 0;
      } catch { /* skip malformed */ }
    }
    if (files.length > 0) {
      strategy = { exists: true, clusterCount: files.length, articleCount };
    }
  }

  let briefs: StatusSummary['briefs'] = null;
  const briefsDir = join(base, 'briefs');
  if (existsSync(briefsDir)) {
    const files = readdirSync(briefsDir).filter(f => f.endsWith('.json'));
    if (files.length > 0) {
      briefs = { exists: true, count: files.length };
    }
  }

  let content: StatusSummary['content'] = null;
  const inventoryPath = join(base, 'content', 'inventory.json');
  if (existsSync(inventoryPath)) {
    try {
      const data = JSON.parse(readFileSync(inventoryPath, 'utf-8'));
      content = { exists: true, count: data.articles?.length ?? 0 };
    } catch {
      content = { exists: true };
    }
  }

  let roadmap: StatusSummary['roadmap'] = null;
  const roadmapPath = join(base, 'roadmap.md');
  if (existsSync(roadmapPath)) {
    const stat = statSync(roadmapPath);
    roadmap = { exists: true, updatedAt: stat.mtime.toISOString() };
  }

  return { domain: project.domain, audit, strategy, briefs, content, roadmap };
}
