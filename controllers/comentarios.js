var mongoose = require('mongoose');
var path = require('path');

var Comentario = require('../models/articulos');


// agrega un comentario
exports.comentario_add = function(req, res){
  // AQUI VA LA VALIDACION DE LOS DATOS QUE VIENEN DEL FRONT

  var comentario = new Comentario({
    comentario: req.body.comentario,
    usuario: req.body.usuario,
    articulo: req.body.articulo
  });

  comentario.save(function(err, data){
    if (err) {
      console.log('Algo esta mal y no se pudo crear el comentario');
      res.json({
        type: false,
        data: 'Error al intentar crear el comentario'
      });
    }else {
      console.log('Todo bien, el comentario se agregó');
      res.json({
        type: true,
        data: data
      });
    }
  });

} // fin comentario_add


// permite modificar un comentario
exports.comentario_update = function(req, res){
  Comentario.findOne({_id: req.params.id}, function(err, data){
    if (err) {
      console.log('Algo está mal, lo siento');
      res.json({
        type: false,
        data: 'Error, el comentario no existe'
      });
    }else {
      var comentario = data;
      comentario.comentario = req.body.comentario;
      comentario.usuario = req.body.usuario;
      comentario.articulo = req.body.articulo;

      comentario.save(function(err1, data1){
        if (err1) {
          console.log('No se pudo actualizar el comentario');
          res.json({
            type: false,
            data: 'Error al intentar guardar la actualización'
          });
        }else {
          console.log('Todo va muy bien');
          res.json({
            type: true,
            data: data1
          });
        }
      });

    }
  });
} // comentario_update


// función que permite eliminar un comentario
exports.comentario_delete = function(req, res){
  Comentario.find({_id: req.params.id}).remove(function(er, log){
    if (err) {
      console.log('Error al eliminar el comentario');
      res.json({
        type: false,
        data: 'Error al intentar eliminar el comentario, intentelo nuevamante'
      });
    }else {
      console.log('Todo va bien, el comentario ha sido eliminado');
      res.json({
        type: true,
        data: log
      });
    }
  });
} // fin comentario_delete




// retorna todos los comentarios de un articulo
exports.comentarios_articulo = function(req, res){
  Comentario.find({articulo: req.params.articulo}, function(err, data){
    if (err) {
      console.log('Algo anda mal' + err);
      res.json({
        type: false,
        data: 'Error al consultar los datos'
      })
    }else {
      res.json({
        type: true,
        data: data
      });
    }
  });
}
