export function generateRandomPassword() {
    const randomNumbers = Math.random().toFixed(3).slice(2, 5)

    const randomString = Array.from({ length: 3 }).map(() => {
        return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
    })

    return [...randomNumbers, ...randomString].sort(() => Math.random() - 0.5).join('')
}