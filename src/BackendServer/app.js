var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var userdata = require('./routes/userData');
var register = require('./routes/register');
var verifyUser = require('./routes/verifyUser');
var friendList =  require('./routes/friendList');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.post('/login',login.login);
app.post('/register',register.register);
app.post('/verifyUser',verifyUser.verify);
app.post('/updateProfile',userdata.updateUserProfile);
app.post('/sendFriendRequest',friendList.sendFriendRequest);
app.post('/followFriend',friendList.followFriend);
app.post('/getSearchFriendList',friendList.getSearchFriendList);


app.get('/getUserData',userdata.getUserData);
app.get('/getFriendList',friendList.getFriendList);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
console.log("server running on port: 3000");

module.exports = app;
