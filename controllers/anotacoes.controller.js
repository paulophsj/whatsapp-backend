import anotacoesService from "../services/anotacoes.service.js";

export default {
    criarAnotacao: async (req, res) => {
        try {
            const { id: funcionario_id } = req.user
            const { cliente_id, mensagem } = req.body

            const novaAnotacao = await anotacoesService.criarAnotacao(funcionario_id, cliente_id, mensagem)
            return res.status(201).json(novaAnotacao.dataValues)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || "Erro interno do servidor." })
        }
    },
    buscarAnotacoesPeloClienteId: async (req, res) => {
        try {
            const { cliente_id } = req.params

            const anotacoes = await anotacoesService.buscarAnotacoesPeloClienteId(cliente_id)
            return res.status(200).json(anotacoes)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || "Erro interno do servidor." })
        }
    }
}