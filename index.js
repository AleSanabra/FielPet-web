// Librerias y dependencias
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const PassportLocal = require('passport-local').Strategy;


// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser('secreto'));
app.use(session({
  secret: 'secreto',
  resave: true,
  saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


// Variables globales
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// routes
app.use(require('./routes'));


// static files
app.use(express.static(path.join(__dirname, 'public')));


// listening the Server
app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'));
});
