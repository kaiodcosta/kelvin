const net = require("net");
const http = require('http');
const express = require('express');
const WebSocket = require("ws");

const app = express();

const server = http.createServer(app);


const wss = new WebSocket.Server({ server });

wss.on("connection", function(ws) {
	console.log("Connection from client established");
	var fics = net.createConnection(5000, "freechess.org");
	fics.setEncoding("utf8");
	fics.on("data", function(data) {
		if (ws.readyState !== WebSocket.CLOSED) {
			ws.send(data);
		}
	});
	fics.on("close", function() {
		ws.close();
		console.log("Connection from client closed\n");
	});
	ws.on("end", function() {
		fics.end();
		console.log("Connection ended\n");
	});
	ws.on("close", function() {
		fics.end();
		ws.close();
		console.log("Connection from client closed\n");
	});
	ws.on("message", function(message) {
		fics.write(message);
	});
	ws.on("error", function(err) {
		console.log(err);
	});
});

app.use(express.static(__dirname + '/../build'));

server.listen(process.env.PORT || 8999, () => {
    console.log(`Kelvin server started at port ${server.address().port} :)`);
});
