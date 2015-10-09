var mongoose = require('mongoose');
var path = require('path');
var jwt = require("jsonwebtoken");

var service = require('../services/token');
var usuario = require('../models/users');


// exports.login = function(req, res){
// 	// user
// 	usuario.findOne({ username: req.body.username }, function(err, user){
// 		if (err) next(err);
// 		if(!user) {return res.status(401).send({message: 'No existe ese usuario'})}
		
// 		// aqui viene comprobacion de contraseña bcrypt
// 		if (req.body.password === null) { return res.status(401).send({message:'Ingrese su password'})}

// 		user.comparePassword(req.body.password, function(err, entra){
// 			if (err) throw err;
// 			if(!entra){return res.status(401).send({message: "Contraseña incorrecta"})}
// 			return res
// 				.status(200)
// 				.send({token: service.createToken(user) });
// 		});
// 	});
// }

exports.login = function(req, res){
	usuario.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {

            	// verifico pwd
            	user.comparePassword(req.body.password, function(err, entra){
					if (err) throw err;
					if(!entra){

						res.json({
							type: false,
							data: "Password incorrecto"
						});

					}else{

						res.json({
		                    type: true,
		                    data: user,
		                    token: user.token
		                });
					}					
					
				});

                
            } else {
                res.json({
                    type: false,
                    data: "Incorrect email/password"
                });    
            }
        }
    });
};


// función para agregar un nuevo usuario al sistema
exports.add_user = function(req, res){
	// AQUI VALIDO LOS DATOS QUE VIENEN DEL FRONT

	User.findOne({email: req.body.email}, function(err, user) {
        if (err) {
            res.json({
                type: false,
                data: "Error occured: " + err
            });
        } else {
            if (user) {
                res.json({
                    type: false,
                    data: "User already exists!"
                });
            } else {
                var userModel = new usuario();
                userModel.nombre = req.body.nombre;
                userModel.email = req.body.email;
                userModel.password = req.body.password;

                userModel.save(function(err, user) {
                    user.token = jwt.sign(user, process.env.JWT_SECRET);
                    user.save(function(err, user1) {
                        res.json({
                            type: true,
                            data: user1,
                            token: user1.token
                        });
                    });
                })
            }
        }
    });

	// // Creo el objeto usuario
	// var user = new usuario({
	// 	nombre: req.body.nombre,
	// 	email: req.body.email,
	// 	password: req.body.password
	// });

	// // ejecuto el metodo save para almacenar el nuevo usuario
	// user.save(function(err, data){
	// 	if (err) {return res.send({message: 'Error al almacenar los datos'}) }//Si hubo error
	// 	return res
	// 		.status(200)
	// 		.send({usuario: user, token: service.createToken(user)});
	// });
}


// funcion para editar un usuario
exports.update_user = function(req, res){
	usuario.findOne({_id: req.params.id}, function(err, data){
		if (err) res.send(err);

		var user = data;
		user.nombre = req.body.nombre;
		user.email = req.body.email;

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


// cambiar pwd
exports.change_pwd = function(){
	
}