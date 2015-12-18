var express = require('express');
var session = require('express-session');
var ejsLayouts = require('express-ejs-layouts');
var request = require('request');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var db = require('./models');
var flash = require('connect-flash');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(ejsLayouts);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());

app.use(session({
  secret: 'random phrase',
  resave: false,
  saveUninitialized: true
}));

// Load the user for the current session
app.use(function(req, res, next) {
  req.session.user = 14;
  if (req.session.user) {
    db.user.findById(req.session.user).then(function(user) {
      req.currentUser = user;
      res.locals.currentUser = user;
      next();
    });
  } else {
    req.currentUser = false;
    res.locals.currentUser = false;
    next();
  }
});

app.use(function(req, res, next) {
  res.locals.alerts = req.flash() || "";
  // console.log(res.locals.alerts);
  next();
});

// Wire up routes
app.use('/', require('./controllers/index'));
app.use('/wishlists', require('./controllers/wishlists'));
app.use('/search', require('./controllers/search'));
app.use('/users', require('./controllers/users'));
app.use('/login', require('./controllers/login'));
app.use('/items', require('./controllers/items'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
