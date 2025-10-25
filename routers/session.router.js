import {Router} from "express"
import sessionController from "../controllers/session.controller.js"

const router = Router()

router.post("/create", sessionController.criarSession)
router.get("/iniciar", sessionController.iniciarSessao)
router.get("/verificar", sessionController.verificarSessao)

export default router