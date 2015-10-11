// rutas para los usuarios

var express = require('express');
var router = express.Router();

var user = require('../controllers/users');
var authorized = require('../authorized/authorized');

// route home
router.get('/', function(req, res){
  res.json({
  	message: 'Welcome to API forshare',
  	description: 'Encargada de mantener actualizados a los diferentes clientes hacerca de los datos de forshare',
  	author: 'Elkin Urango',
  	date: '10/10/2015'
  });
});

// login de usuario
router.post('/api/login', user.login);

// registrar usuario
router.post('/api/signup', user.add_user);

// editar usuario
router.put('/api/users/:id', authorized.ensureAuthorized, user.update_user);

// eliminar usuario
router.delete('/api/users/:id', authorized.ensureAuthorized, user.delete_user);




// esporto el modulo
module.exports = router;


