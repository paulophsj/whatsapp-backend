import { Router } from "express";
import roleMiddleware from "../middlewares/role.middleware.js";
import chatController from "../controllers/chat.controller.js";

const router = Router()

router.get("/actives", roleMiddleware.canFuncionario, chatController.findAllActiveChats)
router.get("/sem-atendimento", roleMiddleware.canFuncionario, chatController.todosClientesSemAtendimento)
router.get("/finalizados", roleMiddleware.canFuncionario, chatController.buscarChatsFinalizados)
router.put("/finalizar/:id", roleMiddleware.canFuncionario, chatController.finalizarChat)
router.post("/create", roleMiddleware.canFuncionario, chatController.criarChat)

export default router