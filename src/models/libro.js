const mongoose2 = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const { Schema } = mongoose2;

const libroSchema = new Schema({
  Titulo: String,
  Autor: String,
  Genero: String,
  Cantidad: Number
});

module.exports = mongoose2.model('libros', libroSchema);