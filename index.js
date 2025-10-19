import { configDotenv } from "dotenv";
import express from "express";
import cors from "cors"
import sequelize from "./config/db.js";

configDotenv()

const app = express()

app.use(cors({
    allowedHeaders: ["Content-Type", "Auhtorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: "http://localhost:3000"
}))



try {
  await sequelize.sync({alter: true})
  console.log('Banco de dados conectado com sucesso!');
} catch (error) {
  console.error('Erro ao conetar ao banco de dados:', error);
}

app.listen(process.env.PORT, () => {
    console.log(`Servidor rodando porta: ${process.env.PORT}`)
})
