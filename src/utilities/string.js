/**
 * Split a string into a list of words by upper case.
 * @param str: string
 * @returns a list of words
 * @example 'ThisIsAString' -> ['This', 'Is', 'A', 'String']
 * */
export const ToWords = (str) => {
  return str && str.split(/(?=[A-Z])/)
}
