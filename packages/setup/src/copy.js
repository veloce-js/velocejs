// just copy the entire folder from ssr-vue --> templates
// excluding some of the things we don't need
import fs from 'fs-extra'
import { join, basename } from 'path'
import getDirname from './dirname.js'

const __dirname = getDirname(import.meta.url)
// props
const packagesDir = join(__dirname, '..', '..')
const src = join(packagesDir, 'ssr-vue')
const srvDir = join(packagesDir, 'server')
const tplDir = join(__dirname, '..', 'templates')

// list of files not to copy
const ignores = ['package.json', 'server.js']

// filter out the files we don't want
function filterFunc(src) {
  if (src.indexOf('/node_modules') > -1) {
    return false
  }
  const f = basename(src)

  return !(ignores.indexOf(f) > -1)
}

// this need to handle differently because
// we need to modify the version number in the deps
export async function copyPkgJson() {
  const file = 'package.json'

  return Promise.all([
      fs.readJson(join(src, file)),
      fs.readJson(join(srvDir, file))
    ])
    .then(pkgs => {
      const version = pkgs[1].version
      const json = pkgs[0]
      json.dependencies['@velocejs/server'] = version
      return json
    })
    .then(json =>
      fs.writeJson(join(tplDir, 'package.tpl.json'), json, { spaces: 2 })
    )
}

// wrap the whole thing in a function
export async function copyTemplate() {
  const vitetplDir = join(tplDir, 'vite')

  return fs.emptyDir(vitetplDir)
          .then(() => // copy the whole folder
            fs.copy(src, vitetplDir, { filter: filterFunc })
          )
}

// wrapper to run them all
export async function copyAll() {

  return copyTemplate()
    .then(() => copyPkgJson())
}

if (process.env.NODE_ENV !== 'test') {
  // just run it
  copyAll()
}
