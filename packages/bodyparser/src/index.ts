// main export interface
import { bodyParser } from './body-parser'
// this way the default is bodyparser and if wanted we can named import the others
export default bodyParser
export { getHeaders } from './utils'
export {
  parse as parseMultipart, // rename it  
  getBoundary
} from './parse-multipart'
