var express = require('express');
var app = express();
var fs = require('fs');
var cvContentOptions = JSON.parse(fs.readFileSync('cvContentOptions.json'));
var cvEngineOptions = JSON.parse(fs.readFileSync('cvEngineOptions.json'));
var package = JSON.parse(fs.readFileSync('package.json'));

app.engine('cv', function (filePath, options, callback) { // define the template engine
	fs.readFile(filePath, function (err, content) {
	    if (err) return callback(new Error(err));// this is an extremely simple template engine
	    //Me
	    var rendered = content.toString();
	    console.log(cvEngineOptions);
	    //info
	    for (var cvEOin in cvEngineOptions){
	    	var tempcvEO = cvEngineOptions[cvEOin];
	    	rendered = rendered.replace(
		    	tempcvEO[0],
		    	tempcvEO[1] + options[tempcvEO[2]] + tempcvEO[3]
		    );
		}
		//social
		//works
		//xp
		//footer
		var depslist = "";
		for(var depIn in package.dependencies){
			depslist = depslist + depIn + ',';
		}
		depslist = depslist.substring(-1);
		rendered = rendered.replace('#footer#',
		"<small class=\"copyright\">Designed with <i class=\"fa fa-heart\">"+
		"</i> on "+
		"<a href=\"https://nodejs.org/\">Node.js</a>("+deplist+")"+
		" by "+package.author+ " under a "+package.license+" license"+
		"</small>");
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
	res.render('norm',cvContentOptions);
});

//

app.use(express.static('public'));

app.listen(9001,'0.0.0.0');