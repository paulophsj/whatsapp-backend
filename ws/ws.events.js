import Chat from "../models/chat.model.js";
import Cliente from "../models/cliente.model.js";
import Mensagem from "../models/mensagem.model.js";
import wpp from "../wpp/wpp.js";
import estatisticasService from "../services/estatisticas.service.js";
import { MessageTypes } from "../utils/messageType.util.js"
import { sendToOne } from "../wpp/wpp.events.js";

export async function enviarMensagemAoCliente(ws, chat_id, mensagem) {
    const cliente = await Cliente.findOne({
        include: {
            model: Chat,
            where: {id: chat_id},
            attributes: []
        }
    })

    const novaMensagem = await Mensagem.create({
        enviadoPorFuncionario: true,
        mensagem,
        chat_id
    })

    await estatisticasService.createEstatisticas(chat_id, true)

    sendToOne(JSON.stringify(novaMensagem.dataValues), ws.funcionario_id, MessageTypes.ENVIO_MENSAGEM)

    await wpp.getSession(ws.nomeEmpresa).sendText(cliente.numeroCliente, mensagem)
    
}