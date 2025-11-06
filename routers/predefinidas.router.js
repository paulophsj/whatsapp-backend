import {Router} from "express"
import predefinidasController from "../controllers/predefinidas.controller.js"

const router = Router()

router.post("/create", predefinidasController.criarMensagem)
router.get("/find/:id", predefinidasController.buscarUmaMensagem)
router.get("/find", predefinidasController.buscarTodasMensagens)
router.put("/edit/:id", predefinidasController.editarMensagem)
router.delete("/delete/:id", predefinidasController.apagarMensagem)

export default router