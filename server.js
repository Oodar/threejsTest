var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs')

app.listen(9000);

io.sockets.on('connection', function (socket) {
	socket.broadcast.emit('user connected');

	socket.on('spawn cube', function() {
		console.log('received spawn cube, echoing to other client');
		socket.broadcast.emit('spawn cube');
	});
});



function handler (req, res) {
	console.log("request url: " + req.url); // if url is blank, needs to be index.html
	console.log("fetching: " + __dirname + req.url);

	fs.readFile(__dirname + req.url, function( err, data ) {
		if(err) {
			res.writeHead(500);
			return res.end('Error loading: ' + __dirname + req.url);
		}

		res.writeHead(200);
		res.end(data);

	});
//  fs.readFile(__dirname + '/index.html')
// function (err, data) {
//   if (err) {
//     res.writeHead(500);
//     return res.end('Error loading index.html');
//   }
//
//   res.writeHead(200);
//   res.end(data);
// });
}



