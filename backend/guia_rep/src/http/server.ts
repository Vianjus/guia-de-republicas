import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import republicaRoutes from "./routes/republicaRoutes";
import usuarioRoutes from "./routes/usuarioRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use("/api/users", usuarioRoutes);
app.use("/api/reps", republicaRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
