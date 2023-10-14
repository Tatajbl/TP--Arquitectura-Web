// routes/animal.js
const express = require('express');
const router = express.Router();
const Animal = require('../models/animal');

// para crear un nuevo animal
router.post('/animals', async (req, res) => {
    try {
        const animal = new Animal(req.body);
        await animal.save();
        res.status(201).json(animal);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// para obtener todos los animales
router.get('/animals', async (req, res) => {
    const animals = await Animal.find();
    res.status(200).json(animals);
});

//para obtener un animal por ID
router.get('/animals/:id', async (req, res) => {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
        return res.status(404).json({ message: 'Animal no encontrado' });
    }
    res.status(200).json(animal);
});

//para actualizar un animal por ID
router.put('/animals/:id', async (req, res) => {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!animal) {
        return res.status(404).json({ message: 'Animal no encontrado' });
    }
    res.status(200).json(animal);
});

//para eliminar un animal por ID
router.delete('/animals/:id', async (req, res) => {
    const animal = await Animal.findByIdAndRemove(req.params.id);
    if (!animal) {
        return res.status(404).json({ message: 'Animal no encontrado' });
    }
    res.status(204).json();
});

module.exports = router;
