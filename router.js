/**
 * Created by neo on 2/23/17.
 */

var express = require('express');
var bart = require('./routes/bart-api');

var index = require('./routes/index');
var users = require('./routes/users');


var app = express();

app.use('/',index);
app.use('/api/',bart);

module.exports = app;