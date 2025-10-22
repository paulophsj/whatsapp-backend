import Session from "../models/session.model.js"
import wpp from "./wpp.js"

export async function changeQR(empresa_id, base64image) {
    const session = await Session.findOne({where: {empresa_id}})

    await session.update({
        qrCode: base64image
    })

    return
}
export async function changeStatus(empresa_id, status) {
    const OFFLINE_STATUS = ["autocloseCalled", "desconnectedMobile", "phoneNotConnected"]
    const ONLINE_STATUS = ["isLogged", "qrReadSuccess"]

    const session = await Session.findOne({where: {empresa_id}})

    if(OFFLINE_STATUS.includes(status)){
        await session.update({
            isActive: false,
            qrCode: null
        })
    }
    if(ONLINE_STATUS.includes(status)){
        await session.update({
            isActive: true,
            qrCode: null
        })
    }

    return
}

export default {
    iniciarSessao: async (empresa_id, nomeEmpresa) => {
        wpp.iniciarSessao(empresa_id, nomeEmpresa)

        const session =  await Session.findOne({where: {empresa_id}})

        const qrCode = session.qrCode || null 

        return qrCode
    }
}