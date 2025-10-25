import Chat from "../models/chat.model.js";
import Mensagem from "../models/mensagem.model.js";

export default {
    findAllMensagensByChatId: async (chat_id) => {
        const chat = await Chat.findOne({where: {id: chat_id}})

        if(!chat){
            throw {status: 400, message: "Não foi possível localizar este chat."}
        }

        const mensagens = await Mensagem.findAll({
            where: {chat_id}
        })

        return mensagens
    }
}