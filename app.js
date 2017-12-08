var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');
var contact = require('./routes/contact');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/contact', contact);


//POSTS
app.post("/contact", function(req, res){
	var api_key = 'key-cafe5548a0a07a810a515d4dcf842204';
	var domain = 'sandbox69149603fe334713b5a1cb7fa9e5d94d.mailgun.org';
	var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});
 
	var data = {
	  	from: 'Exposeapp Feedback <postmaster@sandbox69149603fe334713b5a1cb7fa9e5d94d.mailgun.org>',
		to: 'qvers1@gmail.com',
		subject: req.body._name,
		text: req.body._message
	};
 
	mailgun.messages().send(data, function (error, body) {
  		console.log(body);
  		if (!error)
  			res.send("Mail sent");
  		else
  			res.send("Mail not sent"); 				
	});
});

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

module.exports = app;
