export function validPhone(phone) {
  return /^1[3-9]\d{9}$/.test(phone)
}

export function validEmail(email) {
  return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(email)
}
