const express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');
// Create global app object
const app = express();

app.use(cors());
mongoose.set('debug', true);

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/'));

app.use(session({ secret: 'user', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/article'));
app.use('/api', require('./routes/article'));
app.use('/api', require('./routes/auth'));

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port ' + server.address().port);
});