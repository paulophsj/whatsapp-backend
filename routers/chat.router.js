import { Router } from "express";
import roleMiddleware from "../middlewares/role.middleware.js";
import chatController from "../controllers/chat.controller.js";

const router = Router()

router.get("/actives", roleMiddleware.canFuncionario, chatController.findAllActiveChats)
router.post("/create", roleMiddleware.canFuncionario, chatController.criarChat)

export default router