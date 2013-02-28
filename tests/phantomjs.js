var page = require('webpage').create();
page.open('http://localhost:6789/capture', function () {
	console.log('captured phantomjs');
});
