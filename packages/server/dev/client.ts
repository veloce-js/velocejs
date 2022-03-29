// different way to call
import Fetch from 'node-fetch'

const url = `http://localhost:${process.env.PORT}`

/*
  Fetch(`http://localhost:${process.env.PORT}/hello?a=b&c=d`)
    .then(res =>  res.text())
    .then(text => {
      console.log(text)
    })
*/

const todo = {name: 'John', value: 'something'}

Fetch(`${url}/submit`, {
  method: 'POST',
  body: JSON.stringify(todo),
  headers: { 'Content-Type': 'application/json' }
})
.then(res => res.text())
.then(text => {
  console.log(text)
})
