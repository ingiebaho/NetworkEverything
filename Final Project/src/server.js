/*
	UDP And HTTP Server
	Context: node.js

	Serve a web page to a browser with a control panel
	Read control panel and send results to Arduino 

	Web server provided by modules "http" and "express"

	Communication with Arduino is via a UDP socket
	provided by module "dgram"

	Communication with the web client (web browser) 
	is via a UDP socket provided by webSockets.
	Websockets creates a socket on top of the HTTP protocol
	The webSockets module is "socket.io"

	created 7 March 2019
	by Michael Shiloh

	Change log:

	14 Mar 2019 - ms - better comments and cleaned up code
										 send bytes instead of buffers to Arduino
										 receive button events from Arduino and send to web page
*/

/* UDP server talks to Arduino */
var dgram = require('dgram');
var arduinoUDPServer = dgram.createSocket('udp4')
var MY_PORT_FOR_ARDUINO = 7000;
var ARDUINO_PORT_FOR_ME= 5000;
// var ARDUINO_IP_ADDRESS = '192.168.1.4'; // NETGEAR55
var ARDUINO_IP_ADDRESS = '192.168.1.19'; // IMNetwork

/* HTTP server talks to browser */
const http = require('http')
const express = require('express'); // web server application
const app = express();        // instantiate express server
const httpServer = http.Server(app);  // connects http library to server
const HTTP_SERVER_PORT = 8000; 

// Express creates the simple web page
// The argument says where to find pages and scripts
app.use(express.static('public'));  

// websockets so that webpage can talk back to server
const webSocket = require('socket.io')(httpServer);  

/* Arduino UDP server callback functions */

function ArduinoUDPServerIsListening() {
	let address = arduinoUDPServer.address();
	console.log('Arduino UDP Server is listening at: '+ address.address + ":" + address.port);
}

function ArduinoUDPServerReceivedMessage(message, sender) {

	// If the message is a byte we need to read a byte
	if (message.readUInt8(0) == 0 ) {
		console.log( "received a 0");
		// Now send a message to the web browser to change color
		webSocket.emit('buttonReleased', 99);
	}

	if (message.readUInt8(0) == 1 ) {
		console.log( "received a 1");
		webSocket.emit('buttonPressed', 19);
	}
}

/* Register the UDP callback functions */
arduinoUDPServer.bind( MY_PORT_FOR_ARDUINO );
arduinoUDPServer.on( 'listening', ArduinoUDPServerIsListening);
arduinoUDPServer.on( 'message', ArduinoUDPServerReceivedMessage);

/* HTTP callback functions */

httpServer.listen(HTTP_SERVER_PORT, () => {
	console.log('web server: Listening at', httpServer.address());
});

httpServer.on('connection', () => {
  console.log("web server: An HTTP client has connected")
});



