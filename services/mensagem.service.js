import Chat from "../models/chat.model.js"
import Funcionario from "../models/funcionario.model.js"
import Mensagem from "../models/mensagem.model.js"

export default {
    findAllMensagensByChatId: async (cliente_id, page = 1) => {
        page = Math.round(page) || 1

        const mensagens = await Mensagem.findAll({
            include: [
                {
                    model: Chat,
                    where: { cliente_id },
                    attributes: ["id", "createdAt", "updatedAt"],
                    include: [
                        {
                            model: Funcionario,
                            attributes: ["id", "nome"]
                        }
                    ]
                }
            ],
            limit: 5,
            offset: (page - 1) * 5,
            order: [["id", "DESC"]]
        })

        if (mensagens.length === 0) {
            return { message: "Você já visualizou todas as mensagens desse cliente." }
        }

        return mensagens
    },
    findFirstMessage: async (cliente_id) => {
        const chat = await Chat.findOne({
            where: { cliente_id },
            order: [["id", "ASC"]]
        })

        if (!chat) {
            throw { status: 400, message: "Este cliente não possui chat vinculado." }
        }

        const mensagem = await Mensagem.findOne({
            where: { chat_id: chat.id },
            order: [["id", "ASC"]]
        })

        return mensagem
    }
}
