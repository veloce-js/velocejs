// individualy test the url stuff here
import test from 'ava'
import { UrlPattern } from '../src/url-pattern'

test(`Simple check url is dynamic or not`, t => {
  t.true(UrlPattern.check('/post/:id'))
  t.false(UrlPattern.check('/posts/something'))
})

test(`it will throw if we pass a wrong pattern url`, t => {
  t.throws(() => new UrlPattern('/:something/:id'))
})

test(`Testing a pattern that failed on FastApi`, t => {
  const urlObj = new UrlPattern('/mix-spread/:category/:subcategory/:id/:subcatid')
  const params = urlObj.parse('/mix-spread/shoes/socks/1024/3456')

  t.deepEqual(urlObj.names, ['category', 'subcategory', 'id', 'subcatid'])
  t.deepEqual(params, {category: 'shoes', subcategory: 'socks', id: '1024', subcatid: '3456'})

})

test(`Create a dynamic url and try to extract value from it`, t => {
  const urlObj = new UrlPattern('/post/:year/:month/:day')
  t.is(urlObj.route, '/post/*')
  // here is a problem if there is anything more than the pattern below
  // it will return null
  const params = urlObj.parse('/post/2022/05/06')
  t.deepEqual(params, {year: '2022', month: '05', day: '06'})
})

test(`Test the optional pattern`, t => {
  const urlObj1 = new UrlPattern('/posts/:year/:month/:day(/:slug)')
  t.is(urlObj1.route, '/posts/*')

  const params = urlObj1.parse('/posts/2022/05/06')
  t.deepEqual(params, {year: '2022', month: '05', day: '06'})

  const params1 = urlObj1.parse('/posts/2022/05/06/something-else')
  t.is(params1.slug, 'something-else')
})

test(`Test another style of url and see we could get the names in order`, t => {
  const urlObj = new UrlPattern('/something/whatever/:year/:month(/:day)')
  t.is(urlObj.names.length , 3)
})
