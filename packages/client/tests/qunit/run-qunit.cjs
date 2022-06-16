
const runQunitSetup = require('./run-qunit-setup.cjs')
const config = {
  "port": 8081,
  "webroot": [
    "./qunit/webroot",
    "./qunit/files",
    "./node_modules",
    "./dist"
  ],
  "open": true,
  "reload": true,
  "testFilePattern": "*.qunit.js",
  "baseDir": "/home/joel/Projects/veloce/velocejs/packages/client/tests"
}

runQunitSetup(config)
  