/* 
This is the websocket library which will allow us to send messages
back to the web server 
*/

var socket = io();

var tabOpen = 0;
var myWindow;


socket.on('button1', (data) => {
	console.log('received button 1 pressed event from webserver: ' + data);
	displayImage1();
});

socket.on('button2', (data) => {
	console.log('received button 2 pressed from webserver: ' + data);
	displayImage2();
});

socket.on('button3', (data) => {
	console.log('received button 3 pressed from webserver: ' + data);
    displayImage3();
});

socket.on('allOff', (data) => {
	console.log('all buttons are off: ' + data);
    hideTheImage();
});






function displayImage1 () {
	
	if(tabOpen == 0){

	myWindow = window.open("", "myWindow", "width=200,height=100");
        myWindow.document.write("<p>This is 'myWindow'</p>");	
	tabOpen = 1;
	}
	
}

function displayImage2 () {
	
}

function displayImage3 () {
	
	
}

function hideTheImage () {
	
	tabOpen = 0;
	myWindow.close();
	console.log("closing tab");
	
	 
	
}



