import { Router } from "express";
import empresaController from "../controllers/empresa.controller.js";

const router = Router()

router.post("/create/funcionario", empresaController.criarFuncionario)
router.get("/funcionarios", empresaController.listarFuncionarios)

export default router