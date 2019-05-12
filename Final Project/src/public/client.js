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
	var myAudio1 = document.getElementById("myAudio1");
//myAudio1.src = "space.mp3";

var myAudio2 = document.getElementById("myAudio2");
//myAudio2.src = "woods.mp3";

var myAudio3 = document.getElementById("myAudio3");
//myAudio3.src = "grave.mp3";
	
	var placeholder = document.getElementById("placeholder");

	placeholder.src = "woods.jpg"; // put images in public folder

	placeholder.style.opacity = 100;
	myAudio1.pause();
	myAudio2.play();
	myAudio3.pause();
}

function displayImage3 () {
	var myAudio1 = document.getElementById("myAudio1");
//myAudio1.src = "space.mp3";

var myAudio2 = document.getElementById("myAudio2");
//myAudio2.src = "woods.mp3";

var myAudio3 = document.getElementById("myAudio3");
//myAudio3.src = "grave.mp3";
	
	var placeholder = document.getElementById("placeholder");

	placeholder.src = "grave.jpg"; // put images in public folder

	placeholder.style.opacity = 100;
	myAudio1.pause();
	myAudio2.pause();
	myAudio3.play(); 
}

function hideTheImage () {
	
	tabOpen = 0;
	myWindow.close();
	console.log("closing tab");
	
	var myAudio1 = document.getElementById("myAudio1");
//myAudio1.src = "space.mp3";

var myAudio2 = document.getElementById("myAudio2");
//myAudio2.src = "woods.mp3";

var myAudio3 = document.getElementById("myAudio3");
//myAudio3.src = "grave.mp3";
	
	var placeholder = document.getElementById("placeholder");
	placeholder.style.opacity = 0;
	
	myAudio1.pause();
	myAudio2.pause();
	myAudio3.pause();  
	
}



