import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:{type: String, required: true},
    price: Number,
    stock: Number,
    descripcion: String,
    createdAT: {type: Date, default: Date.now}
    });
export const Product = mongoose.model("Product", productSchema);