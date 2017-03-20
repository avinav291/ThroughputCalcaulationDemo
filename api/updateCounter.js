//
//  Created by Avinav on 20/03/17
//  Copyright © 2017 Avinav. All rights reserved.
//

var Counter = require('../model/counter');
var mongoose = require('mongoose');

//API Requirements
//airportName:  Name of the Airport
//carrierName:  Name of the Carrier

module.exports = function (req, res) {
    var airportName = req.body.airportName;
    var carrierName = req.body.carrierName;
    var counterNumber = req.body.counterNumber;
    var counterCount = req.body.counterCount;
    var throughput = req.body.throughput;


    Counter.findOne({airportName:airportName, carrierName:carrierName}, function (err, counter) {

        if (err){
            console.log("Error in finding the group");
            res.json({"Error":"No Such group Exists"});
        }

        else if (!counter){
            console.log("No such  Counter Exists");
            var newCounter = new Counter({
                airportName:airportName,
                carrierName:carrierName,
                counter:[{counterNumber:counterNumber, counterCount:counterCount, throughput:throughput}]
            });
            newCounter.save(function(err, newCounter){
                if (err) {
                    console.log(err)
                    res.json({"Error": "Could not create a new Group"});
                    return
                }
                else{
                    res.json(newCounter);
                    return
                }
            });

        }

        else{
            Counter.findOneAndUpdate(
                {_id:counter._id, 'counter.counterNumber':counterNumber},
                {$set: {'counter.$.counterCount':counterCount, 'counter.$.throughput':throughput}},
                {new:true},
                function (err, updatedCounter) {
                    //No Such Counter Exists
                    //So push the counter

                    if (err || !updatedCounter) {
                        console.log(err)
                        Counter.findOneAndUpdate({_id:counter._id},
                            {$push:{counter:{counterNumber:counterNumber, counterCount:counterCount, throughput:throughput}}},
                            {new:true},
                            function (err, updatedCounter) {
                                if (err || !updatedCounter){
                                    console.log("Could not Update the Values")
                                    res.json({"Error":"Could not Update the Values"});
                                }
                                else {
                                    console.log("Updated the values")
                                    res.json(updatedCounter);
                                }
                            })
                    }
                    else{
                        console.log("Updated the values 2")
                        res.json(updatedCounter);
                    }
                }
            );
        }
    });
};