// Modelo Usuario para la base de datos

// Mongoose es una libreria de Node que nos permite
// conectarnos a una base de datos MongoDB y modelar un esquema
// para ella.

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

// Campos que vamos a guardar en la base de datos
var UserSchema = new Schema({
	nombre: String, // nombre del usuario
	email: { type: String, required: true, index: { unique: true } }, // email unico de la cuenta
	password: String, // contraseña del usuario
	telefono: Number, // numero telefonico del usuario
	avatar: String, // imagen de perfil del usuario
	ocupacion: String,
	bio: String, // biografia del perfil del usuario
	estado: Boolean, // False: No puede publicarr aun, le faltan datos, True: Esta habilitado
  token: String, // token del usuario
	provider: String, // provedor de registro (facebook/twitter)
	direccion: String, // direccion del usuario
	ciudad: String, // ciudad donde reside el usuario
	pais: String, // pais donde reside el usuario
	lat: String, // coordenada latitud
	long: String, //coordenada longitud
  createdAt: {type:Date, default: Date.now} // fecha de registro de la cuenta
});

//correr antes de .save()
UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
      user.password = hash;
      next();
    });
  });
});

// comparar el password en el login
UserSchema.methods.comparePassword = function(password, done){
 bcrypt.compare(password, this.password, function(err, isMatch){
   // done(err, isMatch);
  if (err) return done(err);
  done(null, isMatch);
 });
};

// Exportamos el modelo 'User_model' para usarlo en otras
// partes de la aplicación
module.exports = mongoose.model('User_model', UserSchema);
