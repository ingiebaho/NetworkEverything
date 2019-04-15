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



myAudio.stop(); 

function displayImage1 () {
	var placeholder = document.getElementById("placeholder");

	placeholder.src = "space.jpg"; // put images in public folder

	placeholder.style.opacity = 100;
	
	var myAudio = document.getElementById("myAudio");
	myAudio.src = "space.mp3";
	myAudio.play(); 
}

function displayImage2 () {
	var placeholder = document.getElementById("placeholder");

	placeholder.src = "woods.jpg"; // put images in public folder

	placeholder.style.opacity = 100;
	var myAudio = document.getElementById("myAudio");
	myAudio.src = "woods.mp3";
	myAudio.play(); 
}

function displayImage3 () {
	var placeholder = document.getElementById("placeholder");

	placeholder.src = "grave.jpg"; // put images in public folder

	placeholder.style.opacity = 100;
	var myAudio = document.getElementById("myAudio"); 
	myAudio.src = "grave.mp3";
	myAudio.play(); 
}

function hideTheImage () {
	var placeholder = document.getElementById("placeholder");
	placeholder.style.opacity = 0;
	
	//var myAudio = document.getElementById("myAudio");
	//myAudio.src = "theOne.mp3";
	//myAudio.stop(); 
	
}



