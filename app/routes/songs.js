var Song = require('../models/song');

module.exports = function(app) {

    var express  = require('express');
    var router = express.Router();

    router.get('/songs', function(req, res) {

        // use mongoose to get all todos in the database
        Song.find(function(err, songs) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(songs); // return all todos in JSON format
        });
    });

    router.post('/songs', function(req, res) {

      let newSong = new Song({
        title : req.body.title,
        artist : req.body.artist,
        bpm : req.body.bpm,
        key : req.body.key,
        done: false
      });

    	Song.create(newSong, function(err, song) {
    	    // if (err)
    	    //     res.send(err);

    	    // get and return all the songs after you create another
    	    // Song.find(function(err, songs) {
    	    //     if (err)
    	    //         res.send(err)
    	    //     res.json(songs);
    	    // });

          if(err){
            res.json({success: false, msg:'Failed to add song'});
          } else {
            Song.find(function(err, songs) {
      	        if (err)
      	            res.json({success: false, msg:'Failed to load songs'});
      	        res.json({success: true, msg:'Song added successfully', songs});
      	    });
          }
    	});

    });


    router.delete('/songs/:song_id', function(req, res) {
        Song.remove({
            _id : req.params.song_id
        }, function(err, song) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            Song.find(function(err, songs) {
                if (err)
                    res.send(err)
                res.json(songs);
            });
        });
    });


    app.use('/api', router);

};
