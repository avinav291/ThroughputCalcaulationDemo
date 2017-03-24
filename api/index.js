var express = require("express");
var api = express.Router();

var updateCounter = require('./updateCounter');
// var addCounter = require('./addCounter');
// var sendCounter = require('sendCounter');
// var sendAirports = require('./sendAirports');
var sendCarriers = require('./sendCarriers');
var sendQueueData = require('./sendQueueData');

// api.post('updateCounter', function(req, res){
//     updateCounter(req, res);
// });

api.post('/sendQueueData', function(req, res){
   console.log("Sending Queue Data on Request");
   sendQueueData(req, res);
});

api.post('/updateCounter', function(req, res){
   console.log("updateCounter");
   updateCounter(req, res);
});

api.get('/sendCarriers', function(req, res){
   console.log("sending Carriers");
   sendCarriers(req, res);
});

module.exports = api;