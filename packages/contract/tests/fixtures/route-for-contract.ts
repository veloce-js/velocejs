
export const routeForContract = [
  { name: 'news', params: [], method: 'get', route: '/news' },
  {
    name: 'posts',
    params: [
      { name: 'title', required: true, type: 'string' },
      { name: 'content', required: true, type: 'string' },
      {
        name: 'date',
        required: true,
        type: 'any',
        defaultvalue: undefined
      }
    ],
    method: 'post',
    route: '/post'
  },
  { name: 'archive',
    params: [
      {
        name: 'dates',
        required: true,
        tstype: 'RestElement',
        type: 'array',
        types: 'number',
        typeParams: { elemType: 'TsKeywordType', kind: 'number' }
      }
    ],
    method: 'get',
    route: '/archive/:year/:month/:day'
  },
  { name: 'socket', params: [], method: 'ws', route: '/realtime' }
]

export const astMap = routeForContract.map((route: any) => {
  return {[route.name]: route.params }
}).reduce((a: any, b: any) => Object.assign(a, b), {})
