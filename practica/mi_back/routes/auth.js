import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { authRequired, requireRoles } from '../middleware/autenticador.js';

const router = express.Router();

const signToken = (user) => {
    return jwt.sign(
        { id: user._id.toString(), email: user.email, role: user.role, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );
};

router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        const token = signToken(newUser);
        res.status(201).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al registrar el usuario', error: error.message });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }
        const token = signToken(user);
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar sesión', error: error.message });
    }
});

router.get('/user', authRequired, async (req, res) => {
    return res.json({ user: req.user });
});

router.get('/admin', authRequired, requireRoles("admin", "superman"), async (req, res) => {
    return res.json({ message: "Contenido para admin y superadmin" });
});

router.get('/superman', authRequired, requireRoles("superman"), async (req, res) => {
    return res.json({ message: "Contenido exclusivo para superadmin" });
});

export default router;