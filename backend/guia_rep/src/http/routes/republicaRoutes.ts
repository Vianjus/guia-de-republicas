import { Router } from "express";
import { RepublicaController } from "../../controllers/RepublicaController";
import { authenticateToken } from "../../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticateToken, RepublicaController.encontrarTodasReps);
router.post("/", authenticateToken, RepublicaController.cadastrarRep);

export default router;
