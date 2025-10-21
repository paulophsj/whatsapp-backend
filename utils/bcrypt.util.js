import bcrypt from "bcryptjs"

const salt = await bcrypt.genSalt(10)

export default {
    generatePassword: async (password) => {
        return await bcrypt.hash(password, salt)
    },
    comparePassword: async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword)
    }
}