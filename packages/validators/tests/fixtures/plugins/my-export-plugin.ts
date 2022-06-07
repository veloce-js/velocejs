
// re-test the exportable plugins here

export default {
  name: 'myExportPlugin',
  main(value: string) {
    return value !== 'silly'
  }
}
