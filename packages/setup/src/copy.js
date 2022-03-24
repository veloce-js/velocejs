// just copy the entire folder from ssr-vue --> templates
// excluding some of the things we don't need

const fs = require('fs-extra')
const { join, basename } = require('path')
// props
const src = join(__dirname, '..', '..', 'ssr-vue')
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

// wrap the whole thing in a function
function copyTemplate() {
  const vitetplDir = join(tplDir, 'vite')

  return fs.emptyDir(vitetplDir)
          .then(() => // copy the whole folder
            Promise.all([
              fs.copy(src, vitetplDir, { filter: filterFunc }),
              fs.copy(join(src, 'package.json'), join(tplDir, 'package.json'))
            ])
          )

}


module.exports = copyTemplate

if (process.env.NODE_ENV !== 'test') {
  // just run it
  copyTemplate()
}
