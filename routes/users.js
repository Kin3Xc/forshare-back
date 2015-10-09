// rutas para los usuarios

var express = require('express');
var router = express.Router();

var auth = require('../auth/auth');  
var middleware = require('../middleware/middleware');
var User = require('../models/user');

var user = require('../controlers/users');

// registrar usuario
router.post('/api/users', user.add_user);

// editar usuario
router.put('/api/users/:id', user.update_user);

// eliminar usuario
router.delete('/api/users/:id', user.delete_user);

