import mongoose from "mongoose";

const  usuarioSchema = new mongoose.Schema({
    name :{type: String, required: true},
    email :{type: String, required: true},
    password :{type: String, required: true},
    isOnline :{type: Boolean, required: true, default:false},
    lastSeen :{type: String, required: true, default: Date.now},
    role :{type: String, enum:['Usuario','Admin'], default:"Admin"}
},{timestamps: true});
export const Usuario = mongoose.model("Usuario", usuarioSchema);