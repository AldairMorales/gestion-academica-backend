const express = require('express');
const router = express.Router();
const estudiante = require('../models/estudiante');

// Crear estudiante
router.post('/', async (req, res) => {
  const estudiante = new estudiante(req.body);
  try {
    await estudiante.save();
    res.status(201).send(estudiante);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Leer todos los estudiantes
router.get('/', async (req, res) => {
  try {
    const estudiantes = await estudiante.find();
    res.status(200).send(estudiantes);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Leer un estudiante por ID
router.get('/:id', async (req, res) => {
  try {
    const estudiante = await estudiante.findById(req.params.id);
    if (!estudiante) return res.status(404).send();
    res.status(200).send(estudiante);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Actualizar un estudiante
router.patch('/:id', async (req, res) => {
  try {
    const estudiante = await estudiante.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!estudiante) return res.status(404).send();
    res.status(200).send(estudiante);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar un estudiante
router.delete('/:id', async (req, res) => {
  try {
    const estudiante = await estudiante.findByIdAndDelete(req.params.id);
    if (!estudiante) return res.status(404).send();
    res.status(200).send(estudiante);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
