import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, trim: true },
  password: { type: String, required: true }, // ojo: se guarda encriptada, nunca en texto plano
  rememberMe: { type: Boolean, default: false }
}, { timestamps: true });

export const Form = mongoose.model("Form", loginSchema);
