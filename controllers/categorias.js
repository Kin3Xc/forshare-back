var mongoose = require('mongoose');
var path = require('path');

var Categoria = require('../models/categorias');


// agrega una categoria
exports.categoria_add = function(req, res){
  // AQUI VA LA VALIDACION DE LOS DATOS QUE VIENEN DEL FRONT

  var categoria = new Categoria({
    nombre: req.body.nombre,
    descripcion: req.body.descripcion
  });

  categoria.save(function(err, data){
    if (err) {
      console.log('Algo esta mal y no se pudo crear la categoría');
      res.json({
        type: false,
        data: 'Error al intentar crear la categoría'
      });
    }else {
      console.log('Todo bien, la categoría se agregó');
      res.json({
        type: true,
        data: data
      });
    }
  });

} // fin categoria_add


// funcion que retona todas las categorias del sistema
exports.categorias_all = function(req, res){
  Categoria.find(function(err, data){
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
}