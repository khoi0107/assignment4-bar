/**
 * Created by neo on 2/23/17.
 */
var express = require('express');
var router = express.Router();
var Client = require('node-rest-client').Client;



var client = new Client();

var args = {

};



//http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V

/* GET users listing. */

router.get('/', function(req, res, next) {
    //url
    res.json({message:"Welcome Bart Api"});

});

router.get('/stations', function(req, res, next) {
    //url
    client.get("http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V",args, function (data, response) {
        res.json({stations:data.root.stations});
    })
});

module.exports = router;
