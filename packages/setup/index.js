// entry
#!/usr/bin/env node
// import path from "node:path";
// import minimist from "minimist";
// import { Plop, run } from "plop";

const path = require('path')
const minimist = require('minimist')
const { Plop, run } = require('plop')
// const { dirname, join } = require('path')
// const { fileURLToPath } = require('url')

const args = process.argv.slice(2)
const argv = minimist(args)

// import { dirname } from "node:path";
// import { fileURLToPath } from "node:url";
// const __dirname = dirname(fileURLToPath(import.meta.url));

Plop.prepare({
  cwd: argv.cwd,
  configPath: path.join(__dirname, 'plopfile.js'),
  preload: argv.preload || [],
  completion: argv.completion
}, env => Plop.execute(env, (env) => {
  const options = {
    ...env,
    dest: process.cwd()
  }

  return run(options, undefined, true)
}))
