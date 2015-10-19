var fs = require('fs');

var Articulo = require('../models/articulos');
var User = require('../models/users');


// funcion para agregar un nuevo articulo
exports.add_articulo = function(req, res){
  // FATLTA VALIDAR DATOS AQUÍ


  //creo el objeto articulo con sus diferentes atributos
  var articulo = new Articulo({
    articulo: req.body.articulo,
    descripcion: req.body.descripcion,
    precio: req.body.precio,
    categoria: req.body.categoria,
    tipo: req.body.tipo,
    imagenes: req.body.imagenes,
    id_user: req.body.id_user
  });

  // almeceno el objeto en la base de datos y devuelvo el objeto agregado
  articulo.save(function(err, data){
    if (err) {
      console.log('Algo salio mal, y no se guardaron los datos '+ err);
      res.json({
        type: false,
        data: 'Error al almacenar los datos en la base de datos'
      });
    }else{
      console.log('Los datos fueron registrados!');
      res.json({
        type: true,
        data: data
      });
    }
  });

} // fin add_articulo



// función que retorna todos los articulos de la base de datos
exports.all_articulos = function(req, res){
  Articulo.find(function(err, data){
      if (err) {
        console.log('Algo esta mal ' + err);
        res.json({
          type: false,
          data: 'Error al consultar los datos'
        });
      }else{
        console.log('Todo está bien, encontre datos');
        res.json({
          type: true,
          data: data
        });
      }
  });
} // find all_articulos


// funcion que retorna un articulo por su ID
exports.articulo_id = function(req, res){
  Articulo.find({ _id: req.params.id}, function(err, data){
      if (err) {
        console.log('Algo salio mal');
        res.json({
          type: false,
          data: 'Error al consultar el articulo'
        });
      }else{
        console.log('Todo bien, el articulo fue encontrado');
        res.json({
          type: true,
          data: data
        });
      }
  });
} // fin articulo_id



// funcion para modificar los datos de un articulo
exports.articulo_update = function(req, res){
  Articulo.findOne({_id: req.params.id}, function(err, data){
      if (err) {
        console.log('algo salio muy mal');
        res.json({
          type: false,
          data: 'Error, el artículo no existe'
        });
      }else{
        console.log('Todo está bien, fresco');

        var articulo = data;
        articulo.articulo = req.body.articulo;
        articulo.descripcion = req.body.descripcion;
        articulo.precio = req.body.precio;
        articulo.categoria = req.body.categoria;

        articulo.save(function(err1, data1){
          if (err1) {
            console.log('No se pudo actualizar');
            res.json({
              type: false,
              data: 'Erro al actualizar el artículo'
            });
          }else{
            res.json({
              type: true,
              data: data1
            });
          }

        });
      }
  });
} // fin articulo_update



// funcion para eliminar un articulo de la base de datos
exports.articulo_delete = function(req, res){
  Articulo.find({_id: req.params.id}).remove(function(err, log){
    if (err) {
      console.log('Error al intentar eliminar el articulo' + err);
      res.json({
        type: false,
        data: 'Error al intenta eliminar el artículo'
      });
    }else{
      res.json({
        type: true,
        data: log
      });
    }
  });
} // fin articulo_delete



// funcion que retorna los articulos de una categoría
exports.articulos_categoria = function(req, res){
  Articulo.find({categoria: req.params.categoria}, function(err, data){
    if (err) {
      console.log('Algo salio muy mal ' +err);
      res.json({
        type: false,
        data: 'Error al consltar los datos'
      });
    }else{
      console.log('Todo va bien, retornos la data');
      res.json({
        type: true,
        data: data
      });
    }
  });
} // fin articulos_categoria


// funcion que retorna los articulos con palabras claves
exports.articulos_palabras = function(){
  Articulo.find({articulo: req.params.claves}, function(err, data){
    if (err) {
      console.console.log('Algo salio mal y no puedo encontrara nada '+err);
      res.json({
        type: false,
        data: 'Error al intentar realizar la consulta a la base de datos'
      });
    }else{
      console.log('todo va bien, retorno data');
      res,json({
        type: true,
        data: data
      });
    }
  });
} // fin articulos_palabras




// retorna todos los articulos de un usuario
exports.articulos_user = function(req, res){
  Articulo.find({id_user: req.params.id}, function(err, data){
    if (err) {
      console.console.log('Algo salio mal y no puedo encontrara nada '+err);
      res.json({
        type: false,
        data: 'Error al intentar leer los datos'
      });
    }else {
      User.populate(data, {path: 'id_user'}, function(err1, data1){
        if (err1) {
          console.console.log('Algo salio mal y no puedo encontrara nada '+err1);
          res.json({
            type: false,
            data: 'Error al leer los articulos del usuario '
          });
        }else {
          console.log('todo va bien, retorno data');
          res.json({
            type: true,
            data: data1
          });
        }
      });
    }
  });
} // fin articulos_user



// devuelve unicamente los articulos que son para prestar o alquilar
exports.articulos_compartir = function(req, res){
  Articulo.find({tipo: "Compartir"}, function(err, data){
    if(err){
      console.log('Algo anda muy mal tío');
      res.json({
        type: false,
        data: 'Ocurrio un error al intentar acceder a los datos'
      });
    }else{
      if (data==[]) {
        res.json({
          type: true,
          data: "No hay datos"
        }); 
      }else{
        res.json({
          type: true,
          data: data
        });
        
      }
    }
  });
}
