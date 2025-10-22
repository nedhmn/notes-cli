#!/usr/bin/env node

// This is a simple wrapper that uses tsx to execute the TypeScript source
// This allows running the CLI without a build step during development

import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const srcPath = join(__dirname, '../src/index.ts');
const tsxPath = join(__dirname, '../node_modules/tsx/dist/cli.mjs');

// Use tsx from cli/node_modules to run the TypeScript file directly
const child = spawn('node', [tsxPath, srcPath], {
  stdio: 'inherit',
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
