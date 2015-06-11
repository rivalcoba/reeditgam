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

// Creacion de parametros de ruta
router.param('post',function(req, res, next, id){
  // Creando Query
  // usando modelo.findById
  var query = post.findById(id);
  // Ejecuta query
  query.exec(function(err, dbPost){
    // Si hay un error retorna e invoca
    // al siguiente middleware
    if(err){return next(err);}
    // Si no se encuentra el post
    // Se notifica el error al siguiente
    // middleware
    if(!dbPost){
      return next(new Error("No se encontro post"));
    }
    // Si se encontro post se retorna
    // como salida del paramert
    req.post = dbPost;
    // Llama al siguiente middleware
    return next();
  });
});

// Ruta que retorna un post en funcion
// de su Id usa para ello
// el parametro definido arriba
router.get('/posts/:post',function(req, res, next){
  res.json(req.post);
});

// Se agrega ruta para incrementar voto
// se usa verbo PUT
router.put('/posts/:post/upvote',function(req, res, next){
  // Se incrementa el voto del post pasado como
  // id
  req.post.upvote(function(err, post){
    if(err){return next(err);}
    res.json(post);
  });  
});

// Ruta para crear un comentario en un post
router.post('/posts/:post/comments', function(req, res, next){
  // Se crea un nuevo comentario
  // usando el modelo de mongoose
  // a partir del cuerpo de la peticion
  var new_comment = new comment(req.body);
  // Agregando a que post pertenece
  // este nuevo comentario
  new_comment.post = req.post;
  // Salvando base de datos
  new_comment.save(function(err, comentarioSalvado){
    // Verificando errores en la operacion
    if(err){return next(err)}
    // Se relaciona el nuevo comentario
    // con su respectivo post
    req.post.comments.push(comentarioSalvado);
    // Se salva post
    req.post.save(function(err, postSalvado){
      if(err){return next(err)}
      res.json(comentarioSalvado);
    });
  });  
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Rivalcoba' });
});

module.exports = router;
