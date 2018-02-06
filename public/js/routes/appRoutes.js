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

        ;
        // .when('/login', {
        //     templateUrl: 'views/login.html',
        //     controller: 'LoginController'
        // });

    $locationProvider.html5Mode(true);

}]);
