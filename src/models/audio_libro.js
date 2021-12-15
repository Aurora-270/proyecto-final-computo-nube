const mongoose2 = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose2;

const audio_libroSchema = new Schema({
  Titulo: String,
  Autor: String,
  Genero: String,
  Duracion: String
});

module.exports = mongoose2.model('audio_libros', audio_libroSchema);