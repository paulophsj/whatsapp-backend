import { Router } from "express";
import adminController from "../controllers/admin.controller.js";

const router = Router()

router.post("/create/empresa", adminController.criarEmpresa)

export default router