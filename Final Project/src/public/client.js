/* 
This is the websocket library which will allow us to send messages
back to the web server 
*/

var socket = io();

var tabOpen1 = 0;
var myWindow1;

var tabOpen2 = 0;
var myWindow2;

var tabOpen3 = 0;
var myWindow3;

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

	myWindow1 = window.open("http://10.225.161.136:8081/", "myWindow", "width=200,height=100");
	tabOpen1 = 1;
	}
	
}

function displayImage2 () {
	if(tabOpen2 == 0){

	myWindow2 = window.open("http://10.225.161.137:8081/", "myWindow", "width=200,height=100");
	tabOpen2 = 1;
	}
	
}

function displayImage3 () {
	
	if(tabOpen3 == 0){

	myWindow3 = window.open("http://10.225.161.135:8081/", "myWindow", "width=200,height=100");
	tabOpen3 = 1;
	}
	
	
}

function hideTheImage () {
	
	if(tabOpen1 == 1){
		myWindow1.close();
		console.log("closing tab");
		tabOpen1 = 0;
	}
	
	if(tabOpen2 == 1){
		myWindow2.close();
		console.log("closing tab");
		tabOpen2 = 0;
	}
	
	if(tabOpen3 == 1){
		myWindow3.close();
		console.log("closing tab");
		tabOpen3 = 0;
	}
	
	
	
	
	 
	
}



