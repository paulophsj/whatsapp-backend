import { Op } from "sequelize"
import { generateRandomPassword } from "../utils/generateRandomPassword.util.js"
import bcryptUtil from "../utils/bcrypt.util.js"
import nodemailerUtil from "../utils/nodemailer.util.js"
import Empresa from "../models/empresa.model.js"
import Funcionario from "../models/funcionario.model.js"
import { validateEmail } from "../utils/regex.util.js"

export default {
    criarFuncionario: async (nome, email, empresa_id) => {
        if(!nome || !email){
            throw {status: 400, message: "Todos os campos são obrigatórios."}
        }
        if(!String(nome).trim() || !String(email).trim()){
            throw {status: 400, message: "Os campos não podem ser vazios."}
        }
        if(!validateEmail(email)){
            throw {stauts: 400, message: "O email precisa ser válido"}
        }

        const hasFuncionario = await Funcionario.findOne({
            where: {
                [Op.or]: [{nome}, {email}]
            }
        })

        if(hasFuncionario){
            throw {status: 400, message: "Já existe um funcionário com esse nome ou email."}
        }

        const hasEmpresa = await Empresa.findOne({
            where: {
                [Op.or]: [{nome}, {email}]
            }
        })

        if(hasEmpresa){
            throw {status: 400, message: "Já existe uma empresa com esse nome ou email."}
        }

        //Criação de funcionário com senha aleatória
        const randomPassword = generateRandomPassword()
        const hashPassword = await bcryptUtil.generatePassword(randomPassword)

        const newFuncionario = await Funcionario.create({
            empresa_id,
            nome,
            email,
            password: hashPassword
        })

        nodemailerUtil.enviarEmailTexto(email, "Bem vindo ao nosso sistema!", `Sua senha de primeiro acesso é: ${randomPassword}`)

        return newFuncionario
    }
}