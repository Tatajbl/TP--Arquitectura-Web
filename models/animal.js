// modelado de datos de los animales
const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: String,
    species: String,
    age: Number,
    owner: String,
});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;
