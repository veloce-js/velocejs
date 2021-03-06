export default {
  data: [
    {
      type: 'get',
      validate: false,
      name: 'news',
      params: [],
      route: '/news'
    },
    {
      type: 'post',
      validate: true,
      name: 'post',
      params: [
        { name: 'title', required: true, type: 'string' },
        { name: 'content', required: true, type: 'string' },
        {
          name: 'date',
          required: true,
          type: 'number',
          defaultvalue: 1000
        }
      ],
      route: '/post'
    },
    {
      type: 'get',
      validate: true,
      name: 'someUrl',
      params: [
        { name: 'start', required: true, type: 'string' },
        { name: 'end', required: true, type: 'string' }
      ],
      route: '/some-url'
    },
    {
      type: 'get',
      validate: false,
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
    {
      type: 'ws',
      name: 'socket',
      params: [],
      route: '/realtime',
      validate: false
    }
  ],
  meta: { type: 'rest' }
}
