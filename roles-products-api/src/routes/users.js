import { Router } from "express";
import bcrypt from "bcryptjs";
import { ALL_ROLES, ROLES, canManageRole } from "../constants/roles.js";
import {
  findUserById,
  findUserByUsername,
  getNextUserId,
  users,
} from "../data/store.js";
import { authenticateToken, requireMinRole } from "../middleware/auth.js";
import { sanitizeUser } from "../utils/user.js";

const router = Router();

router.use(authenticateToken);

router.get("/", requireMinRole(ROLES.ADMIN), (_req, res) => {
  res.json(users.map(sanitizeUser));
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = findUserById(id);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const isSelf = req.user.sub === user.id;
  const isAdminOrAbove =
    req.user.role === ROLES.ADMIN || req.user.role === ROLES.SUPERADMIN;

  if (!isSelf && !isAdminOrAbove) {
    return res.status(403).json({ error: "No tienes permisos para ver este usuario" });
  }

  return res.json(sanitizeUser(user));
});

router.post("/", requireMinRole(ROLES.SUPERADMIN), async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({
      error: "username, password y role son obligatorios",
    });
  }

  if (!ALL_ROLES.includes(role)) {
    return res.status(400).json({
      error: "role invalido",
      allowedRoles: ALL_ROLES,
    });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: "password debe tener al menos 6 caracteres" });
  }

  if (!canManageRole(req.user.role, role)) {
    return res.status(403).json({ error: "No puedes asignar ese rol" });
  }

  if (findUserByUsername(username.trim())) {
    return res.status(409).json({ error: "El username ya existe" });
  }

  const passwordHash = await bcrypt.hash(password, 10);
  const user = {
    id: getNextUserId(),
    username: username.trim(),
    passwordHash,
    role,
  };

  users.push(user);

  return res.status(201).json(sanitizeUser(user));
});

router.put("/:id", requireMinRole(ROLES.ADMIN), async (req, res) => {
  const id = Number(req.params.id);
  const user = findUserById(id);

  if (!user) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const isSelf = req.user.sub === user.id;
  const { username, password, role } = req.body;

  if (role && req.user.role !== ROLES.SUPERADMIN) {
    return res.status(403).json({ error: "Solo superadmin puede cambiar roles" });
  }

  if (role && !ALL_ROLES.includes(role)) {
    return res.status(400).json({
      error: "role invalido",
      allowedRoles: ALL_ROLES,
    });
  }

  if (role && !canManageRole(req.user.role, role)) {
    return res.status(403).json({ error: "No puedes asignar ese rol" });
  }

  if (!isSelf && req.user.role === ROLES.USER) {
    return res.status(403).json({ error: "No tienes permisos para editar este usuario" });
  }

  if (username) {
    const existing = findUserByUsername(username.trim());
    if (existing && existing.id !== user.id) {
      return res.status(409).json({ error: "El username ya existe" });
    }
    user.username = username.trim();
  }

  if (password) {
    if (password.length < 6) {
      return res.status(400).json({ error: "password debe tener al menos 6 caracteres" });
    }
    user.passwordHash = await bcrypt.hash(password, 10);
  }

  if (role) {
    user.role = role;
  }

  return res.json(sanitizeUser(user));
});

router.delete("/:id", requireMinRole(ROLES.SUPERADMIN), (req, res) => {
  const id = Number(req.params.id);

  if (req.user.sub === id) {
    return res.status(400).json({ error: "No puedes eliminar tu propia cuenta" });
  }

  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }

  const [deleted] = users.splice(index, 1);
  return res.json(sanitizeUser(deleted));
});

export default router;
