import { Router } from "express";
import { RepublicaController } from "../../controllers/RepublicaController";
import { authenticateToken } from "../../middlewares/authMiddleware";
import { validateBody } from "../../middlewares/validationMiddleware";
import { cadastroRepublicaSchema } from './../../schemas/repSchema';

const router = Router();

// continua protegida
router.get("/", authenticateToken, RepublicaController.encontrarTodasReps);

// 👉 liberada só para demo (sem autenticação)
router.post(
  "/create",
  validateBody(cadastroRepublicaSchema),
  RepublicaController.cadastrarRep
);

// continua protegida
router.delete("/delete/:id", authenticateToken, RepublicaController.deletarRep);

export default router;

