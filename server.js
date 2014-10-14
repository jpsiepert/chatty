var http = require('http');
var port = 8081;
var messages = [{text: "message 1"}, {text: "other message"}];
var headers = {
		'Connection': 'closed',
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
	  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'		
	}
// var sendMessages = function(res){
// 	res.writeHead(200, headers)
// 	res.end(JSON.stringify(messages));
// }



var onRequest = function(req, res){
	console.log('onRequest Called');
	res.writeHead(200, headers);
	if(req.method === "GET"){
	res.end(JSON.stringify(messages));
}	
	if(req.method === "POST"){
		console.log('second')
		var postData = '';
		req.on('data', function(chunk){
			console.log(chunk)
			postData += chunk.toString();
			console.log(postData)
		});
		req.on('end', function(){
			messageObj = JSON.parse(postData);
			messageObj.timeStamp = Date.now();
			
			messages.push(messageObj);
			console.log("Got POST data:");
			console.log(messageObj);
			res.end(JSON.stringify(messages));
		});
	}

	
 if(req.method === 'OPTIONS'){
 	console.log('first');
      res.end(JSON.stringify(messages))
    }
	console.log(req.method)
};



http.createServer(onRequest).listen(port)
console.log("listening on " + port);