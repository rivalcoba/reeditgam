// Importando framework mongoose
var mongoose = require('mongoose');

// Creando el esquema
// Un esquema es un modelo
// de algo
var postSchema = 
	new mongoose.Schema({
		title : String,
		link : String,
		upvotes : {type: Number, default: 0},
		comments: [{
			type: mongoose.Schema.Types.ObjectId, 
			ref:'comment'}]
	});

// Cargando el esquema en la base de datos
// o Creando el modelo en la base de datos
mongoose.model('post',postSchema);