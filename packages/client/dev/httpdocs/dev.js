(function() {

  console.log(`start`)
  const url = 'ws://' + window.location.host + '/cheapo-hmr'
  const webSocket = new WebSocket(url)

  webSocket.onopen = function() {
    console.log('Cheapo HMR connected')
  }

  webSocket.onmessage = function(e) {
    console.log('message', e.data)
    window.location.reload(true)
  }

  fetch(window.location.href + 'veloce/contract')
    .then(res => res.json())
    .then(json => {
      console.log(json)
    })

}())
