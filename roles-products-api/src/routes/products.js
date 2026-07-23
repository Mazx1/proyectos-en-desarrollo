import { Router } from "express";
import { ROLES } from "../constants/roles.js";
import {
  products,
  getNextProductId,
  findProductById,
} from "../data/store.js";
import { authenticateToken, requireMinRole } from "../middleware/auth.js";

const router = Router();

router.use(authenticateToken);

router.get("/", (_req, res) => {
  res.json(products);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = findProductById(id);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  return res.json(product);
});

router.post("/", requireMinRole(ROLES.ADMIN), (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "name es obligatorio" });
  }

  const product = { id: getNextProductId(), name: name.trim() };
  products.push(product);

  return res.status(201).json(product);
});

router.put("/:id", requireMinRole(ROLES.ADMIN), (req, res) => {
  const id = Number(req.params.id);
  const product = findProductById(id);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const { name } = req.body;
  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ error: "name es obligatorio" });
  }

  product.name = name.trim();
  return res.json(product);
});

router.delete("/:id", requireMinRole(ROLES.SUPERADMIN), (req, res) => {
  const id = Number(req.params.id);
  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  const [deleted] = products.splice(index, 1);
  return res.json(deleted);
});

export default router;
