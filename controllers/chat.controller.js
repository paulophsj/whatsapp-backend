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
    },
    findAllActiveChats: async (req,res) => {
        try {
            const {id: funcionario_id} = req.user
            const chats = await chatService.findAllActiveChats(funcionario_id)
            return res.status(200).json(chats)
        } catch (error) {
            return res.status(error.status || 500).json({message: error.message || "Erro interno do servidor."})
        }
    },
    todosClientesSemAtendimento: async (req,res) => {
        try {
            const {empresa_id} = req.user
            const clientes = await chatService.todosClientesSemAtendimento(empresa_id)
            return res.status(200).json(clientes)
        } catch (error) {
            return res.status(error.status || 500).json({message: error.message || "Erro interno do servidor."})
        }
    }
}