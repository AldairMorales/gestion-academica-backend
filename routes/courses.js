const express = require('express');
const router = express.Router();
const Course = require('../models/course');

// Crear curso
router.post('/', async (req, res) => {
  const course = new Course(req.body);
  try {
    await course.save();
    res.status(201).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Leer todos los cursos
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find().populate('teacher').populate('students');
    res.status(200).send(courses);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Leer un curso por ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('teacher').populate('students');
    if (!course) return res.status(404).send();
    res.status(200).send(course);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Actualizar un curso
router.patch('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!course) return res.status(404).send();
    res.status(200).send(course);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar un curso
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).send();
    res.status(200).send(course);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
