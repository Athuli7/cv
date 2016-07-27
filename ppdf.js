var page = require('webpage').create();
page.open('http://127.0.0.1:9001/', function() {
  page.render('github.pdf');
  phantom.exit();
});