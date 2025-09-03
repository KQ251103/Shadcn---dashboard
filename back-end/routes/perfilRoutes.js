import express from 'express';

import {
    crearPerfil,
    getPerfil
} from '../controllers/perfilController.js';
const router = express.Router();
router.post("/", crearPerfil);
router.get("/:id", getPerfil);

export default router;