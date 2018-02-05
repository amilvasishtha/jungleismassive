var musicApp = angular.module('musicApp', []);

function mainController($scope, $http) {
    $scope.formData = {};
    
    // when landing on the page, get all todos and show them

    $http.get('/api/songs')
        .success(function(data) {
            $scope.songs = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });


    $scope.createSong = function() {
    $http.post('/api/songs', $scope.formSongData)
        .success(function(data) {
            $scope.formSongData = {}; // clear the form so our user is ready to enter another
            $scope.songs = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    // delete a todo after checking it
    $scope.deleteSong = function(id) {
        $http.delete('/api/songs/' + id)
            .success(function(data) {
                $scope.songs = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

}