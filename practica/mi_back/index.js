import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
//import mongoose from 'mongoose';
import authRoutes from './routes/auth.js';
import {Router} from 'express';

dotenv.config();

const app = express();
// Middlewares
app.use(cors());
app.use(express.json());

const router = Router();

// Tu primer Rota (Endpoint)
app.get('/api', (req, res) => {
    res.json({ message: '¡Hola desde tu backend con Node.js!' });
});

app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 3000;
//const MONGO_URI = process.env.MONGO_URI;


// Initial el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

export default router;