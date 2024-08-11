const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); // Cargar variables de entorno desde .env

const app = express();

// Conexión a MongoDB usando la variable de entorno
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/courses', require('./routes/courses'));
app.use('/api/notices', require('./routes/notices'));
app.use('/api/enrollments', require('./routes/enrollments'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
