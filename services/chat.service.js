import { Op } from "sequelize"
import Chat from "../models/chat.model.js"
import Cliente from "../models/cliente.model.js"
import Estatisticas from "../models/estatisticas.model.js"
import { validatePhone } from "../utils/regex.util.js"
import Funcionario from "../models/funcionario.model.js"

export default {
    criarChat: async (numeroCliente, funcionario_id) => {
        if(!numeroCliente || !funcionario_id){
            throw {status: 400, message: "Todos os campos são obrigatórios."}
        }
        if(!String(numeroCliente).trim() || !validatePhone(numeroCliente)){
            throw {status: 400, message: "O campo numeroCliente não pode ser vazio e deve ser válido"}
        }

        const cliente = await Cliente.findOne({where: {numeroCliente, ativo: true}})

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

        await Estatisticas.findOrCreate({
            where: {chat_id: chat.id},
            defaults: {chat_id: chat.id}
        })

        cliente.update({
            emAtendimento: true
        })

        return chat
    },
    findAllActiveChats: async (funcionario_id) => {
        const chats = await Chat.findAll({
            include: {
                model: Cliente,
            },
            where: {funcionario_id, isActive: true},
            attributes: ["id", "createdAt", "updatedAt", "isActive"]
        })

        return chats
    },
    todosClientesSemAtendimento: async (empresa_id) => {
        const clientes = await Cliente.findAll({
            where: {empresa_id, emAtendimento: false, ativo: true}
        })

        return clientes
    },
    buscarChatsFinalizados: async (funcionario_id) => {
        if(!funcionario_id){
            throw {status: 400, message: "Todos os campos são obrigatórios."}
        }

        const chats = await Chat.findAll({
            where: {
                isActive: false,
                funcionario_id,
                updatedAt: {[Op.between]: [new Date().toISOString().split("T")[0].concat("T00:00:00"), new Date().toISOString().split("T")[0].concat("T23:59:59")]}
            },
            include: [
                {
                    model: Cliente,
                    attributes: ["id", "nome"]
                },
                {
                    model: Funcionario,
                    attributes: ["id", "nome"]
                }
            ]
        })

        return chats
    },
    finalizarChat: async (chat_id, funcionario_id) => {
        if(!chat_id){
            throw {status: 400, message: "O campo chat_id é obrigatório"}
        }
        if(!funcionario_id){
            throw {status: 400, message: "O campo funcionario_id é obrigatório"}
        }

        const chat = await Chat.findByPk(chat_id)

        if(!chat){
            throw {status: 400, message: "Chat não encontrado"}
        }
        if(!chat.isActive){
            throw {status: 400, message: "Este chat já foi finalizado."}
        }
        if(chat.funcionario_id !== funcionario_id){
            throw {status: 400, message: "Você não tem permissão para finalizar este chat"}
        }

        const cliente = await Cliente.findByPk(chat.cliente_id)

        await cliente.update({
            ativo: false,
            emAtendimento: false
        })
        await chat.update({
            isActive: false
        })
    }
}