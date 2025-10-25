import mensagemService from "../services/mensagem.service.js";

export default {
    findAllMensagensByChatId: async (req,res) => {
        try {
            const {id: chat_id} = req.params
            const mensagens = await mensagemService.findAllMensagensByChatId(chat_id)
            return res.status(200).json(mensagens)
        } catch (error) {
            return res.status(error.status || 500).json({message: error.message || "Erro interno do servidor."})
        }
    }
}