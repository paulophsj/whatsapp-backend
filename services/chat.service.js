import Chat from "../models/chat.model.js"
import Cliente from "../models/cliente.model.js"
import Funcionario from "../models/funcionario.model.js"
import { validatePhone } from "../utils/regex.util.js"

export default {
    criarChat: async (numeroCliente, funcionario_id) => {
        if(!numeroCliente || !funcionario_id){
            throw {status: 400, message: "Todos os campos são obrigatórios."}
        }
        if(!String(numeroCliente).trim() || !validatePhone(numeroCliente)){
            throw {status: 400, message: "O campo numeroCliente não pode ser vazio e deve ser válido"}
        }

        const cliente = await Cliente.findOne({where: {numeroCliente}})

        if(!cliente){
            throw {status: 404, message: "Cliente não encontrado na base de dados"}
        }

        const [chat, created] = await Chat.findOrCreate({
            where: {cliente_id: cliente.id, isActive: true},
            defaults: {cliente_id: cliente.id, funcionario_id}
        })

        if(!created){
            throw {status: 400, message: "Este cliente já possui um chat ativo."}
        }

        return chat
    },
    findAllActiveChats: async (funcionario_id) => {
        const chats = await Chat.findAll({
            where: {funcionario_id, isActive: true}
        })

        return chats
    }
}