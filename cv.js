var express = require('express');
var app = express();
var fs = require('fs');

app.engine('cv', function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));// this is an extremely simple template engine
    var rendered = content.toString().replace('#title#', '<title>'+ options.title +'</title>');
    return callback(null, rendered);
  });
});

app.set('views', './views'); // specify the views directory
app.set('view engine', 'cv'); // register the template engine

app.get('/redirect', function(req, res){
	res.redirect(302,'/');
});

app.get('/', function(req, res){
	res.render('norm',{title:'Athul Raj\'s CV'});
});

//

app.use(express.static('public'));

app.listen(9001,'0.0.0.0');