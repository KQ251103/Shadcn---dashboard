// routes/authRoutes.js
import express from "express";
import { registerUser, loginUser } from  "../controllers/formController.js";

const router = express.Router();

// Rutas de autenticación
router.post("/register", registerUser); // crear usuario
router.post("/login", loginUser);       // iniciar sesión

export default router;
