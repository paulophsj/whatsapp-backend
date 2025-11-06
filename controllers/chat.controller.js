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
    },
    buscarChatsFinalizados: async (req,res) => {
        try {
            const {id: funcionario_id} = req.user
            const chatsFinalizados = await chatService.buscarChatsFinalizados(funcionario_id)
            return res.status(200).json(chatsFinalizados)
        } catch (error) {
            return res.status(error.status || 500).json({message: error.message || "Erro interno do servidor."})
        }
    },
    finalizarChat: async (req,res) => {
        try {
            const {id: funcionario_id} = req.user
            const {id: chat_id} = req.params

            await chatService.finalizarChat(chat_id, funcionario_id)
            
            return res.status(200).json({message: "Chat finalizado com sucesso!"})
        } catch (error) {
            return res.status(error.status || 500).json({message: error.message || "Erro interno do servidor."})
        }
    }
}