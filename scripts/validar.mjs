import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { pontuar } from './pontuar.mjs';

const { values: args } = parseArgs({ options: Object.fromEntries(
  ['project', 'url', 'figma', 'reference', 'map', 'scope', 'screen'].map(name => [name, { type: 'string' }])
)});
if (!args.url || !args.map || !args.scope || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(args.screen ?? '') ||
    Boolean(args.figma) === Boolean(args.reference)) {
  throw new Error('Informe --url, --map, --scope, --screen e exatamente um de --figma ou --reference.');
}
const project = resolve(args.project ?? '.');
const binRoot = fileURLToPath(new URL('../node_modules/', import.meta.url));
const read = file => JSON.parse(readFileSync(file, 'utf8'));
const scope = read(resolve(project, args.scope));

function run(packageName, executable, params) {
  const manifest = read(join(binRoot, packageName, 'package.json'));
  const entry = typeof manifest.bin === 'string' ? manifest.bin : manifest.bin[executable];
  return spawnSync(process.execPath, [join(binRoot, packageName, entry), ...params], {
    cwd: project, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024
  });
}

let estatica = { status: 'pendente', motivo: 'Configuração designspec.config.json ausente.' };
if (existsSync(join(project, 'designspec.config.json'))) {
  const result = run('designspec-kit', 'designspec-kit', ['check', '--format', 'json', '--fail-on', 'never', '--no-baseline']);
  estatica = result.status === 0
    ? { status: 'concluida', relatorio: JSON.parse(result.stdout) }
    : { status: 'bloqueada', motivo: result.error?.message ?? result.stderr.trim() };
}

const runtime = run('figma-delta', 'figma-delta', [
  'check', '--url', args.url, args.figma ? '--figma' : '--reference', args.figma ?? resolve(project, args.reference),
  '--mappings', resolve(project, args.map), '--format', 'html'
]);
if (runtime.status !== 0 && runtime.status !== 1) {
  throw new Error(runtime.error?.message ?? runtime.stderr.trim() ?? 'Falha na captura.');
}
const delta = JSON.parse(runtime.stdout);
const visual = pontuar(scope, delta);
const folder = join(project, 'artifacts', args.screen, new Date().toISOString().replaceAll(':', '-'));
mkdirSync(join(project, 'artifacts', args.screen), { recursive: true });
mkdirSync(folder);
const output = join(folder, 'validation-report.json');
writeFileSync(output, JSON.stringify({
  tela: args.screen, viewport: delta.viewport, visual, estatica, evidencias: delta.artifacts
}, null, 2) + '\n');
console.log(output);
