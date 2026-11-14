import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'yaml';

// Shared by the workflow and repository-config tests. Not a test file itself
// (Vitest only collects *.test.ts), so importing it registers no tests.

export const WORKFLOW_DIR = '.github/workflows';
export const ACTIONS_DIR = '.github/actions';

/** Parses one workflow file from .github/workflows, e.g. loadWorkflow('ci.yml'). */
export function loadWorkflow(name: string): any {
  return parse(readFileSync(join(WORKFLOW_DIR, name), 'utf8'));
}

/** Parses a local composite action, e.g. loadAction('setup'). */
export function loadAction(name: string): any {
  return parse(readFileSync(join(ACTIONS_DIR, name, 'action.yml'), 'utf8'));
}

function yamlFilesUnder(dir: string): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { recursive: true, withFileTypes: true })
    .filter((e) => e.isFile() && /\.ya?ml$/.test(e.name))
    .map((e) => join(e.parentPath, e.name));
}

/** Every workflow and local action file, as raw text, for checks that don't need parsing. */
export function rawWorkflows(): { file: string; text: string }[] {
  return [...yamlFilesUnder(WORKFLOW_DIR), ...yamlFilesUnder(ACTIONS_DIR)].map((file) => ({
    file,
    text: readFileSync(file, 'utf8'),
  }));
}

/** Every step of every job in a parsed workflow, with its job id. */
export function allSteps(workflow: any): { job: string; step: any }[] {
  return Object.entries(workflow.jobs ?? {}).flatMap(([job, def]: [string, any]) =>
    (def.steps ?? []).map((step: any) => ({ job, step })),
  );
}
