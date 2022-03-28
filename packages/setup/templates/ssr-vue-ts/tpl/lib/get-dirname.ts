import { dirname } from "node:path"
import { fileURLToPath } from "node:url"

export default function getDirname(url: string): string {
  return dirname(fileURLToPath(url))
}
