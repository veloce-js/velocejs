import { swc } from 'rollup-plugin-swc3'
import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import pkg from './package.json'
/*
import tsConfig from './tsconfig.json'
const tscConfig = {}
const excluded = ['module', 'moduleResolution', 'outDir', 'types']
for (const name in tsConfig.compilerOptions) {
  if (!excluded.includes(name)) {
    tscConfig[name] = tsConfig[name]
  }
}
*/

const sharePlugins = [
  nodePolyfills(),
  resolve({
    preferBuiltins: true
  }), // so Rollup can find `ms`
  commonjs(), // so Rollup can convert `ms` to an ES module
  swc(),
]

// first try out to build the node version
export default [
{
  input: 'src/client.ts',
  output: [{
    file: 'client.js',
    format: 'umd',
    name: 'velocejsClient'
  },{
    file: 'client.es.js',
    format: 'es'
  }],
  plugins: sharePlugins
},
{
  input: 'src/async-client.ts',
  output: [{
    file: 'async-client.js',
    format: 'umd',
    name: 'velocejsClientAsync'
  },{
    file: 'async-client.es.js',
    format: 'es'
  }],
  plugins: sharePlugins
},
{
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
	],
  plugins: [
		resolve({
      preferBuiltins: true
    }),
		commonjs(),
    swc()
	]
}]
