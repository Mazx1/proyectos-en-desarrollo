import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import {
  roles,
  getNextRoleId,
  findRoleById,
  findRoleByName,
} from "../data/store.js";
import { authenticateToken, requireMinRole } from "../middleware/auth.js";

const router = Router();

router.use(authenticateToken);

router.get("/", requireMinRole(ROLES.ADMIN), (_req, res) => {
  res.json(roles);
});

router.get("/:id", requireMinRole(ROLES.ADMIN), (req, res) => {
  const id = Number(req.params.id);
  const role = findRoleById(id);

  if (!role) {
    return res.status(404).json({ error: "Rol no encontrado" });
  }

  return res.json(role);
});

router.post("/", requireMinRole(ROLES.SUPERADMIN), (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "name es obligatorio" });
  }

  if (findRoleByName(name.trim())) {
    return res.status(409).json({ error: "El rol ya existe" });
  }

  const role = { id: getNextRoleId(), name: name.trim() };
  roles.push(role);

  return res.status(201).json(role);
});

router.put("/:id", requireMinRole(ROLES.SUPERADMIN), (req, res) => {
  const id = Number(req.params.id);
  const role = findRoleById(id);

  if (!role) {
    return res.status(404).json({ error: "Rol no encontrado" });
  }

  const { name } = req.body;
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "name es obligatorio" });
  }

  if (findRoleByName(name.trim()) && findRoleByName(name.trim()).id !== role.id) {
    return res.status(409).json({ error: "El rol ya existe" });
  }

  role.name = name.trim();
  return res.json(role);
});

router.delete("/:id", requireMinRole(ROLES.SUPERADMIN), (req, res) => {
  const id = Number(req.params.id);
  const role = findRoleById(id);

  if (!role) {
    return res.status(404).json({ error: "Rol no encontrado" });
  }

  if ([ROLES.USER, ROLES.ADMIN, ROLES.SUPERADMIN].includes(role.name)) {
    return res.status(400).json({ error: "No se pueden eliminar roles del sistema" });
  }

  const index = roles.findIndex((item) => item.id === id);
  const [deleted] = roles.splice(index, 1);
  return res.json(deleted);
});

export default router;
