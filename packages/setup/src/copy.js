// just copy the entire folder from ssr-vue --> templates
// excluding some of the things we don't need

const fs = require('fs-extra')
const path = require('path')
// props
const src = path.join(__dirname, '..', '..', 'ssr-vue')
const dest = path.join(__dirname, '..', 'templates', 'vite')
// list of files not to copy
const ignores = ['package.json', 'server.js']

// filter out the files we don't want
function filterFunc(src) {
  if (src.indexOf('/node_modules') > -1) {
    return false
  }
  const f = path.basename(src)
  return !(ignores.indexOf(f) > -1)
}

// wrap the whole thing in a function
function copyTemplate() {
  return fs.emptyDir(dest)
          .then(() =>
            fs.copy(src, dest, { filter: filterFunc })
          )
}


module.exports = copyTemplate

if (process.env.NODE_ENV !== 'test') {
  // just run it
  copyTemplate()
}
