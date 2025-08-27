import {Usuario} from '../models/usuarios.js'
import jwt from 'jsonwebtoken';

export const getAllUsuario = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    }catch(error){
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({message:'Error al obtener a los usuarios actuales'});
    }
};
export const createUsuario = async(req, res) =>{
    try{
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).json({message:'Usuario agregado correctamente',usuario});
    }catch(error){
        console.error('Error al crear el usuario:', error);
        res.status(500).json({message: ' Error al crear el usuario'});
    }
}
export const loginUsario = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Email y contraseña son requeridos" });
    }
    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }
    if (password !== usuario.password) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }
    usuario.isOnline = true;
    usuario.lastSeen = new Date().toISOString();
    await usuario.save();

    // Crear token JWT
    const SECRET = process.env.JWT_SECRET || "21-02-2023";
    const token = jwt.sign(
        { id: usuario._id, email: usuario.email, role: usuario.role },
        SECRET,
        { expiresIn: "1h" }
    );

    res.status(200).json({
      msg: "✅ Usuario ha iniciado sesión correctamente",
      token,
      usuario: {
        id: usuario._id,
        email: usuario.email,
      },
    });

  } catch (error) {
    res.status(500).json({
      msg: "❌ Error al iniciar sesión",
      error: error.message,
    });
  }
};
export const verifyToken = (req, res) => {
  try {
    const authHeader = req.headers.authorization; // corregido
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];
    const SECRET = process.env.JWT_SECRET || "21-02-2023";

    // Verifica el token de forma síncrona
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
  } catch (error) {
    console.error('Error al verificar el token:', error);
    return res.status(401).json({ message: 'Token inválido' });
  }
};
export const getUsuarioActivo = async (req, res) => {
  try {
    const activos = await Usuario.find({ isOnline: true });
    if (!activos || activos.length === 0) {
      return res.status(404).json({ message: 'No hay usuarios activos' });
    }
    res.status(200).json(activos);
  } catch (error) {
    console.error('Error al obtener los usuarios activos:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios activos' });
  }
};

export const getUsuarioInactivo = async (req, res) => {
  try {
    const inactivos = await Usuario.find({ isOnline: false });
    if (!inactivos || inactivos.length === 0) {
      return res.status(404).json({ message: 'No hay usuarios inactivos' });
    }
    res.status(200).json(inactivos);
  } catch (error) {
    console.error('Error al obtener los usuarios inactivos:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios inactivos' });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await Usuario.findByIdAndDelete(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ message: 'Error al eliminar el usuario' });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const usuario = await Usuario.findByIdAndUpdate(id, updates, { new: true });
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario actualizado correctamente', usuario });
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    res.status(500).json({ message: 'Error al actualizar el usuario' });
  }
};