import { Router } from "express";
import { RepublicaController } from "../../controllers/RepublicaController";
import { authenticateToken } from "../../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticateToken, RepublicaController.getAll);
router.post("/create", authenticateToken, RepublicaController.create);

export default router;
