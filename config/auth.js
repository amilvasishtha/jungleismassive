// expose our config directly to our application using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : '1741304915921260', // your App ID
        'clientSecret'  : '23689f886cbe11365de35d041d03a903', // your App Secret
        'callbackURL'   : 'http://localhost:8080/auth/facebook/callback',
        'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
        'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
    },

    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : '350950858955-g60nq8r9kqqv9l8g1grbcfba9oc8ve3g.apps.googleusercontent.com',
        'clientSecret'  : 'A_7GX5nE9YnySBVJFYeV_tVk',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }

};
