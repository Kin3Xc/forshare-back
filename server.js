// Archivo principal del Backend, configuración del servidor

// Require Dependencias
var express = require('express'); // Express: Framework HTTP para Node.js
var router = express.Router();
var mongoose = require('mongoose'); // Mongoose: Libreria para conectar con MongoDB
var morgan = require("morgan");

var methodOverride = require('method-override');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var favicon = require('favicon');
var fs = require('fs');
var multer = require('multer');
var jwt = require("jsonwebtoken");
var passport = require('passport'); // Passport: Middleware de Node que facilita la autenticación de usuarios

var routes_users = require('./routes/users'); // Dónde tenemos la configuración de las rutas de usuarios

// Importamos el modelo usuario y la configuración de passport
require('./models/users');
require('./authorized/passport')(passport);

// conexion a la base de datos de mongoDB que esta en local
var database = require('./database/database.js');
database.connect();

// Iniciamos la aplicación Express
var app = express();


// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
// app.use(morgan("dev"));
// app.use(function(req, res, next) {
// res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
//     next();
// });

// require todos los modelos
fs.readdirSync(__dirname+ '/models').forEach(function(filename){
  if (~filename.indexOf('.js')) require(__dirname+'/models/'+filename);
});


// app.use(multer({ dest: './uploads/'}));

// Middlewares de Express que nos permiten enrutar y poder
// realizar peticiones HTTP (GET, POST, PUT, DELETE)
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());

// Configuración de Passport. Lo inicializamos
// y le indicamos que Passport maneje la Sesión
app.use(passport.initialize());
app.use(passport.session());
// app.use(app.router);


// app.use(logger('dev'));
app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));


// routes API


// routes users
app.use('/', routes_users);


// ERROR HANDLERS

//catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
      res.send('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
    res.send('error', {
    message: err.message,
    error: {}
  });
});

process.on('uncaughtException', function(err) {
  console.log(err);
});


// Start the server
app.set('port', process.env.PORT || 8000);//Puerto para express

var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});

module.exports = app;
