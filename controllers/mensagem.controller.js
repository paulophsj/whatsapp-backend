import mensagemService from "../services/mensagem.service.js";

export default {
    findAllMensagensByChatId: async (req,res) => {
        try {
            const {id: cliente_id} = req.params
            const {page} = req.query

            const mensagens = await mensagemService.findAllMensagensByChatId(cliente_id, page)
            return res.status(200).json(mensagens)
        } catch (error) {
            return res.status(error.status || 500).json({message: error.message || "Erro interno do servidor."})
        }
    },
    findFirstMessage: async (req,res) => {
        try {
            const {id: cliente_id} = req.params

            const mensagens = await mensagemService.findFirstMessage(cliente_id)
            
            return res.status(200).json(mensagens)
        } catch (error) {
            return res.status(error.status || 500).json({message: error.message || "Erro interno do servidor."})
        }
    }
}