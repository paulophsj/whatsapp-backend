import Empresa from "../models/empresa.model.js"
import bcryptUtil from "../utils/bcrypt.util.js"
import jwt from "jsonwebtoken"
import Funcionario from "../models/funcionario.model.js"
import { validateEmail } from "../utils/regex.util.js"

export default {
    logarEmpresa: async (email, password) => {
        if (!email || !password) {
            throw { status: 400, message: "Todos os campos são obrigatórios" }
        }
        if (!String(email).trim() || !String(password).trim()) {
            throw { status: 400, message: "Todos os campos devem ser válidos." }
        }
        if (!validateEmail(email)) {
            throw { status: 400, message: "O email precisa ser válido." }
        }

        const findEmpresaByEmail = await Empresa.findOne({
            where: { email }
        })

        if (!findEmpresaByEmail) {
            throw { status: 404, message: "Não foi possível localizar esta empresa." }
        }

        const equalsPassword = await bcryptUtil.comparePassword(password, findEmpresaByEmail.password)

        if (!equalsPassword) {
            throw { status: 400, message: "Credenciais inválidas." }
        }

        const token = jwt.sign({ id: findEmpresaByEmail.id, nome: findEmpresaByEmail.nome, role: findEmpresaByEmail.role_id }, process.env.JWT_SECRET)

        return token
    },
    logarFuncionario: async (email, password, newPassword) => {
        if (!email || !password) {
            throw { status: 400, message: "Todos os campos são obrigatórios" }
        }
        if (!String(email).trim() || !String(password).trim()) {
            throw { status: 400, message: "Todos os campos devem ser válidos." }
        }
        if (!validateEmail(email)) {
            throw { status: 400, message: "O email precisa ser válido." }
        }

        const findFuncionarioByEmail = await Funcionario.findOne({
            where: { email },
            include: {
                model: Empresa,
                attributes: [["nome", "nomeEmpresa"]]
            },
        })

        if (!findFuncionarioByEmail) {
            throw { status: 404, message: "Não foi possível localizar este funcionário." }
        }

        const equalsPassword = await bcryptUtil.comparePassword(password, findFuncionarioByEmail.password)
        
        if (!equalsPassword) {
            throw { status: 400, message: "Credenciais inválidas." }
        }

        // == Primeiro acesso ==
        if(findFuncionarioByEmail.first_access){

            if(!newPassword || !String(newPassword).trim()){
                throw {status: 400, message: "O campo newPassword é obrigatório para o primeiro acesso."}
            }

            const hashNewPassword = await bcryptUtil.generatePassword(newPassword)

            await findFuncionarioByEmail.update({
                password: hashNewPassword,
                first_access: false
            })
        }

        // == Defineo status como logado ==
        await findFuncionarioByEmail.update(
            {isLogged: true}
        )

        const token = jwt.sign({ id: findFuncionarioByEmail.id, nome: findFuncionarioByEmail.nome, role: findFuncionarioByEmail.role_id, empresa_id: findFuncionarioByEmail.empresa_id, nomeEmpresa: findFuncionarioByEmail.empresa.dataValues.nomeEmpresa }, process.env.JWT_SECRET)

        return token
    },
    checkAuth: async (token) => {
        return jwt.verify(token, process.env.JWT_SECRET)
    }
}