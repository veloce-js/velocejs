
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

export default function(url) {
  return dirname(fileURLToPath(url))
}
