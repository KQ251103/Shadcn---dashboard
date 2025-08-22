import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Form from "../models/user.js"; // Asegúrate de que la ruta al modelo sea correcta

// Registro de usuario
export const registerForm = async (req, res) => {
  try {
    const { email, password } = req.body;


    // Validar campos vacíos
    if (!email || !password) {
      return res.status(400).json({ msg: "Email y contraseña son requeridos" });
    }

    // Verificar si ya existe
    const existingForm = await Form.findOne({ email });
    if (existingForm) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }

    // Encriptar password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear nuevo usuario
    const newForm = new Form({
      email,
      password: hashedPassword,
    });

    await newForm.save();

    res.status(201).json({ msg: "✅ Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ msg: "❌ Error en el registro", error: error.message });
  }
};

// Login de usuario
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos vacíos
    if (!email || !password) {
      return res.status(400).json({ msg: "Email y contraseña son requeridos" });
    }

    // Buscar usuario
    const form = await Form.findOne({ email });
    if (!form) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // Comparar contraseñas
    const isMatch = await bcrypt.compare(password, form.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Contraseña incorrecta" });
    }

    // Generar token JWT
    const token = jwt.sign(
      { id: form._id, email: form.email },
      process.env.JWT_SECRET || "default_secret", // usa variable de entorno o valor por defecto
      { expiresIn: "1h" }
    );

    res.status(200).json({
      msg: "✅ Login exitoso",
      token,
      user: { id: form._id, email: form.email },
    });
  } catch (error) {
    res.status(500).json({ msg: "❌ Error en el login", error: error.message });
  }
};
