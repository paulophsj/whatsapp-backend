import authService from "../services/auth.service.js";

export default {
    logarEmpresa: async (req, res) => {
        try {
            const { email, password } = req.body
            const token = await authService.logarEmpresa(email, password)
            return res.status(201).json({ token })
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || "Erro interno do servidor." })
        }
    },
    logarFuncionario: async (req, res) => {
        try {
            const { email, password, newPassword } = req.body
            const token = await authService.logarFuncionario(email, password, newPassword)
            return res.status(201).json({ token })
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || "Erro interno do servidor." })
        }
    },
    checkAuth: async (req, res) => {
        try {
            const headers = req.headers
            const token = headers?.authorization?.split("Bearer ")[1]

            const decoded = await authService.checkAuth(token)
            
            return res.status(200).json(decoded)
        } catch (error) {
            return res.status(500).json({message: "Erro interno do servidor"})
        }
    }
}