import {Router} from "express"
import authController from "../controllers/auth.controller.js"
import { authenticationMiddleware } from "../middlewares/authentication.middleware.js"
const router = Router()

router.get("/check", authenticationMiddleware, authController.checkAuth)
router.post("/login/empresa", authController.logarEmpresa)
router.post("/login/funcionario", authController.logarFuncionario)

export default router