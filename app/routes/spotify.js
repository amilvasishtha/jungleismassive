const express = require('express');
const router = express.Router();
const Spotify = require('node-spotify-api');

const spotify = new Spotify({
  id: 'fb4175b757da4773a6f1cc32ce06d553',
  secret: '7363c6d4f9324dbcaf27c5190ef5cc7b'
});

router.get('/search', (req, res, err) => {
  var searchUrl = '';
  searchUrl = 'https://api.spotify.com/v1/search?q=' + req.query.name + '*'
    + '&type=artist,track&offset=0&limit=20';

  spotify.request(searchUrl).then(function(data) {
      res.json({success: true, data});
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err);
      res.json({success: false, msg:'Spotify search failed'});
    });
});

router.get('/audio-analysis/:id', (req, res, err) => {
  spotify.request('https://api.spotify.com/v1/audio-analysis/' + req.params.id).then(function(data) {
      res.json({success: true, data});
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err);
      res.json({success: false, msg:'Spotify get audio analysis failed'});
    });
});


module.exports = router;
