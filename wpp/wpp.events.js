import Cliente from "../models/cliente.model.js"
import Chat from "../models/chat.model.js"

import wss from "../ws/ws.js"

function sendBroadcast(mensagem, empresa_id) {
    wss.clients.forEach(cliente => {
        if(cliente.readyState === 1 && cliente.empresa_id === empresa_id){
            cliente.send(JSON.stringify(mensagem))
        }
    })
}
function sendToOne(mensagem, funcionario_id) {
    wss.clients.forEach(cliente => {
        if(cliente.readyState === 1 && cliente.funcionario_id === funcionario_id){
            cliente.send(JSON.stringify(mensagem))
        }
    })
}

export default {

    /**
     * @param {import ("@wppconnect-team/wppconnect").Message} clientewpp
     */

    onMessage: async (clientewpp, empresa_id) => {
        const {from: numeroCliente, sender: usuario, body: mensagem} = clientewpp

        if(numeroCliente === 'status@broadcast' || clientewpp.isGroupMsg === true){
            return
        }

        const [clientedb] = await Cliente.findOrCreate({
            where: {empresa_id, numeroCliente},
            defaults: {
                nome: usuario?.pushname || usuario?.name,
                numeroCliente,
                empresa_id
            }
        })
        
        
        if(!clientedb.emAtendimento){
            console.log("Aguarde que em instantes você será atendido.")
        }
        else{
            const chat = await Chat.findOne({where: {cliente_id: clientedb.id}})
            sendToOne(JSON.stringify(mensagem), chat.funcionario_id)
        }
        
        const findAllInactiveClients = await Cliente.findAll({
            where: {empresa_id, emAtendimento: false},
            attributes: ["id", "nome", "numeroCliente", "emAtendimento"]
        })
        
        sendBroadcast(findAllInactiveClients, empresa_id)
        
    }
}