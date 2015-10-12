// Modelo Artículos para la base de datos

// Mongoose es una libreria de Node que nos permite
// conectarnos a una base de datos MongoDB y modelar un esquema
// para ella.

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// campos que vamos a guardar en la base de datos
var ArticuloSchema = new Schema({
  articulo: String, // nombre del articulo
  descripcion: String, // descripcion del articulo
  precio: Number, // valor en pesos del articulo
  categoria: String,
//categoria: {type: Schema.ObjectId, ref: 'Categoria_model'}, // ide de la categoria que pertenece el articulo
  imagenes: [String], // colleccion de imagens del articulo
  id_user: String,
  //id_user: {type: Schema.ObjectId, ref: 'User_model'}, // ide del usuario que publica el articulo
  createdAt: {type:Date, default: Date.now} // fecha de cración del articulo
});

// Exportamos el modelo 'Articulo_model' para usarlo en otras
// partes de la aplicación
module.exports = mongoose.model('Articulo_model', ArticuloSchema);
