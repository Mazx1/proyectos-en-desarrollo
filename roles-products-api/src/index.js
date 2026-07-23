import "dotenv/config";
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import roleRoutes from "./routes/roles.js";
import productRoutes from "./routes/products.js";
import { users } from "./data/store.js";

const app = express();
const port = process.env.PORT || 3000;

async function seedUsers() {
  const credentials = [
    { username: "superadmin", password: "super123", index: 0 },
    { username: "admin", password: "admin123", index: 1 },
    { username: "user", password: "user123", index: 2 },
  ];

  for (const item of credentials) {
    users[item.index].passwordHash = await bcrypt.hash(item.password, 10);
  }
}

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/roles", roleRoutes);
app.use("/products", productRoutes);

app.use((_req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

await seedUsers();

app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
  console.log("");
  console.log("Usuarios de prueba:");
  console.log("  superadmin / super123");
  console.log("  admin      / admin123");
  console.log("  user       / user123");
  console.log("");
  console.log("Rutas principales:");
  console.log("  POST /auth/login");
  console.log("  POST /auth/register");
  console.log("  GET  /auth/me");
  console.log("  CRUD /users, /roles, /products");
});
