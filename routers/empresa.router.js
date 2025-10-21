import { Router } from "express";
import empresaController from "../controllers/empresa.controller.js";

const router = Router()

router.post("/create/funcionario", empresaController.criarFuncionario)

export default router