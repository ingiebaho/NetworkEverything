/* 
This is the websocket library which will allow us to send messages
back to the web server 
*/

var socket = io();

var tabOpen1 = 0;
var myWindow1;


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
	
	if(tabOpen1 == 0){

	myWindow1 = window.open("https://www.google.com", "myWindow", "width=200,height=100");
	tabOpen1 = 1;
	}
	
}

function displayImage2 () {
	
}

function displayImage3 () {
	
	
}

function hideTheImage () {
	
	if(tabOpen1 == 1){
		myWindow1.close();
		console.log("closing tab");
		tabOpen1 = 0;
	}
	
	
	
	
	 
	
}



