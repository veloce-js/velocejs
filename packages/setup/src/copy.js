// just copy the entire folder from ssr-vue --> templates
// excluding some of the things we don't need
import fs from 'fs-extra'
import { join, basename } from 'path'
import getDirname from './dirname.js'

const __dirname = getDirname(import.meta.url)
// props
const packagesDir = join(__dirname, '..', '..')
// @TODO add more framework in the future
const frameworks = ['ssr-vue', 'ssr-vue-ts']
const srvDir = join(packagesDir, 'server')
const tplDir = join(__dirname, '..', 'templates')

// list of files not to copy
const ignores = ['package.json', 'server.js', 'pnpm-lock.yaml']

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

  return Promise.all(
    [
      fs.readJson(join(srvDir, file))
    ].concat(
      frameworks.map(fw => fs.readJson(join(packagesDir, fw, file)) )
    )
  )
    .then(pkgs => {
      const version = pkgs[0].version
      const ctn = pkgs.length
      const jsons = {}

      for (let i = 1; i < ctn; ++i ) {
        const json = pkgs[i]

        json.name = frameworks[i-1]
        // need to update the version
        json.dependencies['@velocejs/server'] = version
        // need to delete the private prop
        delete json.private
        jsons[frameworks[i-1]] = json
      }

      return jsons
    })
    .then(jsons => {
      const tasks = []
      for (let fw in jsons) {
        tasks.push(
          fs.writeJson(join(tplDir, fw, 'package.tpl.json'), jsons[fw], { spaces: 2 })
        )
      }

      return Promise.all(tasks)
    })
}

// wrap the whole thing in a function
export async function copyTemplate() {

  return Promise.all(
    frameworks.map(fw => {
      const _tplDir = join(tplDir, fw, 'tpl')

      return fs.emptyDir(_tplDir)
        .then(() => [fw, _tplDir])
    })
  ).then(dirs => Promise.all(
    dirs.map(dir => {
      const [fw, d] = dir

      return fs.copy(join(packagesDir, fw), d, {filter: filterFunc})
    })
  ))
}

// wrapper to run them all
export async function copyAll() {

  return copyTemplate()
    .then(
      () => copyPkgJson()
    )
}

if (process.env.NODE_ENV !== 'test') {
  // just run it
  copyAll()
}
