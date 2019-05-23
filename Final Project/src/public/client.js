/* 
	This is the script of the web broswer which is run by the server code.
	This code uses the websocket library to send messages back to the web server.
	The code recevies message from server code, which states the button that has been pushed. 
	Depedning on which button has been pushed, a function is called which opens a new tab to livestream video of a coming 
	from a server which is run on a raspberrypi and connected to a webcam.
	
	Ingie Baho
*/

var socket = io();

//3 flags to detect if each of the three new tabs have been opened by the server. Initialized to no (will change later).

var tabOpen1 = 0;
var myWindow1;		//declare variable for each new window we will try to open 

var tabOpen2 = 0;
var myWindow2;

var tabOpen3 = 0;
var myWindow3;

socket.on('button1', (data) => {	//if data from server is "button 1", client knows that button 1 was pushed 
	console.log('received button 1 pressed event from webserver: ' + data);
	Opentab1();	//calls function for tab 1
});

socket.on('button2', (data) => {  //if data from server is "button 2", client knows that button 2 was pushed 
	console.log('received button 2 pressed from webserver: ' + data);
	Opentab2();	//calls function for tab 2
});

socket.on('button3', (data) => {	//if data from server is "button 3", client knows that button 3 was pushed 
	console.log('received button 3 pressed from webserver: ' + data);
        Opentab3();		//calls function for tab 3
});

socket.on('allOff', (data) => {		//if client recieves message from server saying all buttons are off 
	console.log('all buttons are off: ' + data);
        CloseallTabs();		//calls functions to close all tabs 
});





//each function takes us to a different webcam server
function Opentab1 () {
	
	if(tabOpen1 == 0){	//checks to see if the tab is not open, this is important so that the tab only opens once

	myWindow1 = window.open("http://10.225.161.136:8081/", "myWindow", "width=200,height=100"); //opens tab of link provided
		//The lineked broswer is run by a server on raspberrypi  which dislays a livestream from a webcam on the raspberrypi
	tabOpen1 = 1;		//resets value of tab open to true to keep track of which tab is opened/closed
	}
	
}

function Opentab2 () {
	if(tabOpen2 == 0){
	myWindow2 = window.open("http://10.225.161.137:8081/", "myWindow", "width=200,height=100");
	tabOpen2 = 1;
	}
	
}

function Opentab3 () {
	
	if(tabOpen3 == 0){
	myWindow3 = window.open("http://10.225.161.135:8081/", "myWindow", "width=200,height=100");
	tabOpen3 = 1;
	}
	
	
}

function CloseallTabs () {
	
	if(tabOpen1 == 1){ 	//only try to close the tab if the tab is opened
		myWindow1.close();	//closes tab 1
		console.log("closing tab");
		tabOpen1 = 0;	//reset tabopen as false 
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



