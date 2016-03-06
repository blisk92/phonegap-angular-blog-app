var app = angular.module('appController', [
		'ngMaterial'
]);

var getId= this;
getId.id=[];

app.controller('mainController', ['$scope', '$http', '$location', function($scope, $http, $location) {

	//$http.get('http://127.00.1:3030')
	$http.get('http://192.168.1.34:3030')
		.success(function(data){
			$scope.posts=data;
			console.log($scope.posts);
		});

	$scope.openPost = function(id) {
		$location.path('/readArticle');
		getId.id=id;
	};	
}]);

app.controller('articleController',['$scope', '$http', function($scope, $http) {
	$http.get('http://192.168.1.34:3030/'+getId.id)
		.success(function(article){
			$scope.article=article;
			console.log($scope.article);
		});
}]);

app.controller('postController', ['$scope', '$http', '$location', function($scope,$http,$location) {
	$scope.submitPost = function() {
		console.log($scope.newPost);
		$http.post('http://192.168.1.34:3030/', $scope.newPost)
			.success(function(post){
				console.log(post);
				$scope.newPost=[];
				$location.path('/');
			})
		.error(function(error){
			console.log("Error" + error);
		});
	};
}]);

app.controller('sideNavController', ['$scope', '$timeout', '$mdSidenav', '$location', function($scope, $timeout, $mdSidenav, $location) {
	$scope.toggleLeft = buildDelayedToggler('left');

	$scope.openHome = function() {
		$location.path('/');
		$mdSidenav('left').toggle();
	};

	$scope.makeNewPost = function() {
		$location.path('/newpost');
		$mdSidenav('left').toggle();
	};

	function debounce(func,wait,context){
		var timer;
		return function debounce() {
			var context = $scope,
			args = Array.prototype.slice.call(arguments);
			$timeout.cancel(timer);
			timer = $timeout(function() {
				time = undefined;
				func.apply(context, args);
			}, wait || 10);
		};
	};

	function buildDelayedToggler(navID) {
		return debounce(function() {
			$mdSidenav(navID)
				.toggle();
		}, 200);
	};
}]);
