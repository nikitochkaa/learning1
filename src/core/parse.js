export function parse(value = '') {
  if (value.startsWith(`'=`)) {
    value = value.slice(1)
    return value
  }
  if (value.startsWith('=')) {
    value = value.slice(1)
    try {
      return eval(value)
    } catch (e) {
      return value
    }
  }
  return value
}
