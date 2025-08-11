import mongoose from "mongoose";

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String },
  department: { type: String },
  avatar: { type: String },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String },
  joinDate: { type: Date, default: Date.now },
  bio: { type: String },
  skills: [{ type: String }],
  rating: { type: Number, default: 0 },
  projects: { type: Number }
}, { timestamps: true });

export const Person = mongoose.model("Person", personSchema);
