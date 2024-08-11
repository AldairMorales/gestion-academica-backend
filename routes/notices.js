const express = require('express');
const router = express.Router();
const Notice = require('../models/notice');

// Crear aviso
router.post('/', async (req, res) => {
  const notice = new Notice(req.body);
  try {
    await notice.save();
    res.status(201).send(notice);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Leer todos los avisos
router.get('/', async (req, res) => {
  try {
    const notices = await Notice.find().populate('course').populate('teacher');
    res.status(200).send(notices);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Leer un aviso por ID
router.get('/:id', async (req, res) => {
  try {
    const notice = await Notice.findById(req.params.id).populate('course').populate('teacher');
    if (!notice) return res.status(404).send();
    res.status(200).send(notice);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Actualizar un aviso
router.patch('/:id', async (req, res) => {
  try {
    const notice = await Notice.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!notice) return res.status(404).send();
    res.status(200).send(notice);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar un aviso
router.delete('/:id', async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return res.status(404).send();
    res.status(200).send(notice);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
