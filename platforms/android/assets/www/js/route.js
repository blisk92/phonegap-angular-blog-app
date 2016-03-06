var app = angular.module('blog', [
		'appController',
		'ngRoute',
		'ngAnimate'
]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/home.html',
			controller: 'mainController'
		})
		.when('/readArticle', {
			templateUrl: 'partials/article.html',
			controller: 'articleController'
		})
		.when('/newpost', {
			templateUrl: 'partials/new-post.html',
			controller: 'postController'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

