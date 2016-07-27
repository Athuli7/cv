var express = require('express');
var app = express();
var path = require('path');

app.get('/redirect', function(req, res){
	res.redirect(302,'/');
});

/*
app.get('/redirect', function(req, res){
	
});*/

//

app.use(express.static('public'));

app.listen(9001,'0.0.0.0');