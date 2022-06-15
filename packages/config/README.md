# @velocejs/config

Reading the project configuration files in various format and provide to different modules.

## veloce.config.js

This is the default file name; we also support `veloce.config.cjs` (Must be in commonJs format at the moment)

For example:

```js
// cjs style
module.exports = {
  contract: {
    cacheDir: '/path/to/cacheDir'
  }
}
```

**This module is aim to use internally with our Veloce platform, not for general use.**

## Use it

```ts
import { VeloceConfig } from '@jsonql/config'
const c = new VeloceConfig()
const contractConfig = c.getConfig('contract')
// alos support dot notation path style
const cacheDir = c.getConfig('contract.cacheDir')

```

@TODO
- add the full matching of all Veloce Config options then add the `@jsonql/config-check` module
- support other file format (.ts, .json)
- read from other config file (vite!)

---

[Joel Chu](https://joelchu.com) (c) 2022
