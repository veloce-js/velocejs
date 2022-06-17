
const runQunitSetup = require('./run-qunit-setup.cjs')
const config = {
  "port": 8081,
  "webroot": [
    "/home/joel/Projects/veloce/velocejs/packages/client/tests/qunit/webroot",
    "/home/joel/Projects/veloce/velocejs/packages/client/tests/qunit/files",
    "/home/joel/Projects/veloce/velocejs/packages/client/dist"
  ],
  "open": true,
  "reload": true,
  "testFilePattern": "*.qunit.js",
  "baseDir": "/home/joel/Projects/veloce/velocejs/packages/client/tests"
}

runQunitSetup(config)
  