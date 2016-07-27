var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.send('hello world');
});

app.get('/index.html', function(req, res){
  res.send('index');
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(9001);