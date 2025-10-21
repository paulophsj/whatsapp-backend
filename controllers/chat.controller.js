import chatService from "../services/chat.service.js"

export default {
    criarChat: async (req, res) => {
        try {
            const { numeroCliente } = req.body
            const { id: funcionario_id } = req.user

            const newChat = await chatService.criarChat(numeroCliente, funcionario_id)

            return res.status(201).json(newChat.dataValues)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || "Erro interno do servidor." })
        }
    }
}