
import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

export default function getDirname(url) {
  return dirname(fileURLToPath(url))
}
