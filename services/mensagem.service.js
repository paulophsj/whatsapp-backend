import Chat from "../models/chat.model.js"
import Funcionario from "../models/funcionario.model.js"
import Mensagem from "../models/mensagem.model.js"

async function buscarMensagensByChats(cliente_id, page, attempts = 0) {
    if (attempts >= 2) {
        throw { status: 400, message: "Você já visualizou todas as mensagens deste chat." }
    }

    const paginaAtual = Math.max(Number(page) || 1, 1) - 1

    const chats = await Chat.findAll({
        where: { cliente_id },
        order: [["id", "DESC"]],
        include: [
            {
                model: Funcionario,
                attributes: ["id", "nome"]
            }
        ]
    })

    if (chats.length === 0) {
        throw { status: 400, message: "Não foi possível localizar chats para esse cliente." }
    }

    const chatsIds = chats.map(chat => ({
        id: chat.id,
        funcionario: {
            id: chat.funcionario.id,
            nome: chat.funcionario.nome
        }
    }))

    const chatSelecionado = chatsIds[paginaAtual] || chatsIds[chatsIds.length - 1]

    if (!chatSelecionado) {
        throw { status: 400, message: "Nenhum chat válido encontrado para essa página." }
    }

    const mensagens = await Mensagem.findAll({
        where: { chat_id: chatSelecionado.id },
        limit: 3,
        offset: paginaAtual * 3,
        order: [["id", "DESC"]]
    })

    if (mensagens.length === 0) {
        return await buscarMensagensByChats(cliente_id, page, attempts + 1)
    }

    return {
        chat_id: chatSelecionado.id,
        funcionario: chatSelecionado.funcionario,
        mensagens,
        pagina: paginaAtual + 1
    }
}

export default {
    findAllMensagensByChatId: async (cliente_id, page) => {
        return await buscarMensagensByChats(cliente_id, page)
    }
}
