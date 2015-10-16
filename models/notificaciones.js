// Modelo comentarios para la base de datos

// Mongoose es una libreria de Node que nos permite
// conectarnos a una base de datos MongoDB y modelar un esquema
// para ella.

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// campos que vamos a guardar en la base de datos
var NotificacionesSchema = new Schema({
  titulo: String,
  mensaje: String,
  data: String,
  de: {type: Schema.ObjectId, ref: 'User_model'},
  para: {type: Schema.ObjectId, ref: 'User_model'},
  createdAt: {type:Date, default: Date.now}
});

// Exportamos el modelo 'Articulo_model' para usarlo en otras
// partes de la aplicación
module.exports = mongoose.model('Notificacion_model', NotificacionesSchema);
