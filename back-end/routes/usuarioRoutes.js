import express from 'express';

import {
    getAllUsuario,
    createUsuario,
    loginUsario,
    verifyToken,
    getUsuarioActivo,
    getUsuarioInactivo,
    deleteUsuario,
    updateUsuario
}from '../controllers/usuarioController.js';
const router = express.Router();
router.get('/', getAllUsuario);
router.post('/', createUsuario);
router.post('/login', loginUsario);
router.get('/dashboard', verifyToken,(req, res) => {
    res.json({message: 'Acceso concedido al dashboard', user: req.user});
});
router.get('/activo', getUsuarioActivo);
router.get('/inactivo', getUsuarioInactivo);
router.delete('/:id', deleteUsuario);
router.put('/:id', updateUsuario);
export default router;