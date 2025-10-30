import Chat from "../models/chat.model.js";
import Funcionario from "../models/funcionario.model.js";
import Mensagem from "../models/mensagem.model.js";

export default {
    findAllMensagensByChatId: async (cliente_id, page) => {
        const chats = await Chat.findAll({ where: { cliente_id }, order: [["id", "DESC"]] });

        if (chats.length == 0) {
            throw { status: 400, message: "Não foi possível localizar chats para esse cliente." };
        }

        const chatsIds = chats.map(c => c.id);

        const mensagens = await Chat.findAll({
            where: { id: chatsIds, cliente_id },
            include: [
                {
                    model: Funcionario,
                    attributes: ["id", "nome"]
                },
                {
                    model: Mensagem,
                    separate: true,
                    limit: 10,
                    offset: (Number(page) || 1 - 1) * 10,
                    order: [["id", "DESC"]],
                    attributes: ["id", "mensagem", "enviadoPorFuncionario", "createdAt", "updatedAt"]
                }
            ],
            attributes: ["id", "isActive", "createdAt", "updatedAt"],
            order: [["id", "DESC"]]
        })

        if (mensagens.filter(m => m.mensagems.length > 0).length == 0) {
            throw { status: 400, message: "Você já visualizou todas as mensagens" }
        }

        return mensagens.filter(m => m.mensagems.length > 0)
    }
};