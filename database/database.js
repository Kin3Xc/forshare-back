var mongoose = require('mongoose');
// llamo db mongo
exports.connect = function(err, res){
	mongoose.connect('mongodb://localhost/forshare_db');// LOCAL
	// mongoose.connect('mongodb://root:root@ds051873.mongolab.com:51873/forshare_db');// REMOTE

	if (err) throw err;
	console.log('CONECTADO A LA BASE DE DATOS DE MONGODB');
}


