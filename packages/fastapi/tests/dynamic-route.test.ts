// testing the dynamic route
import test from 'ava'
import Fetch from 'node-fetch'

import { MyDynamicRoute } from './fixtures/dynamic-route-test-class'

let classInstance: MyDynamicRoute
let url: string

test.before(async () => {
  classInstance = new MyDynamicRoute()
  url = await classInstance.$start()
  // url = 'http://localhost:' + classInstance.fastApiInfo.port
})

test.after(() => {
  classInstance.$stop()
})

test(`Just test a normal url /news/* first`, async t => {
  t.plan(1)
  const _url = `${url}/news/2022/may/six/whatever-shit-that-is`
  return Fetch(_url)
          .then(res => res.text())
          .then((text: string) => {
            // console.log(_url, text)
            t.truthy(text)
          })
})

test(`Should able to use dynamic route on GET route with correct type on method`, async t => {
  t.plan(1)
  const _url = `${url}/posts/2022/5/7`
  // console.log('calling', _url)
  return Fetch(_url)
            .then(res => res.json())
            .then(json => {
              // console.log(json)
              t.truthy(json)
            })
})

test(`Test an api with mix static argument with spread argument`, async t => {

  t.plan(1)
  // @TODO found a problem if the route not match no 404 returns
  const _url = `${url}/mix-spread/shoes/socks/1024/3456`
  return Fetch(_url)
          .then(res => res.text())
          .then(text => {
            // console.log(text)
            t.true(text.indexOf('socks_1024_3456') > -1)
          })

})
