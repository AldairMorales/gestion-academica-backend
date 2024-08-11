const express = require('express');
const router = express.Router();
const Enrollment = require('../models/enrollment');
const Course = require('../models/course');

// Crear inscripción
router.post('/', async (req, res) => {
  const enrollment = new Enrollment(req.body);
  try {
    await enrollment.save();
    
    // Agregar al estudiante en el curso
    const course = await Course.findById(enrollment.course);
    course.students.push(enrollment.student);
    await course.save();

    res.status(201).send(enrollment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Leer todas las inscripciones
router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.find().populate('student').populate('course');
    res.status(200).send(enrollments);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Leer una inscripción por ID
router.get('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id).populate('student').populate('course');
    if (!enrollment) return res.status(404).send();
    res.status(200).send(enrollment);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Actualizar una inscripción
router.patch('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!enrollment) return res.status(404).send();
    res.status(200).send(enrollment);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Eliminar una inscripción
router.delete('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id);
    if (!enrollment) return res.status(404).send();

    // Eliminar al estudiante del curso
    const course = await Course.findById(enrollment.course);
    course.students.pull(enrollment.student);
    await course.save();

    res.status(200).send(enrollment);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
