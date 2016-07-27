var express = require('express');
var app = express();
var fs = require('fs');
var gOpts = JSON.parse(fs.readFileSync('options.json');

app.engine('cv', function (filePath, options, callback) { // define the template engine
  fs.readFile(filePath, function (err, content) {
    if (err) return callback(new Error(err));// this is an extremely simple template engine
    //Me
    var rendered = content.toString();
    rendered = rendered.replace('#title#', '<title>'+ options.title +'</title>');
    rendered = rendered.replace('#description#','<meta name="description" content="'+options.title+'">');
    rendered = rendered.replace('#author#', '<meta name="author" content="'+options.author+'">');
    rendered = rendered.replace('#stylecss#', '<link id="theme-style" rel="stylesheet" href="assets/css/'+options.stylecss+'">');
    //rendered.replace('', ''+options.author+'');

    //!Me
    return callback(null, rendered);
  });
});

app.set('views', './views'); // specify the views directory
app.set('view engine', 'cv'); // register the template engine

app.get('/redirect', function(req, res){
	res.redirect(302,'/');
});

app.get('/', function(req, res){
	res.render('norm',gOpts);
});

//

app.use(express.static('public'));

app.listen(9001,'0.0.0.0');