var mongoose = require('mongoose');
// llamo db mongo
exports.connect = function(err, res){
	mongoose.connect('mongodb://localhost/forshare_db');// LOCAL
	// mongoose.connect('mongodb://domisildb:rootshell@ds037617.mongolab.com:37617/domisilapp');// REMOTYE
	
	if (err) throw err;
	console.log('CONECTADO A LA BASE DE DATOS DE MONGODB');
} 