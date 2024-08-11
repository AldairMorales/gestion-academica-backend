const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Conexión a MongoDB
mongoose.connect('mongodb://localhost:27017/gestion-academica', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.json());

// Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/cursos', require('./routes/cursos'));
app.use('/api/avisos', require('./routes/avisos'));
app.use('/api/inscripciones', require('./routes/inscripciones'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
