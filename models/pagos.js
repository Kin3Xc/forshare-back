// Modelo Pagos para la base de datos

// Mongoose es una libreria de Node que nos permite
// conectarnos a una base de datos MongoDB y modelar un esquema
// para ella.

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// campos que vamos a guardar en la base de datos
var PagosSchema = new Schema({
  total: Number,
  usuario: {type: Schema.ObjectId, ref: 'User_model'},
  articulo: {type: Schema.ObjectId, ref: 'Articulo_model'},
  fecha_pago: Date,
  createdAt: {type:Date, default: Date.now}
});

// Exportamos el modelo 'Pago_model' para usarlo en otras partes de la aplicación
module.exports = mongoose.model('Pago_model', PagosSchema);
