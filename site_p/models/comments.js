// Importar mongoose
var mongoose =
	require('mongoose');

// Crear esquema
var commentSchema =
	new mongoose.Schema({
		body : String,
		author : String,
		upvotes: {type: Number, default: 0},
		post : {type: mongoose.Schema.Types.ObjectId,
			ref: 'post'}
	});
	
// Creo el modelo
mongoose.model('comment', commentSchema);