import { getStatusSummary } from '../lib/local-state.js';

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}

export function statusCommand(): void {
  const cwd = process.cwd();
  const summary = getStatusSummary(cwd);

  if (!summary) {
    console.log('\n  No SEOAgent project found in this directory.');
    console.log('  Run `seoagent init` to get started.\n');
    return;
  }

  console.log(`\n  SEOAgent Status for ${summary.domain}\n`);

  if (summary.audit?.exists) {
    const date = summary.audit.date ? timeAgo(summary.audit.date) : 'unknown';
    const issues = summary.audit.issueCount ?? 0;
    console.log(`  Audit:     last run ${date} (${issues} issues found)`);
  } else {
    console.log('  Audit:     not yet run');
  }

  if (summary.strategy?.exists) {
    console.log(`  Strategy:  ${summary.strategy.clusterCount} topic clusters, ${summary.strategy.articleCount} article ideas`);
  } else {
    console.log('  Strategy:  not yet created');
  }

  if (summary.briefs?.exists) {
    console.log(`  Briefs:    ${summary.briefs.count} ready`);
  } else {
    console.log('  Briefs:    none created');
  }

  if (summary.content?.exists) {
    console.log(`  Content:   ${summary.content.count} articles written`);
  } else {
    console.log('  Content:   no articles yet');
  }

  if (summary.roadmap?.exists) {
    const date = summary.roadmap.updatedAt ? timeAgo(summary.roadmap.updatedAt) : 'unknown';
    console.log(`  Roadmap:   .seoagent/roadmap.md (updated ${date})`);
  } else {
    console.log('  Roadmap:   not yet created');
  }

  console.log('\n  Upgrade to SEOAgent Cloud for real keyword data and autopilot:');
  console.log('  Run `seoagent upgrade`\n');
}
