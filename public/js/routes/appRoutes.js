angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        // home page
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        // nerds page that will use the NerdController
        .when('/managesongs', {
            templateUrl: 'views/manageSongs.html',
            controller: 'SongController'
        })

        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })

        .when('/logout', {
            controller: 'LogoutController'
        })

        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
        })

        .otherwise({
            redirectTo: '/'
        })

        ;

    $locationProvider.html5Mode(true);

}]);
