import { swc } from 'rollup-plugin-swc3'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

import pkg from './package.json'
// first try out to build the node version
export default [{
  input: 'src/client.ts',
  ouput: {
    file: 'client.js',
    format: 'umd',
  },
  plugins: [
		resolve(), // so Rollup can find `ms`
		commonjs(), // so Rollup can convert `ms` to an ES module
    swc()
	]
}, {
  input: 'src/index.ts',
	external: [
    '@jsonql/utils',
    '@jsonql/validators',
    'url-pattern',
    'node-fetch'
  ],
	output: [
		{ file: pkg.main, format: 'cjs' },
		{ file: pkg.module, format: 'es' }
	]
}]
