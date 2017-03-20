var mongoose = require("mongoose");

var counterSchema = mongoose.Schema({
    airportName:{type:String, required:true},
    carrierName:{type:String, required:true},
    counter:[{counterNumber:Number, counterCount:Number, throughput:Number}]
});

var counter = mongoose.model('Counter', counterSchema);
module.exports = counter;