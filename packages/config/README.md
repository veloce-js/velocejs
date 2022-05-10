# @jsonql/config

Reading the project configuration files in various format and provide to different modules.

## veloce.config.js

This is the default file name; we also support `veloce.config.ts`

For compatib

```js
// cjs style
module.exports = {
  contract: {
    cacheDir: '/path/to/cacheDir'
  }
}
```
or in ts
```ts
export default {
  contract: {
    cacheDir: '/path/to/cacheDir'
  }
}
```

---

[Joel Chu](https://joelchu.com) (c) 2022
