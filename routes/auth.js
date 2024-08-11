const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Registro
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    const newUser = new User({ username, password });

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);

    await newUser.save();
    res.status(201).json({ msg: 'Usuario registrado exitosamente' });
  } catch (err) {
    res.status(500).json({ msg: 'Error en el servidor' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Usuario o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: user._id }, 'secreto', { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Error en el servidor' });
  }
});

module.exports = router;
