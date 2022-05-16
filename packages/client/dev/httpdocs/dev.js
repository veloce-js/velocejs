(function() {
  const url = 'ws://' + window.location.host + '/cheapo-hmr'
  const webSocket = new WebSocket(url)

  webSocket.onopen = function() {
    console.log('Cheapo HMR connected')
  }

  webSocket.onmessage = function(e) {
    console.log('message', e.data)
    window.location.reload(true)
  }
}())
