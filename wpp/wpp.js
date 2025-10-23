import { create } from "@wppconnect-team/wppconnect"
import { changeQR, changeStatus } from "./wpp.status.js"
import wppEvents from "./wpp.events.js"

const sessions = new Map()

export default {
    iniciarSessao: async (empresa_id, nomeEmpresa) => {
        if (!sessions.has(nomeEmpresa)) {
            sessions.set(nomeEmpresa, "")

            const session = await create({
                session: nomeEmpresa,
                catchQR: (base64image) => changeQR(empresa_id, base64image),
                statusFind: (status) => changeStatus(empresa_id, status),
                puppeteerOptions: {
                    headless: true
                },
                autoClose: 0,
                disableWelcome: true,
                updatesLog: true,
                logQR: true,
            })

            session.onMessage(async (cliente) => await wppEvents.onMessage(cliente, empresa_id))

            sessions.set(nomeEmpresa, session)
        }
    },
    /**
     * @returns {import ("@wppconnect-team/wppconnect").Whatsapp | undefined}
     */
    getSession: (nomeEmpresa) => {
        return sessions.get(nomeEmpresa) || undefined
    }
}