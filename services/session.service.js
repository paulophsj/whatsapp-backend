import Session from "../models/session.model.js"
import Empresa from "../models/empresa.model.js"

export default {
    criarSession: async (nomeEmpresa) => {
        const empresa = await Empresa.findOne({ where: { nome: nomeEmpresa } })

        if (!empresa) {
            throw { status: 404, message: "Empresa não encontrada." }
        }

        const [session, created] = await Session.findOrCreate({
            where: {
                empresa_id: empresa.id
            },
            defaults: {
                empresa_id: empresa.id
            }
        })

        if (!created) {
            throw { status: 400, message: "Esta empresa já possui uma sessão cadastrada." }
        }

        return session
    }
}
