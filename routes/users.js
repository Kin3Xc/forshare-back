// rutas para los usuarios

var express = require('express');
var router = express.Router();

var user = require('../controllers/users');

// login de usuario
router.post('/login', user.login);

// registrar usuario
router.post('/api/users', user.add_user);

// editar usuario
router.put('/api/users/:id', user.update_user);

// eliminar usuario
router.delete('/api/users/:id', user.delete_user);




// esporto el modulo
module.exports = router;


