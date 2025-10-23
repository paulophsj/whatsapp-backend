import Chat from "../models/chat.model.js";
import Cliente from "../models/cliente.model.js";
import Mensagem from "../models/mensagem.model.js";
import wpp from "../wpp/wpp.js";

export async function enviarMensagemAoCliente(ws, chat_id, mensagem) {
    const cliente = await Cliente.findOne({
        include: {
            model: Chat,
            where: {id: chat_id},
            attributes: []
        }
    })

    await Mensagem.create({
        enviadoPorFuncionario: true,
        mensagem,
        chat_id
    })w

    await wpp.getSession(ws.nomeEmpresa).sendText(cliente.numeroCliente, mensagem)
    
}