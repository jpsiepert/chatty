var express = require('express');
var app = express();
var port = 8081;
var bodyParser = require('body-parser');
var messages = [{text: 'Sample Message', author: 'A. Lincoln', timeStamp: "1692"}];
// var headers = {
// 		'Connection': 'closed',
// 		'Content-Type': 'application/json',
// 		'Access-Control-Allow-Origin': '*',
// 		'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
// 	  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'		
// 	}

app.listen(port, function(){
	console.log("I'm Listening on," + port + " what do you want?")
});

app.use(bodyParser());

app.use(function(req, res, next){

		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods','OPTIONS, GET, POST');
	  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		
		next();
});
//can install and use cors instead of the headers

app.get('/', function(req, res){
	res.status(200).send(messages)
});

app.post('/', function(req, res){
	var message = req.body;
	message.timeStamp = new Date();
	messages.push(message)
	console.log(message)
	res.send();

});