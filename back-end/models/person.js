import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  usuario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Usuario", 
    required: true, 
    unique: true 
  },
  name: { type: String, required: true },     // Se rellena desde Usuario
  email: { type: String, required: true },    // Se rellena desde Usuario
  role: { type: String, required: true },     // Solo de Persona
  department: { type: String },
  avatar: { type: String },
  phone: { type: String, required: true },
  location: { type: String },
  joinDate: { type: Date, default: Date.now },
  bio: { type: String },
  skills: [{ type: String }],
  rating: { type: Number, default: 0 },
  projects: { type: Number }
}, { timestamps: true });

export const Person = mongoose.model("Person", personSchema);
