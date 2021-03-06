/*
	UDP And HTTP Server
	Context: node.js
	
	Receive data from Arduino 
	Serve a web page to a browser displaying information decided by Arduino 
	
	Web server provided by modules "http" and "express"

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
var MY_PORT_FOR_ARDUINO = 2390;	//should be receiving port in Adruino sketch  

/* This is for server to talk to Arduino, which I dont need now   
var ARDUINO_PORT_FOR_ME= 5000; 
var ARDUINO_IP_ADDRESS = '192.168.1.4';
*/ 

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
	console.log('Arduino UDP Server is listening');
}

function ArduinoUDPServerReceivedMessage(message, sender) {

	// Read the messages received from arudino and check which button which pushed 
	if (message.readUInt8(0) == 1 ) {
		console.log( "button 1 pushed");
		// Now send a message to client.js
		webSocket.emit('button1', 1);
	}
	if (message.readUInt8(1) == 1 ) {
		console.log( "button 2 pushed");
		// Now send a message to client.js
		webSocket.emit('button2', 2);
	}
	if (message.readUInt8(2) == 1 ) {
		console.log( "button 3 pushed");
		// Now send a message to client.js
		webSocket.emit('button3', 3);
	}
	if (message.readUInt8(0) == 0 && message.readUInt8(1) == 0 && message.readUInt8(2) == 0 ) {
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


 //Websocket event handler for UDP messages coming from the browser
 //which is something I dont need

/*webSocket.on('connect', (socket) => {
	// array for the message
	// newLEDState[0] = LED number 
	// newLEDState[1] = LED state 
	const SIZEOF_LED_DATA = 2;
	var newLEDState = new Uint8Array(SIZEOF_LED_DATA ); 
  
	console.log('Web server socket: Client connected');


  // if you get the 'disconnect' message, say the user disconnected

  socket.on('disconnect', () => {
    console.log('Web server socket: user disconnected');
  });
});  */
