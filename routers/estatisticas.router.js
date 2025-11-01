import Router from "express"
import estatisticasController from "../controllers/estatisticas.controller.js"

const router = Router()

router.get("/:id", estatisticasController.findEstatisticasByChatId)

export default router