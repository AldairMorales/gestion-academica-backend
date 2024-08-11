const CursoSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String },
    horario: { type: String, required: true },
    profesor: { type: Schema.Types.ObjectId, ref: 'User' }, // Referencia al profesor asignado
    estudiantes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Lista de estudiantes inscritos
    avisos: [{ type: Schema.Types.ObjectId, ref: 'Aviso' }], // Lista de avisos
    calificaciones: [{
      estudiante: { type: Schema.Types.ObjectId, ref: 'User' },
      nota: { type: Number }
    }]
  });
  
  module.exports = mongoose.model('Curso', CursoSchema);
  