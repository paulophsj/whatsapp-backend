import estatisticasService from "../services/estatisticas.service.js";

export default {
    findEstatisticasByChatId: async (req, res) => {
        try {
            const {id: chat_id} = req.params

            const estatistica = await estatisticasService.findEstatisticas(chat_id)

            return res.status(201).json(estatistica.dataValues)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || "Erro interno do servidor." })
        }
    },
}