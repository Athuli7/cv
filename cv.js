var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/index.html', function(req, res){
  res.send('index');
});

app.use(express.static('public'));

app.listen(9001,'0.0.0.0');