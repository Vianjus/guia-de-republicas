import { Router } from "express";
import { UsuarioController } from "../../controllers/UsuarioController";

const router = Router();

router.post("/login", UsuarioController.login);
router.post("/create", UsuarioController.cadastrarUsuario);

// rota protegida
router.get("/", UsuarioController.retornarTodosUsuarios);
router.get("/:id", UsuarioController.retornarUsuarioPorId);

export default router;
