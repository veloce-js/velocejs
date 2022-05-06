// individualy test the url stuff here
import test from 'ava'
import { UrlPattern } from '../src/urls'

test(`it will throw if we pass a wrong pattern url`, t => {
  t.throws(() => new UrlPattern('/:something/:id'))
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
