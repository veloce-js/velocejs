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

function doPost() {
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
}

function doGet(path: string) {
  Fetch(`${url}/${path}`)
    .then(res => res.text())
    .then(text => console.log('result', text))
}

doGet('some-where')
