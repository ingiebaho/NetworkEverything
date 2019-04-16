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


var myAudio1 = document.getElementById("myAudio1");
//myAudio1.src = "space.mp3";

var myAudio2 = document.getElementById("myAudio2");
//myAudio2.src = "woods.mp3";

var myAudio3 = document.getElementById("myAudio3");
//myAudio3.src = "grave.mp3";



function displayImage1 () {
	var placeholder = document.getElementById("placeholder");

	placeholder.src = "space.jpg"; // put images in public folder

	placeholder.style.opacity = 100;
	
	myAudio1.play();
	myAudio2.stop();
	myAudio3.stop();
}

function displayImage2 () {
	var placeholder = document.getElementById("placeholder");

	placeholder.src = "woods.jpg"; // put images in public folder

	placeholder.style.opacity = 100;
	myAudio1.stop();
	myAudio2.play();
	myAudio3.stop();
}

function displayImage3 () {
	var placeholder = document.getElementById("placeholder");

	placeholder.src = "grave.jpg"; // put images in public folder

	placeholder.style.opacity = 100;
	myAudio1.stop();
	myAudio2.stop();
	myAudio3.play(); 
}

function hideTheImage () {
	var placeholder = document.getElementById("placeholder");
	placeholder.style.opacity = 0;
	
	myAudio1.stop();
	myAudio2.stop();
	myAudio3.stop();  
	
}



