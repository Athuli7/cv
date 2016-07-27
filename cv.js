var express = require('express');
var app = express();
var fs = require('fs');

var cvContentOptions = JSON.parse(fs.readFileSync('cvContentOptions.json'));
var cvEngineOptions = JSON.parse(fs.readFileSync('cvEngineOptions.json'));
var package = JSON.parse(fs.readFileSync('package.json'));

var expItemView = fs.readFileSync('views/expItemView.cv','utf8');
var sklItemView = fs.readFileSync('views/sklItemView.cv','utf8');
var proItemView = fs.readFileSync('views/proItemView.cv','utf8');

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
		//xp

		//works
		var ProjectView = "";
		for(var proInd in cvContentOptions.pros){
			var tempPro = cvContentOptions.pros[proInd];
			var tempProView = "";
			tempProView = proItemView;
			tempProView = tempProView.replace('#name#', tempPro.name);
			tempProView = tempProView.replace('#tagline#',tempPro.tagline);
			ProjectView += tempProView;
		}
		rendered = rendered.replace('#proView#',ProjectView);
		//skill
		var SkillView = "";
		for(var skillInd in cvContentOptions.skls){
			var tempSkill = cvContentOptions.skls[skillInd];
			var tempSkillView = "";
			tempSkillView = sklItemView;
			tempSkillView = tempSkillView.replace('#skillname#', tempSkill.domain + "[" + tempSkill.framework + "]" );
			tempSkillView = tempSkillView.replace('#percent#',tempSkill.pro);
			SkillView += tempSkillView;
		}
		rendered = rendered.replace('#sklView#',SkillView);
		//footer
		var depslist = "";
		for(var depIn in package.dependencies){
			depslist = depslist + depIn + ',';
		}
		depslist = depslist.substring(0,depslist.length-1);
		rendered = rendered.replace('#fotView#',
		"<small class=\"copyright\">Designed with <i class=\"fa fa-heart\">"+
		"</i> on "+ "<a href=\"https://nodejs.org/\">Node.js </a>("+depslist+")"+
		" by "+package.author+ " under a "+package.license+" license"+
		"</small>"+"<br><small class=\"copyright\">Updated copy is always available at "+
		"<a href=\""+options.linktocv+"\">"+options.linktocv+"</a></small>"
		);
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