//
//  Created by Avinav on 20/03/17
//  Copyright © 2017 Avinav. All rights reserved.
//

var Counter = require('../model/counter');


module.exports = function (req, res) {

    console.log("Cool")

    var airportName = req.body.airportName;
    var carrierName = req.body.carrierName;

    Counter.findOne({airportName:airportName, carrierName:carrierName}, function (err, counter) {

        if (err||!counter) {
            console.log("Error in finding the group");
            res.json({"Error": "No Such group Exists"});
        }

        else{
            res.json(counter.counter);
        }

    })
};