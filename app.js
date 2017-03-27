var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var api = require('./api');
var mongoose = require('mongoose');
var firebase = require('firebase');

// var index = require('./routes/index');

var app = express();

/* Get the port and set in express */
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = require("http").createServer(app);
console.log('Server Started');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));


//Database
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/test');

// var uri = "mongodb://username:password@ds137360.mlab.com:37360/throughputdemo";
// var connect = function(callback){
//   mongoose.connect(uri, callback);
// };


//
//Static Directories
app.use(express.static(path.join(__dirname, 'views')));

app.listen(3000);


app.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

//API Routing
console.log("Hi");
app.use('/api', api);

// app.use('/', index);

// server.listen(port);

// FIREBASE HANDLER
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCb63mivmhrLKbppO-C4_Y1l2hpBKor5vU",
  authDomain: "throughputcalc.firebaseapp.com",
  databaseURL: "https://throughputcalc.firebaseio.com",
  storageBucket: "throughputcalc.appspot.com",
  messagingSenderId: "262341843633"
};
firebase.initializeApp(config);

const dbrefObj= firebase.database().ref()
dbrefObj.on('value', snap=>console.log(snap.val()))

//
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
//


// module.exports = app;
