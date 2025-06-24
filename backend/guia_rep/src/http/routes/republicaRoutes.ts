import { Router } from "express";
import { RepublicaController } from "../../controllers/RepublicaController";
import { authenticateToken } from "../../middlewares/authMiddleware";

const router = Router();

router.get("/", authenticateToken, RepublicaController.getAll);
//outer.post("/create/users", RepublicaController.create);

export default router;
