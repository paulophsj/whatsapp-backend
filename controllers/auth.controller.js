import authService from "../services/auth.service.js";

export default {
    logarEmpresa: async (req,res) => {
        try {
            const {email, password} = req.body
            const token = await authService.logarEmpresa(email, password)
            return res.status(201).json({token})
        } catch (error) {
            return res.status(error.status || 500).json({message: error.message || "Erro interno do servidor."})
        }
    },
    logarFuncionario: async (req,res) => {
      try {
            const {email, password, newPassword} = req.body
            const token = await authService.logarFuncionario(email, password, newPassword)
            return res.status(201).json({token})
        } catch (error) {
            return res.status(error.status || 500).json({message: error.message || "Erro interno do servidor."})
        }  
    }
}