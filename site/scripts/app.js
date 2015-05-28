console.log("#IvanR: Cargo app.js");
// Inyectadon el modulo de ui-router
// como parametro del arreglo de objetos
// del modulo
var modulo1 = 
	angular.module("reeditgam",['ui.router','hSweetAlert']);

// Configurando las rutas
// Recibe un arreglo de elementos
modulo1.config(
	['$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider){
		// Iniciando rutina de configuracion
		// Creando ruta /Home
		$stateProvider.state('home',{
			//Definiendo estado como un objeto
			url:"/home", // Url que define el estado
			templateUrl: "/home.html", // Plantilla base para el estado
			controller: "mainCtrl"
		});
		// Creando Ruta de visualizacion
		// de Post
		$stateProvider.state('posts',{
			url: "/posts/{id}",
			templateUrl: "/posts.html",
			controller: "postsCtrl"
		});
		// Url por defecto
		$urlRouterProvider.otherwise('home');
	}]);

// Creando un servicio del tipo factory
modulo1.factory('posts',[function(){
	// Cuerpo del factory llamado post
	var o = {
		posts : [
			{
				id: 0,	
				title: "post 1", upvotes: 15,
				comments: [
					{author: "Karina", body:"Esto esta de pelos.",
					upvotes:3},
					{author: "Gamaliel", body:"Esto es basura.",
					upvotes:0}]
			},
			{	
				id: 1,
				title: "post 2", upvotes: 4,
				comments: [
					{author: "Coco", body:"Esto es asombroso.",
					upvotes:5},
					{author: "Cristian", body:"Esto esta aburrido.",
					upvotes:1}]
			}
		]
	};
	// Retronado objeto de datos persistentes
	return o;
}]);

// Creando controlador	
// dependency injection
// Creando controlador mainCtrl
modulo1.controller("mainCtrl",[
	'$scope','posts','sweet', // Inyectando factory post
	function($scope, posts, sweet){
		$scope.test = "Hola Angular";
		
		// Modelo al cual se le asigna
		// el resultado del factory
		$scope.posts = posts.posts;

		 // Metodo del controlador
		 $scope.addPost = function(){
		 	if(!$scope.title || $scope.title === "")
		 	{
		 		//alert("No se permite postear titulos vacios");
				 sweet.show('No se permite postear titulos vacios');
		 		return;
		 	}
		 	$scope.posts.push(
		 		{
					id: $scope.posts.length,
		 			title: $scope.title,
		 			link: $scope.link,
		 		 	upvotes: 0,
					comments : [{
						author : "Gustavo",
						body: "Me gusto ese link.",
						upvotes: 0},
						{
							author: "Keila",
							body: "Awesome link.",
							upvotes: 2
						}]
		 		 });
		 	// Two-way data binding
		 	$scope.title = "";
		 	$scope.link = "";
		 };
		 // Metodo que incrementa el voto
		 // de un post en una unidad
		 $scope.incrementUpvotes = function(post){
		 	post.upvotes += 1;
		 };
	}]);

// Creando controlador postsCtrl
modulo1.controller("postsCtrl",[
	'$scope',
	'$stateParams',
	'posts',
	function($scope, $stateParams, posts){
		// Cuerpo del controlador
		$scope.incrementUpvotes = function(comment) {
			comment.upvotes += 1;
		};
		
		// Agregando al controlador
		// la funcionalidad de agregar
		// comentarios a cada post
		$scope.addComment = function(){
			if($scope.body === '')
				return;
			$scope.post.comments.push({
				body: $scope.body,
				author: "admin", // todo: cambiar por usuario logeado
				upvotes: 0
			});
		$scope.body = "";
		};
		
		// Obteniendo el parmetro id de los
		// parametros del estado de la ruta
		// y pasandolo como argumetos
		// al objeto del factory
		$scope.post = posts.posts[$stateParams.id];
		
	}]);