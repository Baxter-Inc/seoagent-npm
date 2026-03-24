#!/usr/bin/env node

// src/index.ts
import { Command } from "commander";

// src/commands/init.ts
import { createInterface } from "readline";

// src/lib/local-state.ts
import { existsSync, readFileSync, mkdirSync, writeFileSync, readdirSync, statSync } from "fs";
import { join } from "path";
var SEOAGENT_DIR = ".seoagent";
function getSeoagentDir(projectDir) {
  return join(projectDir, SEOAGENT_DIR);
}
function projectExists(projectDir) {
  return existsSync(join(getSeoagentDir(projectDir), "project.json"));
}
function readProject(projectDir) {
  const filePath = join(getSeoagentDir(projectDir), "project.json");
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, "utf-8"));
}
function writeProject(projectDir, state) {
  const dir = getSeoagentDir(projectDir);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "project.json"), JSON.stringify(state, null, 2), "utf-8");
}
function initDirectories(projectDir) {
  const base = getSeoagentDir(projectDir);
  const dirs = ["audit", "strategy/clusters", "briefs", "content", "performance"];
  for (const d of dirs) {
    mkdirSync(join(base, d), { recursive: true });
  }
}
function getStatusSummary(projectDir) {
  const project = readProject(projectDir);
  if (!project) return null;
  const base = getSeoagentDir(projectDir);
  let audit = null;
  const auditPath = join(base, "audit", "latest.json");
  if (existsSync(auditPath)) {
    try {
      const data = JSON.parse(readFileSync(auditPath, "utf-8"));
      const total = data.summary ? data.summary.critical + data.summary.high + data.summary.medium + data.summary.low : 0;
      audit = { exists: true, date: data.audited_at, issueCount: total };
    } catch {
      audit = { exists: true };
    }
  }
  let strategy = null;
  const clustersDir = join(base, "strategy", "clusters");
  if (existsSync(clustersDir)) {
    const files = readdirSync(clustersDir).filter((f) => f.endsWith(".json"));
    let articleCount = 0;
    for (const f of files) {
      try {
        const data = JSON.parse(readFileSync(join(clustersDir, f), "utf-8"));
        articleCount += data.articles?.length ?? 0;
      } catch {
      }
    }
    if (files.length > 0) {
      strategy = { exists: true, clusterCount: files.length, articleCount };
    }
  }
  let briefs = null;
  const briefsDir = join(base, "briefs");
  if (existsSync(briefsDir)) {
    const files = readdirSync(briefsDir).filter((f) => f.endsWith(".json"));
    if (files.length > 0) {
      briefs = { exists: true, count: files.length };
    }
  }
  let content = null;
  const inventoryPath = join(base, "content", "inventory.json");
  if (existsSync(inventoryPath)) {
    try {
      const data = JSON.parse(readFileSync(inventoryPath, "utf-8"));
      content = { exists: true, count: data.articles?.length ?? 0 };
    } catch {
      content = { exists: true };
    }
  }
  let roadmap = null;
  const roadmapPath = join(base, "roadmap.md");
  if (existsSync(roadmapPath)) {
    const stat = statSync(roadmapPath);
    roadmap = { exists: true, updatedAt: stat.mtime.toISOString() };
  }
  return { domain: project.domain, audit, strategy, briefs, content, roadmap };
}

// src/lib/skill-installer.ts
import { existsSync as existsSync2, mkdirSync as mkdirSync2, writeFileSync as writeFileSync2, readFileSync as readFileSync2 } from "fs";
import { join as join2, dirname } from "path";
import { fileURLToPath } from "url";
var __dirname = dirname(fileURLToPath(import.meta.url));
function getSkillContent() {
  const candidates = [
    join2(__dirname, "templates", "skill.md"),
    join2(__dirname, "..", "templates", "skill.md"),
    join2(__dirname, "..", "..", "src", "templates", "skill.md")
  ];
  for (const p of candidates) {
    if (existsSync2(p)) return readFileSync2(p, "utf-8");
  }
  throw new Error("Could not find skill.md template");
}
function installSkillFile(projectDir) {
  const agentsDir = join2(projectDir, ".agents", "skills", "seoagent");
  const claudeDir = join2(projectDir, ".claude", "skills");
  const useAgents = existsSync2(join2(projectDir, ".agents"));
  const targetDir = useAgents ? agentsDir : claudeDir;
  const targetFile = useAgents ? join2(agentsDir, "SKILL.md") : join2(claudeDir, "seoagent.md");
  mkdirSync2(targetDir, { recursive: true });
  writeFileSync2(targetFile, getSkillContent(), "utf-8");
  return targetFile;
}

// src/lib/email-capture.ts
var LEAD_API_URL = "https://seoagent.com/api/cli/lead";
async function submitEmailLead(email, domain) {
  try {
    const res = await fetch(LEAD_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, domain })
    });
    return res.ok;
  } catch {
    return false;
  }
}

