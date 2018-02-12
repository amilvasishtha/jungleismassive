const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const configDB = require('./config/database');

// Connect To Database
mongoose.Promise = require('bluebird');
mongoose.connect(configDB.url, { promiseLibrary: require('bluebird') })
  .then(() => console.log(`Connected to database ${configDB.url}`))
  .catch((err) => console.log(`Database error: ${err}`));

const app = express();

exports = module.exports = app;

const users = require('./app/routes/users');
const songs = require('./app/routes/songs')(app);

// Port Number
const port = 8080;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});

