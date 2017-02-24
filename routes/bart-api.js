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

//http://api.bart.gov/api/sched.aspx?cmd=depart&orig=24th&dest=rock&key=MW9S-E7SL-26DU-VV8V
router.get('/trips', function(req, res, next) {
    //url
    if(req.query.source === "" || req.query.source === undefined || req.query.source  === null || req.query.dest === "" || req.query.dest === undefined || req.query.dest  === null) {
        res.status = 401;
        res.locals.message = "Invalid request missing soucre parameter or dest parameter";
        res.locals.error = "Invalid rquest"
        res.json({message:res.locals.message});

    }
    var args = {
        parameters: { cmd:"depart", orig: req.query.source, dest: req.query.dest, key:"MW9S-E7SL-26DU-VV8V" }
    };


    client.get("http://api.bart.gov/api/sched.aspx",args, function (data, response) {


        if("schedule" in data.root){
            res.json({"schedule":data.root.schedule});
        }else {
            res.status = 401;
            res.locals.message = "Invalid source or dest , please check source code and dest code once again";
            res.locals.error = "Invalid origin"
            res.json({message: res.locals.message});
        }
    })
});


//http://api.bart.gov/api/stn.aspx?cmd=stninfo&orig=ssan&key=MW9S-E7SL-26DU-VV8V

router.get('/station', function(req, res, next) {
    //url
    if(req.query.source === "" || req.query.source === undefined || req.query.source  === null) {
        res.status = 401;
        res.locals.message = "Invalid request missing soucre parameter";
        res.locals.error = "Invalid rquest"
        res.json({message:res.locals.message});

    }
    var args = {
        parameters: { cmd:"stninfo", orig: req.query.source, key:"MW9S-E7SL-26DU-VV8V" }
    };


    client.get("http://api.bart.gov/api/stn.aspx",args, function (data, response) {

            if("stations" in data.root){
                res.json({station:data.root.stations[0].station});
            }else{
                res.status = 401;
                res.locals.message = "Invalid origin , please check origin code once again";
                res.locals.error = "Invalid origin"
                res.json({message:res.locals.message});
            }
//
    })
});


module.exports = router;
