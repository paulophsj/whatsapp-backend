import {Router} from "express"
import mensagemController from "../controllers/mensagem.controller.js"

const router = Router()

router.get("/:id", mensagemController.findAllMensagensByChatId)
router.get("/primeira-mensagem/:id", mensagemController.findFirstMessage)

export default router