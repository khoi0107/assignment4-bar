/**
 * Created by neo on 2/23/17.
 */
var subdomain = require('express-subdomain');
var express = require('express');
var bart = require('./routes/bartapi');

var index = require('./routes/index');

var app = express();
app.use(subdomain('bart', bart));
app.use('/',index);
//app.use('/api/',bart);

module.exports = app;