export default {
  data: [
    { type: 'get', name: 'news', params: [], route: '/news' },
    {
      type: 'post',
      name: 'post',
      params: [
        { name: 'title', required: true, type: 'string' },
        { name: 'content', required: true, type: 'string' },
        {
          name: 'date',
          required: true,
          type: 'number',
          defaultvalue: 1000,
          rules: [ { plugin: 'moreThan', num: 1000, name: 'date' } ]
        }
      ],
      route: '/post'
    },
    {
      type: 'get',
      name: 'archive',
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
      route: '/archive/:year/:month/:day'
    },
    { type: 'ws', name: 'socket', params: [], route: '/realtime' }
  ],
  meta: { type: 'rest' }
}
