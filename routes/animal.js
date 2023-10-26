// routes/animal.js
const express = require('express');
const router = express.Router();
const Animal = require('../models/animal');


// ---------------------------------- GET  -----------------------------------------------

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

// obtener los animales que tienen o no las vacunas por parametro
router.get('/animals', async (req, res) => {
    const { vaccinated } = req.query;

    if (vaccinated === true || vaccinated === false) {
        try {
            const animals = await Animal.find({ vaccinesUpdated : vaccinated === true });
            res.status(200).json(animals);
        } catch (error) {
            res.status(500).json({ error: 'Hubo un error al buscar los animales.' });
        }
    } else {
        res.status(400).json({ error: 'El parámetro "vaccinated" en el query string debe ser "true" o "false".' });
    }
});

//para obtener todos los animales que cumplen ciertos criterios de edad
router.get('/animals/age/:minAge/:maxAge', async (req, res) => {
    const minAge = parseInt(req.params.minAge);
    const maxAge = parseInt(req.params.maxAge);
    const animals = await Animal.find({ age: { $gte: minAge, $lte: maxAge } });
    res.status(200).json(animals);
});

// para obtener los animales que su nombre tiene la misma cantidad de letras que sus años
router.get('/animalsed  adigualnombre', async (req, res) => {
    try {
        const animals = await Animal.find();

        const matchingAnimals = animals.filter(animal => {
            return animal.name.length === animal.age;
        });

        res.status(200).json(matchingAnimals);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al buscar los animales.' });
    }
});

// Para obtener animales por especie
router.get('/animals/species/:query', async (req, res) => {
    const query = req.params.query;

    try {
        const animals = await Animal.find({ species: { $regex: `^${query}`, $options: 'i' } });
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al buscar las razas de animales.' });
    }
});

// ---------------------------------- POST  -----------------------------------------------

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
// Para crear varios animales a la vez
router.post('/animals/batch', async (req, res) => {
    try {
        // Obtener la lista de animales desde el cuerpo de la solicitud
        const animalsData = req.body;

        // Validar que se haya proporcionado un arreglo de animales
        if (!Array.isArray(animalsData)) {
            return res.status(400).json({ error: 'Se requiere un arreglo de animales.' });
        }

        // Crear un arreglo para almacenar los animales creados
        const createdAnimals = [];

        // Recorrer la lista de animales y crearlos en la base de datos
        for (const animalData of animalsData) {
            const {
                name,
                species,
                age,
                owner,
                vaccinesUpdated
            } = animalData;

            // Crear un nuevo animal en la base de datos
            const animal = new Animal({
                name,
                species,
                age,
                owner,
                vaccinesUpdated
            });

            // Guardar el animal en la base de datos
            await animal.save();

            // Agregar el animal creado al arreglo
            createdAnimals.push(animal);
        }

        res.status(201).json(createdAnimals);
    } catch (error) {
        res.status(500).json({ error: 'Hubo un error al crear múltiples animales.' });
    }
});

// ---------------------------------- DELETE-----------------------------------------------

router.delete('/animals', async (req, res) => {
    const animals = await Animal.deleteMany();
    res.status(200).json(animals);
});
//para eliminar un animal por ID
router.delete('/animals/:id', async (req, res) => {
    const animal = await Animal.findByIdAndRemove(req.params.id);
    if (!animal) {
        return res.status(404).json({ message: 'Animal no encontrado' });
    }
    res.status(204).json();
});


// ----------------------------------   PUT   -----------------------------------------------

//para actualizar un animal por ID
router.put('/animals/:id', async (req, res) => {
    const animal = await Animal.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!animal) {
        return res.status(404).json({ message: 'Animal no encontrado' });
    }
    res.status(200).json(animal);
});


module.exports = router;
