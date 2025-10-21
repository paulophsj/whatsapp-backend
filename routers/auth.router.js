import {Router} from "express"
import authController from "../controllers/auth.controller.js"
const router = Router()

router.post("/login/empresa", authController.logarEmpresa)
router.post("/login/funcionario", authController.logarFuncionario)

export default router