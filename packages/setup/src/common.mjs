
export const spaceInValue = (value) => {
  value = (value + '').trim()
  return !(/^[\w\s]{1,}$/.test(value))
}
