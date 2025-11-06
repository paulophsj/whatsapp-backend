import Predefinidas from "../models/predefinidas.model.js";

export default {
    criarMensagem: async (funcionario_id, titulo, mensagem) => {
        if (!String(titulo).trim() || !String(mensagem).trim() || !funcionario_id) {
            throw { status: 400, message: "Todos os campos são obrigatórios." }
        }
        if (String(mensagem).length > 500 || String(titulo).length > 50) {
            throw { status: 400, message: "O campo mensagem deve ter no máximo 500 caracteres e titulo no máximo 50 caracteres." }
        }

        const novaMensagem = await Predefinidas.create({
            funcionario_id,
            titulo,
            mensagem
        })

        return novaMensagem
    },
    buscarUmaMensagem: async (funcionario_id, id) => {
        if (!funcionario_id || !id) {
            throw { status: 400, message: "Os dois campos são obrigatórios." }
        }

        const findMensagem = await Predefinidas.findByPk(id)

        if(!findMensagem){
            throw {status: 400, message: "Mensagem não encontrada."}
        }
        if (findMensagem.funcionario_id !== funcionario_id) {
            throw { status: 400, message: "Você não tem permissão para visualizar essa mensagem." }
        }

        if (!findMensagem.ativa) {
            throw { status: 400, message: "Essa mensagem já foi excluída." }
        }

        return findMensagem
    },
    buscarTodasMensagens: async (funcionario_id) => {
        if (!funcionario_id) {
            throw { status: 400, message: "O campo funcionario_id é obrigatório." }
        }

        const todasMensagens = await Predefinidas.findAll({
            where: {
                funcionario_id,
                ativa: true
            }
        })

        return todasMensagens
    },
    editarMensagem: async (funcionario_id, id, novoTitulo, novaMensagem) => {
        if (String(novaMensagem).length > 500 || String(novoTitulo).length > 50) {
            throw { status: 400, message: "O campo novaMensagem deve ter no máximo 500 caracteres e novoTitulo no máximo 50 caracteres." }
        }

        const findMensagem = await Predefinidas.findByPk(id)

        if (findMensagem.funcionario_id !== funcionario_id) {
            throw { status: 400, message: "Você não tem permissão para alterar essa mensagem." }
        }
        if (!findMensagem.ativa) {
            throw { status: 400, message: "Essa mensagem já foi excluída." }
        }

        const mensagemAtualizada = await findMensagem.update({
            titulo: novoTitulo,
            mensagem: novaMensagem
        })

        return mensagemAtualizada
    },
    apagarMensagem: async (funcionario_id, id) => {
        if (!funcionario_id || !id) {
            throw { status: 400, message: "Os dois campos são obrigatórios." }
        }

        const findMensagem = await Predefinidas.findByPk(id)

        if(!findMensagem){
            throw {status: 400, message: "Mensagem não encontrada."}
        }
        if (findMensagem.funcionario_id !== funcionario_id) {
            throw { status: 400, message: "Você não tem permissão para alterar essa mensagem." }
        }

        if (!findMensagem.ativa) {
            throw { status: 400, message: "Essa mensagem já foi excluída." }
        }

        await findMensagem.update({
            ativa: false
        })

        return
    }
}