/* 
This is the websocket library which will allow us to send messages
back to the web server 
*/

var socket = io();


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


var myAudio = document.getElementById("myAudio");
myAudio.stop(); 

function displayImage1 () {
	var placeholder = document.getElementById("placeholder");

	placeholder.src = "one.jpeg"; // put images in public folder

	placeholder.style.opacity = 100;
	
	var myAudio = document.getElementById("myAudio");
	myAudio.src = "theOne.mp3";
	myAudio.play(); 
}

function displayImage2 () {
	var placeholder = document.getElementById("placeholder");

	placeholder.src = "two.jpg"; // put images in public folder

	placeholder.style.opacity = 100;
}

function displayImage3 () {
	var placeholder = document.getElementById("placeholder");

	placeholder.src = "three.jpg"; // put images in public folder

	placeholder.style.opacity = 100;
}

function hideTheImage () {
	var placeholder = document.getElementById("placeholder");

	placeholder.style.opacity = 0;
}



