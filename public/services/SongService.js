angular.module('SongService', []).factory('Song', ['$http', function($http) {

    return {
        get : function() {
            return $http.get('/api/songs');
        },

        create : function(songData) {
            return $http.post('/api/songs', songData);
        },

        delete : function(id) {
            return $http.delete('/api/songs/' + id);
        }
    }       

}]);