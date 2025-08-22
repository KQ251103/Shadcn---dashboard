import express from 'express';

import {
    getAllUsuario,
    createUsuario
}from '../controllers/usuarioController.js';
const router = express.Router();
router.get('/', getAllUsuario);
router.post('/', createUsuario);
export default router;