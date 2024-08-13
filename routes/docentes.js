const express = require('express');
const router = express.Router();
const Docente = require('../models/docente');

// Crear docente
router.post('/', async (req, res) => {
  const docente = new Docente(req.body);
  try {
    await docente.save();
    res.status(201).send(docente);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Leer todos los docentes
router.get('/', async (req, res) => {
  try {
    const docentes = await Docente.find();
    res.status(200).send(docentes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Leer un docente por ID
router.get('/:id', async (req, res) => {
  try {
    const docente = await Docente.findById(req.params.id);
    if (!docente) return res.status(404).send();
    res.status(200).send(docente);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Actualizar un docente
router.patch('/:id', async (req, res) => {
  try {
    const docente = await Docente.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!docente) return res.status(404).send();
    res.status(200).send(docente);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar un docente
router.delete('/:id', async (req, res) => {
  try {
    const docente = await Docente.findByIdAndDelete(req.params.id);
    if (!docente) return res.status(404).send();
    res.status(200).send(docente);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
