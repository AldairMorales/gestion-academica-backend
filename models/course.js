const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  schedule: { type: String, required: true },
  teacher: { type: String, required: true  }, // Referencia al profesor asignado
  students: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Lista de estudiantes inscritos
  notices: [{ type: Schema.Types.ObjectId, ref: 'Notice' }], // Lista de avisos
  grades: [{
    student: { type: Schema.Types.ObjectId, ref: 'User' },
    grade: { type: Number }
  }]
});

module.exports = mongoose.model('Course', CourseSchema);
