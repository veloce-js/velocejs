

export const routeForContract = {
  news: { params: [], method: 'get', route: '/news' },
  post: {
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
  archive: {
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
  socket: { params: [], method: 'ws', route: '/realtime' }
}
