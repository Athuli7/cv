var page = require('webpage').create();
page.viewportSize = {
  width: 1366,
  height: 6000
};
page.open('http://127.0.0.1:9001/', function() {
  page.render('public/Athul_Raj.pdf');
  phantom.exit();
});