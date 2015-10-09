var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema({
	nombre: String,
	email: { type: String, required: true, index: { unique: true } },
	username: { type: String, required: true, index: { unique: true } },
	password: String,
	direccion: String,
	telefono: Number,
	avatar: String
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

module.exports = mongoose.model('User_model', UserSchema);