var app = angular.module('appController', [
		'ngMaterial',
		'ngMessages'
]);

var getId= this;
getId.id=[];

app.controller('mainController', ['$scope', '$http', '$location', function($scope, $http, $location) {

	$http.get('http://10.40.0.131:3030')
		.success(function(data){
			$scope.posts=data;
			console.log($scope.posts);
		});

	$scope.openPost = function(id) {
		$location.path('/readArticle');
		getId.id=id;
	};	
}]);

app.controller('draftController', ['$scope', '$http', '$location', function($scope, $http, $location) {

	$http.get('http://10.40.0.131:3030/drafts')
		.success(function(data){
			$scope.posts=data;
			console.log($scope.posts);
		});

	$scope.openPost = function(id) {
		$location.path('/readArticle');
		getId.id=id;
	};	
}]);

app.controller('articleController',['$scope', '$http', '$location', function($scope, $http, $location) {
	$http.get('http://10.40.0.131:3030/'+getId.id)
		.success(function(article){
			$scope.article=article;
			console.log($scope.article);
		});
	$scope.editPost = function() {
				$location.path('/edit');
		};
}]);

app.controller('editController',['$scope', '$http', '$location', function($scope, $http, $location) {

	$http.get('http://10.40.0.131:3030/'+getId.id)
		.success(function(article){
			$scope.newPost=article;
			console.log($scope.newPost);
		});
	$scope.submitPost = function() {
		$http.put('http://10.40.0.131:3030'+ $scope.newPost._id, $scope.newPost)
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

app.controller('postController', ['$scope', '$http', '$location', function($scope,$http,$location) {
	$scope.submitPost = function() {
		console.log($scope.newPost);
		$http.post('http://10.40.0.131:3030/', $scope.newPost)
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

	$scope.goToDrafts = function() {
		$location.path('/drafts');
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
