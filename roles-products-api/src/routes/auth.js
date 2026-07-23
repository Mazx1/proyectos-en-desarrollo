import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ROLES } from "../constants/roles.js";
import {
  findUserByUsername,
  getNextUserId,
  users,
} from "../data/store.js";
import { authenticateToken } from "../middleware/auth.js";
import { sanitizeUser } from "../utils/user.js";

const router = Router();

function createToken(user) {
  return jwt.sign(
    {
      sub: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "1h" }
  );
}

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username y password son obligatorios" });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "password debe tener al menos 6 caracteres" });
  }

  if (findUserByUsername(username.trim())) {
    return res.status(409).json({ error: "El username ya existe" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: getNextUserId(),
    username: username.trim(),
    passwordHash,
    role: ROLES.USER,
  };

  users.push(user);

  const token = createToken(user);

  return res.status(201).json({
    token,
    tokenType: "Bearer",
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    user: sanitizeUser(user),
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "username y password son obligatorios" });
  }

  const user = findUserByUsername(username.trim());
  if (!user) {
    return res.status(401).json({ error: "Credenciales invalidas" });
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    return res.status(401).json({ error: "Credenciales invalidas" });
  }

  const token = createToken(user);

  return res.json({
    token,
    tokenType: "Bearer",
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    user: sanitizeUser(user),
  });
});

router.get("/me", authenticateToken, (req, res) => {
  const user = findUserByUsername(req.user.username);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  return res.json(sanitizeUser(user));
});

export default router;
