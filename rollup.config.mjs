import path from 'node:path';
import { readFileSync } from 'node:fs';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import _ from 'lodash';

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'));
const input = './src/index.ts'
const outputDir = './dist';

export default [
  {
    input,
    output: {
      file: path.resolve(outputDir, `${pkg.name}.browser.js`),
      format: 'iife',
      name: _.camelCase(pkg.name),
      sourcemap: true,
    },
    plugins: [typescript()]
  },
  {
    input,
    output: {
      file: path.resolve(outputDir, `${pkg.name}.browser.prod.js`),
      format: 'iife',
      name: _.camelCase(pkg.name),
      sourcemap: true,
    },
    plugins: [typescript(), terser()]
  },
  {
    input,
    output: {
      file: path.resolve(outputDir, `${pkg.name}.esm-browser.js`),
      format: 'es',
      sourcemap: true,
    },
    plugins: [typescript()]
  },
  {
    input,
    output: {
      file: path.resolve(outputDir, `${pkg.name}.esm-browser.prod.js`),
      format: 'es',
      sourcemap: true,
    },
    plugins: [typescript(), terser()]
  }
];