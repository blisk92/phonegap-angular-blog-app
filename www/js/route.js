var app = angular.module('blog', [
		'appController',
		'ngRoute',
		'ngAnimate'
]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'partials/list.html',
			controller: 'mainController'
		})
		.when('/drafts', {
			templateUrl: 'partials/list.html',
			controller: 'draftController'
		})
		.when('/readArticle', {
			templateUrl: 'partials/article.html',
			controller: 'articleController'
		})
		.when('/edit', {
			templateUrl: 'partials/post.html',
			controller: 'editController'
		})
		.when('/newpost', {
			templateUrl: 'partials/post.html',
			controller: 'postController'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

