import adminService from "../services/admin.service.js"

export default {
        criarEmpresa: async (req, res) => {
            try {
                const { nome, email, password } = req.body
                const newEmpresa = await adminService.criarEmpresa(nome, email, password)
                return res.status(201).json(newEmpresa.dataValues)
            } catch (error) {
                return res.status(error.status || 500).json({ message: error.message || "Erro interno do servidor." })
            }
        },
}