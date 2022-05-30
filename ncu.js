// util cli to upgrade the packages recursively
const { join } = require('node:path')
const glob = require('glob')

const { spawn } = require('node:child_process')
const projectRoot = __dirname
const pkgsDir = join(projectRoot, 'packages')

// just stick it here
function chainProcessPromises(
  promises
) {
  const initPromise = promises[0]
  promises.shift()

  return (...args) => (
      promises.reduce((promiseChain, currentTask) => (
        promiseChain.then((chainResult) => (
          currentTask(chainResult)
        )
      )
    ), Reflect.apply(initPromise, null, args))
  )
}

// loop through the top level of packages folder
glob(join(pkgsDir, '*'), (err, files) => {
  if (err) {
    return console.error('ERROR:', err)
  }
  files.push(projectRoot)
  // we want to run them one after the other
  const fns = files.map(cwd => {
    return (lastValue) => {
      // change the cmd to that packages root then run `ncu -u`
      const ps = spawn('ncu', ['-u', '--packageFile', join(cwd, 'package.json')])
      console.log('in', cwd)
      return new Promise((resolver, rejecter) => {
        ps.stdout.on('data', data => console.log(data.toString()))

        ps.on('close', (code) => {
          if (code !== 0) {
            return rejecter(code)
          }
          console.log('done', code)
          resolver(code)
        })
      })
    }
  })

  const ex = chainProcessPromises(fns)
  ex(0).then(result => {
    console.log('done', result)
    // exit and back to the project root

    // run pnpm install

    // done
  })
  .catch(err => {
    console.log('something went wrong!', err)
  })
})
