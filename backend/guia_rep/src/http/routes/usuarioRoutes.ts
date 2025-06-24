import { Router } from "express";
import { UsuarioController } from "../../controllers/UsuarioController";
import { authenticateToken } from "../../middlewares/authMiddleware";

const router = Router();

router.post("/login", UsuarioController.login);
router.post("/", UsuarioController.create);

// rota protegida
router.get("/", authenticateToken, UsuarioController.getAll);

export default router;
