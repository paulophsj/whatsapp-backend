import predefinidasService from "../services/predefinidas.service.js";

export default {
    criarMensagem: async (req, res) => {
        try {
            const { id: funcionario_id } = req.user
            const { titulo, mensagem } = req.body

            const novaMensagem = await predefinidasService.criarMensagem(funcionario_id, titulo, mensagem)
            return res.status(201).json(novaMensagem.dataValues)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || "Erro interno do servidor." })
        }
    },
    buscarUmaMensagem: async (req, res) => {
        try {
            const { id: funcionario_id } = req.user
            const { id } = req.params

            const buscarMensagem = await predefinidasService.buscarUmaMensagem(funcionario_id, id)
            return res.status(200).json(buscarMensagem.dataValues)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || "Erro interno do servidor." })
        }
    },
    buscarTodasMensagens: async (req, res) => {
        try {
            const { id: funcionario_id } = req.user

            const todasMensagens = await predefinidasService.buscarTodasMensagens(funcionario_id)
            return res.status(200).json(todasMensagens)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || "Erro interno do servidor." })
        }
    },
    editarMensagem: async (req, res) => {
        try {
            const { id: funcionario_id } = req.user
            const { id } = req.params
            const { novoTitulo, novaMensagem } = req.body

            const mensagemEditada = await predefinidasService.editarMensagem(funcionario_id, id, novoTitulo, novaMensagem)
            return res.status(200).json(mensagemEditada.dataValues)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || "Erro interno do servidor." })
        }
    },
    apagarMensagem: async (req, res) => {
        try {
            const { id: funcionario_id } = req.user
            const { id } = req.params

            await predefinidasService.apagarMensagem(funcionario_id, id)
            return res.status(200).json({message: "Mensagem excluída com sucesso!"})
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || "Erro interno do servidor." })
        }
    },
}