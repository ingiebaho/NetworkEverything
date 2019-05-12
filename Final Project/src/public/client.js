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

	myWindow1 = window.open("", "myWindow", "width=200,height=100");
 	myWindow1.document.write("<p>This is 'myWindow1'</p>");
		
	tabOpen1 = 1;
	}
	//var myAudio1 = document.getElementById("myAudio1");


//var myAudio2 = document.getElementById("myAudio2");


//var myAudio3 = document.getElementById("myAudio3");

	
	//var placeholder = document.getElementById("placeholder");

	//placeholder.src = "space.jpg"; // put images in public folder

	//placeholder.style.opacity = 100;
	
	//myAudio1.play();
	//myAudio2.pause();
	//myAudio3.pause();
}

function displayImage2 () {
	
	if(tabOpen2 == 0){

	myWindow2 = window.open("", "myWindow", "width=200,height=100");
 	myWindow2.document.write("<p>This is 'myWindow2'</p>");
		
	tabOpen2 = 1;
	}
	
	/*var myAudio1 = document.getElementById("myAudio1");
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
	myAudio3.pause();*/
}

function displayImage3 () {
	
	if(tabOpen3 == 0){

	myWindow3 = window.open("", "myWindow", "width=200,height=100");
 	myWindow3.document.write("<p>This is 'myWindow3'</p>");
		
	tabOpen3 = 1;
	}
	
	/*var myAudio1 = document.getElementById("myAudio1");
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
	myAudio3.play(); */
}

function hideTheImage () {
	
	tabOpen1 = 0;
	myWindow1.close();
	console.log("closing tab1");
	
	tabOpen2 = 0;
	myWindow2.close();
	console.log("closing tab2");
	
	tabOpen3 = 0;
	myWindow3.close();
	console.log("closing tab3");
	
	/*var myAudio1 = document.getElementById("myAudio1");
//myAudio1.src = "space.mp3";

var myAudio2 = document.getElementById("myAudio2");
//myAudio2.src = "woods.mp3";

var myAudio3 = document.getElementById("myAudio3");
//myAudio3.src = "grave.mp3";
	
	var placeholder = document.getElementById("placeholder");
	placeholder.style.opacity = 0;
	
	myAudio1.pause();
	myAudio2.pause();
	myAudio3.pause();  */
	
}




