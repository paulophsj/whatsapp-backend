import { Op } from "sequelize"
import Empresa from "../models/empresa.model.js"
import Funcionario from "../models/funcionario.model.js"
import bcryptUtil from "../utils/bcrypt.util.js"
import { validateEmail } from "../utils/regex.util.js"

export default {
        criarEmpresa: async (nome, email, password) => {
        if (!nome || !email || !password) {
            throw { status: 400, message: "Todos os campos devem ser obrigatórios." }
        }
        if (!String(nome).trim() || !String(email).trim() || !String(password).trim()) {
            throw { status: 400, message: "Todos os campos devem ser válidos." }
        }

        if (!validateEmail(email)) {
            throw { status: 400, message: "O email precisa ser válido" }
        }

        const hasEmpresa = await Empresa.findOne({
            where: {
                [Op.or]: [{ email }, { nome }]
            }
        })

        if (hasEmpresa) {
            throw { status: 400, message: "Já existe uma empresa com esse email ou nome cadastrado." }
        }

        const hasFuncionario = await Funcionario.findOne({
            where: {
                [Op.or]: [{ email }, { nome }]
            }
        })

        if (hasFuncionario) {
            throw { status: 400, message: "Já existe um funcionário com esse email ou nome cadastrado." }
        }

        const hashedPassword = await bcryptUtil.generatePassword(password)

        const newEmpresa = await Empresa.create({
            nome,
            email,
            password: hashedPassword
        })

        return newEmpresa

    },
}