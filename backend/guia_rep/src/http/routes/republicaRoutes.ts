import { Router } from "express";
import { RepublicaController } from "../../controllers/RepublicaController";

const router = Router();

router.get("/", RepublicaController.encontrarTodasReps);
router.post(
  "/create",
  //validateBody(cadastroRepublicaSchema),
  RepublicaController.cadastrarRep
);
router.delete("/delete/:id", RepublicaController.deletarRep);

router.get("/:id", RepublicaController.retornarRepId);
export default router;
