/**
 * Created by neo on 2/23/17.
 */
var subdomain = require('express-subdomain');
var express = require('express');
var bart = require('./routes/bartapi');
var index = require('./routes/index');
var homepage = require('./routes/homepage')

var app = express();
app.use(subdomain('bart', index));
app.use('/',homepage);
app.use('/api/',bart);

module.exports = app;