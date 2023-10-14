
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const animalRoutes = require('./routes/animal');

// Conectar a la base de datos MongoDB
mongoose.connect('mongodb://localhost/veterinaria', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Rutas para los animales
app.use('/api', animalRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Servidor en puerto: ${port}`);
});
