var http = require('http');
var port = 8081;
var messages = [{text: "message 1"}, {text: "other message"}];
var headers = {
		'connection': 'closed',
		'content-type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
	  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'		
	}
var sendMessages = function(res){
	res.writeHead(200, headers)
	res.end(JSON.stringify(messages));
}



var onRequest = function(req, res){
	res.writeHead(200, headers);
	
	if(req.method == "POST"){
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
			sendMessages(res);
		});
	}

	if(req.method === "GET"){
	res.end(JSON.stringify(messages));
}	
 if(req.method === 'OPTIONS'){
      res.end(JSON.stringify({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
      }))
    }
	console.log(req.method)
};



http.createServer(onRequest).listen(port)
console.log("listening on " + port);