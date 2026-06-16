import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { authRequired, requireRoles } from "../middleware/auth.js";

const router = express.Router();

const signToken = (user) =>
  jwt.sign(
    { id: user._id.toString(), email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const exists = await User.findOne({ email });
    if (exists) {
      return res.status(409).json({ message: "El email ya esta registrado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "usuario"
    });

    const token = signToken(user);
    return res.status(201).json({
      message: "Usuario registrado",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al registrar usuario" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email y password son requeridos" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Credenciales invalidas" });
    }

    const token = signToken(user);
    return res.json({
      message: "Login exitoso",
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (error) {
    return res.status(500).json({ message: "Error al iniciar sesion" });
  }
});

router.get("/me", authRequired, async (req, res) => {
  return res.json({ user: req.user });
});

router.get("/admin", authRequired, requireRoles("admin", "superadmin"), async (req, res) => {
  return res.json({ message: "Contenido para admin y superadmin" });
});

router.get("/superadmin", authRequired, requireRoles("superadmin"), async (req, res) => {
  return res.json({ message: "Contenido exclusivo para superadmin" });
});

export default router;
