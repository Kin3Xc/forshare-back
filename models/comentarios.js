// Modelo comentarios para la base de datos

// Mongoose es una libreria de Node que nos permite
// conectarnos a una base de datos MongoDB y modelar un esquema
// para ella.

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// campos que vamos a guardar en la base de datos
var ComentarioSchema = new Schema({
  comentario: String, // comentario
  usuario: {type: Schema.ObjectId, ref: 'User_model'}, // usuario que realiza el comentario
  articulo: {type: Schema.ObjectId, ref: 'Articulo_model'}, // articulo que se comentó
  createdAt: {type:Date, default: Date.now} // fecha del comentario
});

// Exportamos el modelo 'Articulo_model' para usarlo en otras
// partes de la aplicación
module.exports = mongoose.model('Comentario_model', ComentarioSchema);
