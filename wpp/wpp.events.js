import Cliente from "../models/cliente.model.js"
import Chat from "../models/chat.model.js"
import Mensagem from "../models/mensagem.model.js"
import estatisticasService from "../services/estatisticas.service.js"
import { MessageTypes } from "../utils/messageType.util.js"

import wss from "../ws/ws.js"

export function sendBroadcast(data, empresa_id, type) {
    wss.clients.forEach(cliente => {
        if (cliente.readyState === 1 && cliente.empresa_id === empresa_id) {
            cliente.send(JSON.stringify({ data, type }))
        }
    })
}
export function sendToOne(data, funcionario_id, type) {
    wss.clients.forEach(cliente => {
        if (cliente.readyState === 1 && cliente.funcionario_id === funcionario_id) {
            cliente.send(JSON.stringify({ data, type }))
        }
    })
}

export default {

    /**
     * @param {import ("@wppconnect-team/wppconnect").Message} clientewpp
     */

    onMessage: async (clientewpp, empresa_id) => {
        const { from: numeroCliente, sender: usuario, body: mensagem } = clientewpp

        if (numeroCliente === 'status@broadcast' || clientewpp.isGroupMsg === true) {
            return
        }

        const [clientedb] = await Cliente.findOrCreate({
            where: { empresa_id, numeroCliente },
            defaults: {
                nome: usuario?.pushname || usuario?.name,
                numeroCliente,
                empresa_id
            }
        })


        if (!clientedb.emAtendimento) {
            console.log("Aguarde que em instantes você será atendido.")
        }
        else {
            const chat = await Chat.findOne({ where: { cliente_id: clientedb.id, isActive: true } })

            const novaMensagem = await Mensagem.create({
                enviadoPorFuncionario: false,
                mensagem,
                chat_id: chat.id
            })

            await estatisticasService.createEstatisticas(chat.id, false)
            
            sendToOne(JSON.stringify(novaMensagem.dataValues), chat.funcionario_id, MessageTypes.ENVIO_MENSAGEM)
        }

        const findAllInactiveClients = await Cliente.findAll({
            where: { empresa_id, emAtendimento: false },
            attributes: ["id", "nome", "numeroCliente", "emAtendimento"]
        })

        sendBroadcast(findAllInactiveClients, empresa_id, MessageTypes.TELEFONES_CONECTADOS)

    }
}