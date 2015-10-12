// Modelo ategorias para la base de datos

// Mongoose es una libreria de Node que nos permite
// conectarnos a una base de datos MongoDB y modelar un esquema
// para ella.

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// campos que vamos a guardar en la base de datos
var CategoriaSchema = new Schema({
  nombre: String, // nombre de la categoria
  descripcion: String, // descripcion de la categoria
  createdAt: {type:Date, default: Date.now} // fecha de cración del articulo
});

// Exportamos el modelo 'Articulo_model' para usarlo en otras
// partes de la aplicación
module.exports = mongoose.model('Categoria_model', CategoriaSchema);
