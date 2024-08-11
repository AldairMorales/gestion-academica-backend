const InscripcionSchema = new Schema({
    estudiante: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    curso: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    inscripcion: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Inscripcion', InscripcionSchema);
  