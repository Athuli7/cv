var page = require('webpage').create();
page.viewportSize = {
  width: 1000,
  height: 500
};
page.open('http://127.0.0.1:9001/', function() {
  page.render('public/Athul_Raj.pdf');
  phantom.exit();
});