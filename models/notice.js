const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NoticeSchema = new Schema({
  course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
  teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Referencia al profesor que agrega el aviso
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notice', NoticeSchema);
