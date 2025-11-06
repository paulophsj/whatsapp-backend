import Chat from "../models/chat.model.js";
import Estatisticas from "../models/estatisticas.model.js";
import Mensagem from "../models/mensagem.model.js";

export default {
    findEstatisticas: async (chat_id) => {
        const chat = await Chat.findByPk(chat_id)

        if (!chat) throw { status: 400, message: "Chat não encontrado" }

        const estatistica = await Estatisticas.findOne({
            where: { chat_id }
        })

        if (!estatistica) throw { status: 400, message: "Estatística não criada ou não encontrada" }

        return estatistica
    },
    createEstatisticas: async (chat_id, enviadoPorFuncionario) => {
        const chat = await Chat.findByPk(chat_id)

        if (!chat) throw { status: 400, message: "Chat não encontrado" }

        const estatistica = await Estatisticas.findOne({
            where: { chat_id }
        })

        if (!estatistica) throw { status: 400, message: "Estatística não criada ou não encontrada" }

        let mensagens = await Mensagem.findAll({
            where: { chat_id }
        })

        if (mensagens.length === 0) throw { status: 400, message: "Esse chat ainda não possui mensagens" }

        mensagens = mensagens.map(m => {
            return {
                createdAt: m.createdAt,
                updatedAt: m.updatedAt,
                enviadoPorFuncionario: enviadoPorFuncionario //Vai ser true ou false para realizar o update correto
            }
        })

        const dateTime = mensagens.map(m => new Date(m.createdAt).getTime())

        const tempoMedioEntreDuasDatas = dateTime.map((d, i) => {
            return (dateTime[i + 1] - d)
        }).slice(0, -1)

        const tempoMedioAtendimento =
            tempoMedioEntreDuasDatas.length > 0
                ? tempoMedioEntreDuasDatas.reduce((prev, curr) => prev + curr, 0) / tempoMedioEntreDuasDatas.length
                : 0


        await estatistica.update(
            (
                enviadoPorFuncionario ?
                    {
                        tempoMedioFuncionario: tempoMedioAtendimento
                    } :
                    {
                        tempoMedioCliente: tempoMedioAtendimento
                    }
            )
        )

        return estatistica
    },
    updateMensagensEnviadasRecebidas: async (chat_id, quantidade, mensagemRecebida) => {
        /**
         * Funcionario recebeu mensagem ====> mensagemRecebida = true
         * Funcionario enviou mensagem ====> mensagemRecebida = false
         */
        const mensagens = await Mensagem.count(
            mensagemRecebida ?
                {
                    where: { chat_id, enviadoPorFuncionario: false }
                }
                :
                {
                    where: { chat_id, enviadoPorFuncionario: true }
                }
        )
        const estatistica = await Estatisticas.findOne({ where: { chat_id } })
        await estatistica.update(
            mensagemRecebida ?
                { mensagensRecebidas: mensagens + quantidade }
                :
                { mensagensEnviadas: mensagens + quantidade }
        )
    }
}