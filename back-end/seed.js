import mongoose from 'mongoose';
import { config } from 'dotenv';
import { Person } from './models/person.js';

config(); // Cargar .env

const MONGO_URI = process.env.MONGO_URI;

const seedPersonas = [
  {
    name: "Miguel Herrera",
    role: "Security Engineer",
    department: "Seguridad",
    avatar: "/placeholder.svg?height=120&width=120",
    email: "miguel.herrera@empresa.com",
    phone: "+34 623 456 789",
    location: "Santander, España",
    joindate: new Date("2021-06-07"),
    bio: "Ingeniero de seguridad especializado en ciberseguridad y protección de infraestructuras. Experto en análisis de vulnerabilidades y respuesta a incidentes.",
    skills: ["Cybersecurity", "Penetration Testing", "SIEM", "Incident Response", "Risk Assessment"],
    rating: 4.9,
    projects: 21,
  },
  {
    name: "Laura Gómez",
    role: "Frontend Developer",
    department: "Tecnología",
    avatar: "/placeholder.svg?height=120&width=120",
    email: "laura.gomez@empresa.com",
    phone: "+34 612 345 678",
    location: "Barcelona, España",
    joinDate: "2022-02-10",
    bio: "Desarrolladora frontend con experiencia en React, diseño de interfaces de usuario y optimización de rendimiento.",
    skills: ["React", "TypeScript", "CSS", "UX/UI", "Jest"],
    rating: 4.7,
    projects: 15,
  }
  // Aquí puedes agregar más personas...
];

async function seedDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("✅ Conectado a MongoDB para seed");

    await Person.deleteMany(); // Limpia la colección
    await Person.insertMany(seedPersonas);

    console.log("✅ Personas insertadas correctamente");
    process.exit();
  } catch (err) {
    console.error("❌ Error al hacer seed:", err);
    process.exit(1);
  }
}

seedDB();
