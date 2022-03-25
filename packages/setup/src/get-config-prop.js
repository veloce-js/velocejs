// if there is an veloce.config.js
// on the project root then we extract the properties
import fs from 'fs-extra'
import { join } from 'path'

// try to see if there is a config file presented
export async function getConfigProp(pathToRoot) {
  const pathToFile = join(pathToRoot, 'veloce.config.js')
  if (fs.existsSync(pathToFile)) {

    return await import(pathToFile)
                    .then(obj => obj.default || false)
  }

  return Promise.resolve(false)
}
