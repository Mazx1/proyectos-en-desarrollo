import jwt from "jsonwebtoken";
import { hasMinRole } from "../constants/roles.js";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ error: "Token JWT requerido" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    return res.status(403).json({ error: "Token invalido o expirado" });
  }
}

export function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: "No tienes permisos para esta accion",
        requiredRoles: allowedRoles,
      });
    }
    next();
  };
}

export function requireMinRole(minRole) {
  return (req, res, next) => {
    if (!req.user || !hasMinRole(req.user.role, minRole)) {
      return res.status(403).json({
        error: "No tienes permisos para esta accion",
        requiredMinRole: minRole,
        yourRole: req.user?.role ?? null,
      });
    }
    next();
  };
}
