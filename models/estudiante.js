const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  dni: { type: String, required: true },
  nombre: { type: String },
  apellidos: { type: String, required: true  },
  direccion: { type: String, required: true  },
  edad: { type: String, required: true  },
  estado: { type: String, required: true  },
});

module.exports = mongoose.model('Estudiante', CourseSchema);