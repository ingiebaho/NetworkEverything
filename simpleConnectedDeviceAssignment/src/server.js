/* 
first you can find your IP address with:

	ifconfig

then, in the terminal, run this server with:

	node server.js

connect using a browser to

	http://192.168.1.4:8080

*/

	
// For the HTTP server
const http = require('http')
const express = require('express'); // web server application
const app = express();        // instantiate express server
const webServer = http.Server(app);  // connects http library to server
const HTTP_PORT=7000;

// For the TCP server
const ARDUINO_PORT=8001;


/*
	The HTTP server
*/
app.use(express.static('public'));  // find pages in public directory

webServer.listen(HTTP_PORT, () => {
  console.log('webServer: Listening at', webServer.address());
});

webServer.on('connection', (socket) => {
  console.log("webServer: An HTTP client has connected")
});


/*
	The TCP server
*/

// import the net module
const { createServer } = require('net');

// create and return a net.Server object
const arduinoServer = createServer();

arduinoServer.on('connection', (socket) => {
  console.log("arduinoServer: A client has connected")

  socket.on('data',function(data){
    var numBytesRead = socket.bytesRead;	//reading bytes sent via TCP socket from arduino
    console.log('Bytes read: ' + 
	    	numBytesRead + 	//should have received 5 bytes from arduino 
	    	' buffer length: ' + 
	    	data.length);	//whats the difference between data length and numbytesread?
  
   //read bytes sent from arduino one by one 
	  
arduinoServer.listen(ARDUINO_PORT, () => {

  var arduinoServerInfo = arduinoServer.address();

  var arduinoServerInfoJson = JSON.stringify(arduinoServerInfo);

  console.log('arduinoServer: Listening at : ' + arduinoServerInfoJson );

  arduinoServer.on('error', function (error) {
    console.error(JSON.stringify(error));
 });
});