// src/commands/init.ts
function prompt(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}
async function initCommand() {
  const cwd = process.cwd();
  if (projectExists(cwd)) {
    console.log("\n  SEOAgent project already exists in this directory.");
    console.log("  Run `seoagent status` to see your project state.\n");
    return;
  }
  console.log("\n  \u{1F50D} SEOAgent \u2014 AI SEO Agent\n");
  const domain = await prompt("  What is your website domain? (e.g., example.com): ");
  if (!domain) {
    console.log("  Domain is required. Exiting.\n");
    process.exit(1);
  }
  const siteType = await prompt("  Site type? (saas / ecommerce / blog / local / other): ");
  const goal = await prompt("  Primary SEO goal? (traffic / leads / brand / sales): ");
  const project = {
    domain,
    site_type: siteType || "other",
    goal: goal || "traffic",
    language: "en",
    initialized_at: (/* @__PURE__ */ new Date()).toISOString(),
    seoagent_version: "0.1.0"
  };
  initDirectories(cwd);
  writeProject(cwd, project);
  const skillPath = installSkillFile(cwd);
  console.log(`
  \u2705 Created .seoagent/ project for ${domain}`);
  console.log(`  \u2705 Installed skill file at ${skillPath}`);
  const email = await prompt("\n  Want SEO tips and product updates? Enter your email (or press Enter to skip): ");
  if (email && email.includes("@")) {
    const ok = await submitEmailLead(email, domain);
    if (ok) {
      console.log("  \u2705 Subscribed! We'll send SEO tips, not spam.");
    }
  }
  console.log("\n  \u{1F680} Ready! Open Claude Code and ask:");
  console.log('     "Audit my site" or "Create an SEO strategy for my site"');
  console.log("\n  Your AI SEO agent will persist all work in .seoagent/ across sessions.\n");
}

// src/commands/status.ts
function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 6e4);
  if (minutes < 60) return `${minutes} minutes ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  return `${days} days ago`;
}
function statusCommand() {
  const cwd = process.cwd();
  const summary = getStatusSummary(cwd);
  if (!summary) {
    console.log("\n  No SEOAgent project found in this directory.");
    console.log("  Run `seoagent init` to get started.\n");
    return;
  }
  console.log(`
  SEOAgent Status for ${summary.domain}
`);
  if (summary.audit?.exists) {
    const date = summary.audit.date ? timeAgo(summary.audit.date) : "unknown";
    const issues = summary.audit.issueCount ?? 0;
    console.log(`  Audit:     last run ${date} (${issues} issues found)`);
  } else {
    console.log("  Audit:     not yet run");
  }
  if (summary.strategy?.exists) {
    console.log(`  Strategy:  ${summary.strategy.clusterCount} topic clusters, ${summary.strategy.articleCount} article ideas`);
  } else {
    console.log("  Strategy:  not yet created");
  }
  if (summary.briefs?.exists) {
    console.log(`  Briefs:    ${summary.briefs.count} ready`);
  } else {
    console.log("  Briefs:    none created");
  }
  if (summary.content?.exists) {
    console.log(`  Content:   ${summary.content.count} articles written`);
  } else {
    console.log("  Content:   no articles yet");
  }
  if (summary.roadmap?.exists) {
    const date = summary.roadmap.updatedAt ? timeAgo(summary.roadmap.updatedAt) : "unknown";
    console.log(`  Roadmap:   .seoagent/roadmap.md (updated ${date})`);
  } else {
    console.log("  Roadmap:   not yet created");
  }
  console.log("\n  Upgrade to SEOAgent Cloud for real keyword data and autopilot:");
  console.log("  Run `seoagent upgrade`\n");
}

// src/commands/upgrade.ts
import { exec } from "child_process";
function upgradeCommand() {
  const cwd = process.cwd();
  const project = readProject(cwd);
  const domain = project?.domain ?? "";
  const url = `https://seoagent.com/pricing?ref=cli${domain ? `&domain=${encodeURIComponent(domain)}` : ""}`;
  console.log(`
  Opening SEOAgent Cloud pricing...
`);
  console.log(`  URL: ${url}
`);
  const cmd = process.platform === "darwin" ? `open "${url}"` : process.platform === "win32" ? `start "${url}"` : `xdg-open "${url}"`;
  exec(cmd, (err) => {
    if (err) {
      console.log(`  Could not open browser. Visit the URL above to upgrade.
`);
    }
  });
}

// src/index.ts
var program = new Command();
program.name("seoagent").description("AI SEO agent for Claude Code").version("0.1.0");
program.command("init").description("Initialize SEOAgent project \u2014 creates .seoagent/ and installs the skill file").action(initCommand);
program.command("status").description("Show current SEO project state").action(statusCommand);
program.command("upgrade").description("Open SEOAgent Cloud pricing page").action(upgradeCommand);
program.parse();
