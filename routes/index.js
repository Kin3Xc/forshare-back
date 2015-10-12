// rutas para los usuarios

var express = require('express');
var router = express.Router();

var user = require('../controllers/users');
var authorized = require('../authorized/authorized');
var articulos = require('../controllers/articulos');

var passport = require('passport'); // Passport: Middleware de Node que facilita la autenticación de usuarios
// Importamos el modelo usuario y la configuración de passport
require('../models/users');
require('../authorized/passport')(passport);

// route home
router.get('/', function(req, res){
  res.json({
  	message: 'Welcome to API forshare',
  	description: 'Encargada de mantener actualizados a los diferentes clientes hacerca de los datos de forshare',
  	author: 'Elkin Urango',
  	date: '10/10/2015'
  });
});

// RUTAS USUARIO
/* Rutas de Passport */
// Ruta para desloguearse
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});
// Ruta para autenticarse con Twitter (enlace de login)
router.get('/auth/twitter', passport.authenticate('twitter'));
// Ruta para autenticarse con Facebook (enlace de login)
router.get('/auth/facebook', passport.authenticate('facebook'));
// Ruta de callback, a la que redirigirá tras autenticarse con Twitter.
// En caso de fallo redirige a otra vista '/login'
router.get('/auth/twitter/callback', passport.authenticate('twitter',
  { successRedirect: '/', failureRedirect: '/api/login' }
));
// Ruta de callback, a la que redirigirá tras autenticarse con Facebook.
// En caso de fallo redirige a otra vista '/login'
router.get('/auth/facebook/callback', passport.authenticate('facebook',
  { successRedirect: '/', failureRedirect: '/api/login' }
));

// login de usuario
router.post('/api/login', user.login);

// registrar usuario
router.post('/api/signup', user.add_user);

// editar usuario
router.put('/api/users/:id', authorized.ensureAuthorized, user.update_user);

// eliminar usuario
router.delete('/api/users/:id', authorized.ensureAuthorized, user.delete_user);

// FIN RUTAS USUARIO


// RUTAS RTICULOS
// permite publicar un articulo
router.post('/api/articulo/add', articulos.add_articulo);

// retorna todos los articulos de la base de datos
router.get('/api/articulos', articulos.all_articulos);

//  retorna un articulo por id
router.get('/api/articulo/:id', articulos.articulo_id);

// permite modificar un articulo
router.put('/api/articulo/:id', articulos.articulo_update);

// permite eliminar un articulo de la base de datos
router.delete('/api/articulo/:id', articulos.articulo_delete);

// retorna los articulos de una categoria
router.get('/api/articulos/:categoria', articulos.articulos_categoria);

// retorna la busqueda de articulos por palabras claves
router.get('/api/articulos/:claves', articulos.articulos_palabras);

// FIN RUTAS ARTICULOS


// esporto el modulo
module.exports = router;