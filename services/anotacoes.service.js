import Anotacoes from "../models/anotacoes.model.js"
import Chat from "../models/chat.model.js"
import Cliente from "../models/cliente.model.js"
import Funcionario from "../models/funcionario.model.js"

export default {
    criarAnotacao: async (funcionario_id, cliente_id, mensagem) => {
        if(!funcionario_id || !cliente_id || !mensagem){
            throw { status: 400, message: "Todos os campos são obrigatórios."}
        }

        const clienteTemChat = await Chat.findOne({
            where: {funcionario_id, isActive: true},
            include: {
                model: Cliente,
                where: {id: cliente_id}
            }
        })

        if(!clienteTemChat){
            throw {status: 400, message: "Você não possui chat ativo com esse cliente."}
        }

        const dataAtual = new Date().toLocaleDateString("pt-br")
        
        const anotacao = await Anotacoes.findOne({where: {funcionario_id, cliente_id}, order: [['createdAt', 'DESC']]})
        
        if(anotacao && new Date(anotacao.createdAt).toLocaleDateString("pt-br") == dataAtual){
            throw {status: 400, message: "Você já criou uma anotação para esse cliente na data de hoje."}
        }

        const novaAnotacao = await Anotacoes.create({
            funcionario_id,
            cliente_id,
            mensagem
        })

        return novaAnotacao
    },
    buscarAnotacoesPeloClienteId: async (cliente_id) => {
        if(!cliente_id){
            throw {status: 400, message: "Todos os campos são obrigatórios"}
        }

        const anotacoes = await Anotacoes.findAll({
            where: {cliente_id},
            include: {
                model: Funcionario,
                attributes: ["nome"]
            }
        })

        return anotacoes
    }
}