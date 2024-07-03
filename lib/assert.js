export function assert(condition, errorMessage = '') {
  if (condition) return
  throw new Error(errorMessage)
}
