const net = require("net");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function(ws) {
	var fics = net.createConnection(5000, "freechess.org");
	fics.setEncoding("utf-8");
	fics.on("data", function(data) {
		ws.send(data);
	});
	fics.on("close", function() {
		ws.terminate();
	});
	ws.on("message", function(message) {
		fics.write(message);
	});
	ws.on("error", function(err) {
		console.log(err);
	});
});
