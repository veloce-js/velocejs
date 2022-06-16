// This is a helper file that hook up to the server-io-core debugger system
// to push the result back to the console to display it
// if you don't need this then just remove it from index.html file
;(function(){
  var errors = []
  var i = 0;
  QUnit.log(function(res){
    ++i;
    if (!res || !res.result){
      errors.push(res)
    }
    if (i%50 == 0) { // why 50?
      var data = {
        tests_run: i,
        tracebacks: errors,
        url : window.location.pathname
      }
      errors = [];
      console.debug(data)
    }
  })

  QUnit.done(function(results){
    results.tracebacks = errors;
    results.url = window.location.pathname;
    console.debug(results)
  })

})();
