import empresaService from "../services/empresa.service.js"

export default {
    criarFuncionario: async (req,res) => {
        try {
            const { nome, email } = req.body
            const {id: empresa_id} = req.user

            const newFuncionario = await empresaService.criarFuncionario(nome,email,empresa_id)
            
            return res.status(201).json(newFuncionario.dataValues)
        } catch (error) {
            return res.status(error.status || 500).json({ message: error.message || "Erro interno do servidor." })
        }
    }
}