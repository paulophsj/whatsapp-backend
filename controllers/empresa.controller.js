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
    },
    listarFuncionarios: async (req,res) => {
        try {
            const {id: empresa_id} = req.user

            const funcionarios = await empresaService.listarFuncionarios(empresa_id)

            setTimeout(() => {
                return res.status(200).json(funcionarios)
            }, 3000);

        } catch (error) {
            
        }
    }
}