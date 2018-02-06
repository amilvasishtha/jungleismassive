    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var port     = process.env.PORT || 8080;
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
    var passport = require('passport');
    var flash    = require('connect-flash');
    var cookieParser = require('cookie-parser');
    var session      = require('express-session');

    var configDB = require('./config/database.js');

    // configuration =================

    mongoose.connect(configDB.url); // connect to our database

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    // app.use(methodOverride());
    app.use(methodOverride('X-HTTP-Method-Override')); 

    app.use(cookieParser()); // read cookies (needed for auth)
    app.set('view engine', 'ejs'); // set up ejs for templating

    require('./config/passport')(passport); // pass passport for configuration

    // required for passport
    app.use(session({ secret: 'boomboomboomboomiwantamzinmypum' })); // session secret
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions
    app.use(flash()); // use connect-flash for flash messages stored in session

    // listen (start app with node server.js) ======================================
    app.listen(port);
    console.log("App listening on port " + port);

    // expose app           
    exports = module.exports = app;   

        // routes ======================================================================
    require('./app/routes/login.js')(app, passport); // load our routes and pass in our app and fully configured passport
    require('./app/routes/song.js')(app);

    // application -------------------------------------------------------------
    app.get('*', function(req, res) {
        res.sendFile('./public/index.html', { root: __dirname }); // load the single view file (angular will handle the page changes on the front-end)
    });

    // routes ======================================================================

    // api ---------------------------------------------------------------------

    // app.get('/api/songs', function(req, res) {

    //     // use mongoose to get all todos in the database
    //     Song.find(function(err, songs) {

    //         // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    //         if (err)
    //             res.send(err)

    //         res.json(songs); // return all todos in JSON format
    //     });
    // });

    //     // create todo and send back all todos after creation
    // app.post('/api/songs', function(req, res) {

    //     // create a todo, information comes from AJAX request from Angular
    //     Song.create({
    //         title : req.body.title,
    //         artist : req.body.artist,
    //         bpm : req.body.bpm,
    //         key : req.body.key,
    //         done : false
    //     }, function(err, song) {
    //         if (err)
    //             res.send(err);

    //         // get and return all the todos after you create another
    //         Song.find(function(err, songs) {
    //             if (err)
    //                 res.send(err)
    //             res.json(songs);
    //         });
    //     });

    // });

    // // delete a todo
    // app.delete('/api/songs/:song_id', function(req, res) {
    //     Song.remove({
    //         _id : req.params.song_id
    //     }, function(err, song) {
    //         if (err)
    //             res.send(err);

    //         // get and return all the todos after you create another
    //         Song.find(function(err, songs) {
    //             if (err)
    //                 res.send(err)
    //             res.json(songs);
    //         });
    //     });
    // });