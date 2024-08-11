const AvisoSchema = new Schema({
    curso: { type: Schema.Types.ObjectId, ref: 'Curso', required: true },
    profesor: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al profesor que agrega el aviso
    contenido: { type: String, required: true },
    creado: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Aviso', AvisoSchema);
  