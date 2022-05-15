import test from 'ava'

const routes = ['A', 'F', 'B', 'E', 'B' , 'D']


test(`Reorganize an array based on it's content, we want all B at the end`, t => {

  const bIndex = []
  const bRoutes = []
  const tmp = []
  const ctn = routes.length
  for (let i = 0; i < ctn; ++i) {
    if (routes[i] === 'B') {
      bIndex.push(i)
    }
  }
  console.log('bIndex', bIndex)
  for (let k = 0; k < ctn; ++k) {
    if (!bIndex.includes(k)) {
      tmp.push(routes[k])
    } else {
      bRoutes.push(routes[k])
    }
  }
  console.log('tmp', tmp)
  const finalRoutes = tmp.concat(bRoutes)

  t.deepEqual(finalRoutes, ['A','F', 'E', 'D', 'B', 'B'])

})
