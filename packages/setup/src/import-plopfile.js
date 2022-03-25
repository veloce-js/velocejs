// dynamically import more plopfiles
import glob from 'glob'

/**
 * @param {string} pathToFiles where to search
 * @return {Array<unknown>} list of functions
 */
export async function importPlopfile(pathToFiles) {

  return new Promise((resolver, rejecter) => {
    // @TODO should we clean that pathToFiles via dirname
    glob(`${pathToFiles}/*.js`, options, function (er, files) {
      if (er) {
        return rejecter(er)
      }
      if (!files.length) {
        // nothing to import
        resolver(false)
      }

      resolver(
        Promise.all(
          files.map(file => import(file))
        )
      )
    })

  })
}
