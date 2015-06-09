var express = require('express');
var router = express.Router();

// Importando lo necesario
// para trabajar con la
// base de datos
var mongoose = require('mongoose');
var post = mongoose.model('post');//error estaba posts
var comment = mongoose.model('comment');

// Creando la primera ruta
// de nuestro web service
// Ruta creada: http://localhost:3000/posts
// Ruta que obtiene todos los posts
// guardados en la base de datos
router.get('/posts',function(req, res, next ){
  post.find(function(err, posts){
    // Si courre un error en la base de datos
    // paso el error a la siguient funcion
    if(err){
      return next(err);
    }
    // Si no ocurre error
    res.json(posts);
  });
});

// Ruta que crea un post en la base de datos
// Ruta creada: 
// http://localhost:3000/post?title=itgam&link=www.itgam.com
router.post('/post',function(req, res, next){
  // Creo un nuevo post del cuerpo
  // de la peticion
  var newPost = new post(req.body);
  // Salvando ese nuevo posts
  // en la base de datos
  newPost.save(function(err, newPost){
    if(err)
    {
      return next(err);
    }
    res.json(newPost);
  });
});


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Rivalcoba' });
});

module.exports = router;
