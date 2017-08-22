var express = require('express');
var app = express();
var data = require('./data.json')


app.get('/creatematch', function (req, res) {
  res.json(data.createMatch );
})

app.get('/matchinfo', function (req, res) {
  res.json(data.oneMatchInfo);
})


var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});