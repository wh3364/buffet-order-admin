/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'assistant']
  return valid_map.indexOf(str.trim()) >= 0
}

export function validName(str) {
  return /^.{1,20}$/g.test(str.trim())
}

export function validWeight(str) {
  return /^\d{1,3}$/g.test(str)
}

export function validFoodNote(str) {
  return /^.{0,20}$/g.test(str)
}

export function validFoodPrice(str) {
  return /^([1-9]+[\d]*(.[0-9]{1,2})?)$/g.test(str)
}

export function validFoodDetailPrice(str) {
  return /^([0-9]+[\d]*(.[0-9]{1,2})?)$/g.test(str)
}
