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
export const getUsuario = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ msg: "No autorizado, token requerido" });
    }

    const token = authHeader.split(" ")[1];
    const SECRET = process.env.JWT_SECRET || "21-02-2023";

    // Verificamos el token
    const decoded = jwt.verify(token, SECRET);

    // Buscamos usuario en la BD
    const usuario = await Usuario.findById(decoded.id).select("name email");
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    res.status(200).json({
      name: usuario.name,
      email: usuario.email
    });

  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ msg: "Error en el servidor", error: error.message });
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
        { id: usuario._id, email: usuario.email, name: usuario.name },
        SECRET,
        { expiresIn: "1h"}
    );

    res.status(200).json({
      msg: "✅ Usuario ha iniciado sesión correctamente",
      token,
      usuario: {
        name: usuario.name,
        id: usuario._id,
        email: usuario.email
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
    res.status(200).json(activos); // <-- siempre devuelve array (vacío o con datos)
  } catch (error) {
    console.error('Error al obtener los usuarios activos:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios activos' });
  }
};

export const getUsuarioInactivo = async (req, res) => {
  try {
    const inactivos = await Usuario.find({ isOnline: false });
    res.status(200).json(inactivos); // <-- siempre devuelve array
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

export const logoutUsuario = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ msg: "No autorizado, token requerido" });
    }

    const token = authHeader.split(" ")[1];
    const SECRET = process.env.JWT_SECRET || "21-02-2023";
    const decoded = jwt.verify(token, SECRET);

    const usuario = await Usuario.findById(decoded.id);
    if (!usuario) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    usuario.isOnline = false;
    usuario.lastSeen = new Date().toISOString();
    await usuario.save();

    return res.status(200).json({ msg: "✅ Sesión cerrada correctamente" });
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
    return res.status(500).json({ msg: "❌ Error al cerrar sesión", error: error.message });
  }
};