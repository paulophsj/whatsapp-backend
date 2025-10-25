import sessionService from "../services/session.service.js"
import wppStatus from "../wpp/wpp.status.js"

export default {
    criarSession: async (req, res) => {
        try {
            const { nome: nomeEmpresa } = req.user

            const session = await sessionService.criarSession(nomeEmpresa)
            return res.status(201).json(session.dataValues)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || "Erro interno do servidor" })
        }
    },
    iniciarSessao: async (req, res) => {
        try {
            const { id: empresa_id, nome: nomeEmpresa } = req.user
            const qrCode = await wppStatus.iniciarSessao(empresa_id, nomeEmpresa)
            const status = qrCode == null ? "pending" : "ok"
            return res.status(200).json({ status, qrCode })
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || "Erro interno do servidor." })
        }
    },
    verificarSessao: async (req, res) => {
        try {
            const { id: empresa_id } = req.user
            const isActive = await sessionService.verificarSessao(empresa_id)
            return res.status(200).json({ isActive })
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || "Erro interno do servidor." })
        }
    }
}