//Basic required imports for NodeJS
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
//Used for easy parsing of user-agent for response
var useragent = require('express-useragent');
//create an instance of express for our app and instantiate bodyParser and cors
var app = module.exports = express();
var port = 3000;
app.use(bodyParser.json()); 
app.use(cors());
app.use(useragent.express()); //documentation at GitHub
// api/whoami
app.get('/', function(req, res){
	res.send('Please use /api/whoami/');
});

app.get('/api/whoami', function(req, res, next){
	var input = req.body;
	//get these information at express documentations
	var ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
	if (ipAddress.indexOf("::ffff:")) {
	  ipAddress = ipAddress.slice(0, 14);
	}
	var language = req.acceptsLanguages();
	// var software = req.useragent;
	var software = req.get('User-Agent');
	var i = software.indexOf("(");
	var f = software.indexOf(")");
	software = software.slice((i+1), f);

	var json = {
	"ipaddress": ipAddress,
	"language": language[0],
	"software": software
	};
	res.json(json);

});

app.listen(port, function(){
	console.log('Connected on port ' + port);
});