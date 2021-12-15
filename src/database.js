const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/base_proyecto_final_computo')
    .then(db => console.log('BASE DE DATOS CONECTADA', db.connection.host))
    .catch(err => console.error(err));