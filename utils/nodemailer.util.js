import { configDotenv } from "dotenv"
import nodemailer from "nodemailer"

configDotenv()

const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
})

export default {
    enviarEmailTexto: (destinatario, titulo_email, mensagem) => {
        return transport.sendMail({
            to: destinatario,
            from: process.env.EMAIL_USER,
            subject: titulo_email,
            text: mensagem
        })
    },
    enviarEmailHTML: (destinatario, titulo_email, html) => {
        return transport.sendMail({
            to: destinatario,
            from: process.env.EMAIL_USER,
            subject: titulo_email,
            html
        })
    }
}
