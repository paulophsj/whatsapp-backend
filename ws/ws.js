import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken"
import { enviarMensagemAoCliente } from "./ws.events.js";

const wss = new WebSocketServer({ port: 8081 })

wss.on('connection', async (ws, req) => {
    const token = new URL(req.headers.origin + req.url).searchParams.get('token')

    if (!token) {
        ws.close()
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET)

    if(!decode || decode?.role !== 3){
        ws.close()
    }

    ws.funcionario_id = decode.id
    ws.empresa_id = decode.empresa_id
    ws.nomeEmpresa = decode.nomeEmpresa

    ws.on('message', async (data) => {
        const dataValues = JSON.parse(data)
        await enviarMensagemAoCliente(ws, dataValues.chat_id, dataValues.mensagem)
    })

    console.log("Um novo usuário se conectou")
})

export default wss