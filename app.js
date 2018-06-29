var express = require('express');
var app = express();

var serviceController = require('./service/serviceController');
app.use('/service', serviceController);

app.get('/', function (req, res) {
    res.send('Hello World!');
});

module.exports = app;