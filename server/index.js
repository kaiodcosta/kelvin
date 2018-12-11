const net = require("net");
const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 });

wss.on("connection", function(ws) {
	console.log("Connection from client established");
	var fics = net.createConnection(5000, "freechess.org");
	fics.setEncoding("utf8");
	fics.on("data", function(data) {
		if (ws.readyState != WebSocket.CLOSED) {
			ws.send(data);
		}
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
