angular.module('AuthService', []).factory('AuthService', ['$q', '$timeout', '$http', function ($q, $timeout, $http) {

    // create user variable
    var user = null;

    // return available functions for use in the controllers
    return {
      
        isLoggedIn : function isLoggedIn() {
            if(user) {
              return true;
            } else {
              return false;
            }
        },
        getUserStatus : function getUserStatus() {
            return user;
        },
        login : function login(email, password) {

            // create a new instance of deferred
            var deferred = $q.defer();
            
            // send a post request to the server
            $http.post('/login',
                {email: email, password: password})
                .then(function(res) {
                    if(status === 200 && data.status) {      //CHECK res.status, res.data??
                        user = true;
                        deferred.resolve();
                        console.log("Test sucess 1");
                    } else {
                        user = false;
                        deferred.reject();
                        console.log("Test sucess 2");
                    }
                })
                .catch(function () {
                    user = false;
                    deferred.reject();
                    console.log("Test sucess 3");
                });
            
              // return promise object
              return deferred.promise;
        
        },
        logout : function logout() {

            // create a new instance of deferred
            var deferred = $q.defer();
            
            // send a get request to the server
            $http.get('/user/logout')
                // handle success
                .success(function (data) {
                  user = false;
                  deferred.resolve();
                })
                // handle error
                .error(function (data) {
                  user = false;
                  deferred.reject();
                });
            
            // return promise object
            return deferred.promise;
            
        },
        register : function register(email, password) {

              // create a new instance of deferred
              var deferred = $q.defer();
            
              // send a post request to the server
              $http.post('/user/register',
                {email: email, password: password})
                // handle success
                .success(function (data, status) {
                  if(status === 200 && data.status){
                    deferred.resolve();
                  } else {
                    deferred.reject();
                  }
                })
                // handle error
                .error(function (data) {
                  deferred.reject();
                });
            
              // return promise object
              return deferred.promise;

        }
    };

}]);