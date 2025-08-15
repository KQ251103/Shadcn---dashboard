// back-end/server.js o back-end/index.js

import express from 'express';
import mongoose from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors';
import personRoutes from './routes/personRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import emailRoutes from './routes/emailRoutes.js';

config(); // carga las variables de entorno

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json());

// Rutas de productos
app.use('/api/email', emailRoutes);
app.use('/api/personas', personRoutes);
app.use('/api/projects', projectRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente ✅');
});

// Conexión a MongoDB y levantamos el servidor
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB correctamente');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar a MongoDB:', error);
  });
