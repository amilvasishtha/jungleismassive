var mongoose = require('mongoose');

module.exports = mongoose.model('Song', {
    title : String,
    artist : String,
    bpm : Number,
    key : Number,
    mode: Number,
});
