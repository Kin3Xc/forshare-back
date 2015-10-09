var mongoose = require('mongoose');
var path = require('path');

var service = require('../service/token');
var usuario = mongoose.model('User_model');

// función para agregar un nuevo usuario al sistema
exports.add_user = function(req, res){
	// AQUI VALIDO LOS DATOS QUE VIENEN DEL FRONT

	// Creo el objeto usuario
	var user = new usuario({
		nombre: req.body.nombre,
		email: req.body.email,
		username: req.body.username,
		password: req.body.password
	});

	// ejecuto el metodo save para almacenar el nuevo usuario
	user.save(function(err, data){
		if (err) {return res.send({message: 'Error al almacenar los datos'}) }//Si hubo error
		return res
			.status(200)
			.send({usuario: user, token: service.createToken(user)});
	});
}


// funcion para editar un usuario
exports.update_user = function(req, res){
	usuario.findOne({_id: req.params.id}, function(err, data){
		if (err) res.send(err);

		var user = data;
		user.nombre = req.body.nombre;
		user.email = req.body.email;
		user.username = req.body.username;

		user.save(function(err, data){
			if (err) throw err;
			res.json(data);
		});

	});
}


// función para elimina usuario
exports.delete_user = function(req, res){
	usuario.find({_id: req.params.id}).remove(function(err, log){
		if(err) res.send(err);
		res.send(log);
	});
}