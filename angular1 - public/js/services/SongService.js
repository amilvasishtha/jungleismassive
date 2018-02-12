angular.module('SongService', []).factory('SongService', ['$http', function($http) {

    return {
        // call to get all songs
        get : function() {
            return $http.get('/api/songs').then(function (res) {
                return res;
            })
        },

        // these will work when more API routes are defined on the Node side of things
        // call to POST and create a new song
        create : function(songData) {
            return $http.post('/api/songs', songData).then(function (res) {
                return res;
            })
        },

        // call to DELETE a song
        delete : function(id) {
            return $http.delete('/api/songs/' + id).then(function (res) {
                return res;
            });
        }
    }       

}]);