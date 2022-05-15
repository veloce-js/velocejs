(function() {

  console.log(`Hello world`)
  setTimeout(() => {
    var target = document.getElementById('target')
    target.innerHTML = 'Hello World'
    // console.log(document.location.host)
    const webSocket = new WebSocket('ws://' + document.location.host + '/realtime/hello')

    webSocket.onopen = function open() {
      console.log('socket is connected')
    }

    webSocket.onmessage = function message(msg) {
      target.innerHTML  = 'server: ' + msg.data
      // webSocket.send('Hello back')
    }

    const button = document.getElementById('send')
    const input = document.getElementById('input')

    button.onclick = (e) => {
      e.preventDefault()
      console.log('I click the button', input.value)

      webSocket.send(input.value)
    }


  }, 500)
}())
