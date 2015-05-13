console.log("#IvanR: Cargo app.js");
// Inyectadon el modulo de ui-router
// como parametro del arreglo de objetos
// del modulo
var modulo1 = 
	angular.module("reeditgam",['ui.router']);

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
				title: "post 1", upvotes: 15,
				comments: [
					{author: "Karina", body:"Esto esta de pelos.",
					upvotes:3},
					{author: "Gamaliel", body:"Esto es basura.",
					upvotes:0}]
			},
			{	
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
	'$scope','posts', // Inyectando factory post
	function($scope, posts){
		$scope.test = "Hola Angular";
		
		// Modelo al cual se le asigna
		// el resultado del factory
		$scope.posts = posts.posts;

		 // Metodo del controlador
		 $scope.addPost = function(){
		 	if(!$scope.title || $scope.title === "")
		 	{
		 		alert("No se permite postear titulos vacios");
		 		return;
		 	}
		 	$scope.posts.push(
		 		{
		 			title: $scope.title,
		 			link: $scope.link,
		 		 	upvotes: 0
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
modulo1.controller("postCtrl",[
	'$scope',
	'$stateParams',
	'posts'],function($scope, $stateParams, posts){
		// Cuerpo del controlador
		
	});