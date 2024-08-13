const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  dni: { type: String, required: true },
  nombre: { type: String },
  apellidos: { type: String, required: true  },
  especialidad: { type: String, required: true  },
  edad: { type: String, required: true  },
  estado: { type: String},
});

module.exports = mongoose.model('Docente', CourseSchema);