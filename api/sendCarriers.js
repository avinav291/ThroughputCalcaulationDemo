//
//  Created by Avinav on 20/03/17
//  Copyright © 2017 Avinav. All rights reserved.
//

var Counter = require('../model/counter');


module.exports = function (req, res) {


    Counter.find({}, 'airportName carrierName', function (err, carriers) {

        if (err || !carriers){
            console.log("Error in finding Carriers");
            res.json({"Error":"No such Carriers"});
        }

        else{

            var dict = {};
            carriers.forEach(function (carrier) {
                if (carrier.airportName in dict){
                    dict[carrier.airportName].push(carrier.carrierName)
                }
                else {
                    dict[carrier.airportName] = [carrier.carrierName]
                }
            });
            res.json(dict)
        }
    });
};