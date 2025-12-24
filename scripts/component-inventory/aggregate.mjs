import fs from 'fs';
import path from 'path';
import { Validator } from '@cfworker/json-schema';

const ROOT = process.cwd();
const SCHEMA_PATH = path.join(ROOT, 'COMPONENTS.schema.json');
const REGISTRY_FILENAME = 'component-inventory.json';

function readJson(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

function validateRegistry(registry, schema) {
  const validator = new Validator(schema);
  const result = validator.validate(registry);
  if (!result.valid) {
    const details = (result.errors || [])
      .map((error) => `- ${error.instanceLocation} ${error.error}`)
      .join('\n');
    throw new Error(`component-inventory.json failed schema validation.\n${details}`);
  }
}

function ensureUniqueId(existing, proposed) {
  if (!existing.has(proposed)) {
    existing.add(proposed);
    return proposed;
  }
  let counter = 2;
  let next = `${proposed}-${counter}`;
  while (existing.has(next)) {
    counter += 1;
    next = `${proposed}-${counter}`;
  }
  existing.add(next);
  return next;
}

const args = process.argv.slice(2);
const repoPaths = args.filter((arg) => !arg.startsWith('--'));
const outDirIndex = args.findIndex((arg) => arg === '--out-dir');
const outDir = outDirIndex >= 0 ? args[outDirIndex + 1] : path.join(ROOT, 'component-inventory');

if (repoPaths.length === 0) {
  console.error('ERROR: Provide one or more repo paths.');
  process.exit(1);
}

if (!outDir || outDir.startsWith('--')) {
  console.error('ERROR: --out-dir requires a value.');
  process.exit(1);
}

const schema = readJson(SCHEMA_PATH);
const aggregated = [];
const edges = [];
const nodes = [];
const seenIds = new Set();

for (const repoPath of repoPaths) {
  const resolvedRepoPath = path.resolve(repoPath);
  const registryPath = path.join(resolvedRepoPath, REGISTRY_FILENAME);
  if (!fs.existsSync(registryPath)) {
    console.warn(`WARN: Missing ${REGISTRY_FILENAME} in ${repoPath}`);
    continue;
  }

  const registry = readJson(registryPath);
  try {
    validateRegistry(registry, schema);
  } catch (error) {
    console.error(`ERROR: ${repoPath} ${error instanceof Error ? error.message : String(error)}`);
    process.exit(1);
  }

  for (const component of registry.components) {
    const baseId = component.id || `${registry.repo.name}/${component.name}`;
    const id = ensureUniqueId(seenIds, baseId);
    aggregated.push({ ...component, id, repo: registry.repo.name });
    nodes.push({ id, name: component.name, type: component.type, repo: registry.repo.name });
    for (const dependency of component.dependencies || []) {
      edges.push({ from: dependency, to: id });
    }
  }
}

const updated = new Date().toISOString();
const indexPayload = {
  updated,
  components: aggregated,
};
const graphPayload = {
  updated,
  nodes,
  edges,
};

fs.mkdirSync(outDir, { recursive: true });
const outIndexPath = path.join(outDir, 'component-inventory.index.json');
const outGraphPath = path.join(outDir, 'component-inventory.graph.json');

fs.writeFileSync(outIndexPath, JSON.stringify(indexPayload, null, 2) + '\n');
fs.writeFileSync(outGraphPath, JSON.stringify(graphPayload, null, 2) + '\n');

console.log(`Wrote ${path.relative(ROOT, outIndexPath).replace(/\\/g, '/')}`);
console.log(`Wrote ${path.relative(ROOT, outGraphPath).replace(/\\/g, '/')}`);
