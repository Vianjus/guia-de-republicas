import { Router } from "express";
import { UsuarioController } from "../../controllers/UsuarioController";
import { validateBody } from "../../middlewares/validationMiddleware";
import { cadastroUsuarioSchema } from "../../schemas/userSchemas";

const router = Router();

router.post("/login", UsuarioController.login);
router.post("/create", validateBody(cadastroUsuarioSchema), UsuarioController.cadastrarUsuario);

// rota protegida
router.get("/", UsuarioController.retornarTodosUsuarios);
router.get("/:id", UsuarioController.retornarUsuarioPorId);

router.delete("/:email", UsuarioController.deletarUsuario);

export default router;
