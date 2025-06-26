import { Router } from "express";
import { UsuarioController } from "../../controllers/UsuarioController";
import { authenticateToken } from "../../middlewares/authMiddleware";

const router = Router();

router.post("/login", UsuarioController.login);
router.post("/create", UsuarioController.cadastrarUsuario);

// rota protegida
router.get("/", authenticateToken, UsuarioController.retornarTodosUsuarios);

export default router;
