import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors"
import sequelize from "./config/db.config.js";
import db from "./models/index.model.js";

import { createRoles } from "./models/role.model.js";

import authRouter from "./routers/auth.router.js"
import empresaRouter from "./routers/empresa.router.js"
import adminRouter from "./routers/admin.router.js"
import chatRouter from "./routers/chat.router.js"

import { authenticationMiddleware } from "./middlewares/authentication.middleware.js";
import roleMiddleware from "./middlewares/role.middleware.js";

configDotenv()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(cors({
    allowedHeaders: ["Content-Type", "Auhtorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: "http://localhost:3000"
}))

app.use("/api/admin", adminRouter) //Proteger essa rota em produção
app.use("/api/auth", authRouter)
app.use("/api/empresa", authenticationMiddleware, roleMiddleware.canEmpresa, empresaRouter)
app.use("/api/chat", authenticationMiddleware, roleMiddleware.canEmpresaAndFuncionario, chatRouter)

try {
  await sequelize.sync({alter: true})
  await createRoles()
  console.log('Banco de dados conectado com sucesso!');
} catch (error) {
  console.error('Erro ao conetar ao banco de dados:', error);
}

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando porta: ${process.env.PORT}`)
})
