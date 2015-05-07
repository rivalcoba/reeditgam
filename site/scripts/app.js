console.log("#IvanR: Cargo app.js");
var modulo1 = 
	angular.module("reeditgam",[]);

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
// dependcy injection
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