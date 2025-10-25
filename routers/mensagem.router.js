import {Router} from "express"
import mensagemController from "../controllers/mensagem.controller.js"

const router = Router()

router.get("/:id", mensagemController.findAllMensagensByChatId)

export default router