import { swc } from 'rollup-plugin-swc3'
// first try out to build the node version
export default {
  input: 'src/client.ts',
  ouput: [{
    file: 'client.js',
    format: 'cjs'
  }],
  plugins: [
    swc()
  ]
}
