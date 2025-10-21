export function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}
export function validatePhone(phone) {
    return /^\d{12}@c\.us$/.test(phone)
}