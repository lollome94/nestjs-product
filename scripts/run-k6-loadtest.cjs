const { spawnSync } = require('node:child_process');

const isWin = process.platform === 'win32';

const command = isWin ? 'powershell' : 'bash';
const args = isWin
  ? ['-ExecutionPolicy', 'Bypass', '-File', './scripts/run-k6-loadtest.ps1']
  : ['./scripts/run-k6-loadtest.sh'];

const result = spawnSync(command, args, {
  stdio: 'inherit',
  shell: false,
});

if (result.error) {
  console.error(result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
