import { Router } from "express";
import roleMiddleware from "../middlewares/role.middleware.js";
import anotacoesController from "../controllers/anotacoes.controller.js";

const router = Router()

router.post("/create", roleMiddleware.canFuncionario, anotacoesController.criarAnotacao)
router.get("/buscar/:cliente_id", roleMiddleware.canEmpresaAndFuncionario, anotacoesController.buscarAnotacoesPeloClienteId)

export default router