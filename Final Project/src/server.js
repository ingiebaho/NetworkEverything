

/*
	UDP And HTTP Server
	Context: node.js
	
	This code receives button pushes from Arduino, which function as toggle switches. 
	This server code serves a web page to a browser which displays different information. 
	This information displayed depends on which buttons have been toggled on the on Arudino MKR1010

	Communication with Arduino is via a UDP socket
	provided by module "dgram"

	Communication with the web client (web browser) 
	is via a UDP socket provided by webSockets.
	Websockets creates a socket on top of the HTTP protocol
	The webSockets module is "socket.io"

	created 16 March 2019
	by Ingie Baho
*/


/* UDP server talks to Arduino */
var dgram = require('dgram');
var arduinoUDPServer = dgram.createSocket('udp4')
var MY_PORT_FOR_ARDUINO = 7000;	//should be receiving port in Adruino code  


/* HTTP server talks to client (browser) */
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
	
	// Read the messages received from arudino and check which button which pushed 
	if (message.readUInt8(0) == 1 ) {	//This indicates that the first byte (coming from button 1) is pushed
		console.log( "button 1 pushed");
		// Now send a message to client.js
		webSocket.emit('button1', 1);
	}
	if (message.readUInt8(1) == 1 ) {	//This indicates that the second byte (coming from button 2) is pushed
		console.log( "button 2 pushed");
		// Now send a message to client.js
		webSocket.emit('button2', 2);
	}
	if (message.readUInt8(2) == 1 ) {		//This indicates that the third byte (coming from button 3) is pushed
		console.log( "button 3 pushed");
		// Now send a message to client.js
		webSocket.emit('button3', 3);
	}
	if (message.readUInt8(0) == 0 && message.readUInt8(1) == 0 && message.readUInt8(2) == 0 ) {	//check to see if all bytes are 0, indicating that all buttons are off
		console.log( "all buttons are off"); 
		// Now send a message to client.js
		webSocket.emit('allOff', 0);
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


 

