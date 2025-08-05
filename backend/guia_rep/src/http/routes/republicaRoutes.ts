import { Router } from "express";
import { RepublicaController } from "../../controllers/RepublicaController";
import { authenticateToken } from "../../middlewares/authMiddleware";
import { validateBody } from "../../middlewares/validationMiddleware";
import { cadastroRepublicaSchema } from './../../schemas/repSchema';

const router = Router();

router.get("/", authenticateToken, RepublicaController.encontrarTodasReps);
router.post("/create", authenticateToken, validateBody(cadastroRepublicaSchema), RepublicaController.cadastrarRep);
router.delete("/delete/:id", authenticateToken, RepublicaController.deletarRep);

export default router;
