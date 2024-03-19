export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isEgyptianPhoneNumber(phoneNumber) {
  const egyptianPhoneRegex = /^(?:\+?20|0)?1(0|1|2|5)\d{8}$/;
  return egyptianPhoneRegex.test(phoneNumber);
}