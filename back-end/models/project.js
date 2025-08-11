
import mongoose from "mongoose";

const proyectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: { type: String, enum: ['Pendiente', 'En-Progreso', 'Completado'], default: "Pendiente" },
    priority: { type: String, enum: ['Baja', 'Media', 'Alta'], default: "Media" },
    dueDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    assignedTo: { type: String, required: true },
}, { timestamps: true });
export const Proyect = mongoose.model("Proyect", proyectSchema); 