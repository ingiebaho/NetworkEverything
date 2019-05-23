/*
  This code programs 4 buttons to work as toggle switch as opposed to momentary swithes. 
  Button pushes are designed to function as toggle switches rather than momentary switches. 
  Upon the push of a button, the state of the button is either off (0) or on (1). 
  3 bytes, one byte per button, is sent through UDP to a server. 
  An arduino MKR1010 is required for this porject as it can connect to the Network by creating a new tab with the network SSID and password. 

  The circuit:
   -4 push buttons wired to a 10 kOhm resistors and vcc
   -Each resistor is then wired to GND
   -Arduino MKR1010
 
  created 15 November 2019
  by Ingie Baho
  
*/
//setting up UDP
#include <SPI.h>
#include <WiFiNINA.h>
#include <WiFiUdp.h>


int status = WL_IDLE_STATUS;

//including tab with details about network
#include "arduino_secrets.h"

// enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = SECRET_SSID;        //  network SSID (name)
char pass[] = SECRET_PASS;    //  network password (use for WPA, or use as key for WEP)


//declaring obkect of type WifiUDP
WiFiUDP Udp;



// setting pin numbers for the 4 buttons:
const int buttonPin1 = 1;    
const int buttonPin2 = 2;
const int buttonPin3 = 3;
const int buttonPin4 = 0;

 
int buttonSwitch1 = LOW;        //This is used to keep track of the switch of the button, or whether it is switched on or off
int buttonState1;             // Initializing button states as low (0),
int lastButtonState1 = LOW;   // Initializing last buttone states as low (this will change at each iteration fo the code),

int buttonSwitch2 = LOW;         
int buttonState2;             
int lastButtonState2 = LOW;

int buttonSwitch3 = LOW;         
int buttonState3;             
int lastButtonState3 = LOW;

int buttonSwitch4 = LOW;         
int buttonState4;             
int lastButtonState4 = LOW;

// the following variables are unsigned long's because the time, measured in miliseconds,
// will quickly become a bigger number than can be stored in an int.
unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 50;    // the debounce time; increase if the output flickers

void setup() {

  pinMode(buttonPin1, INPUT); //declaring buttons of type input
  pinMode(buttonPin2, INPUT);
  pinMode(buttonPin3, INPUT);

  //Initialize serial and wait for port to open:
  Serial.begin(9600);

  // check for the presence of the shield:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue:
    while (true);
  }

  // attempting to connect to WiFi network:
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);

    // Connect to WPA/WPA2 network
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(10000);
  }

  Serial.println("Connected to wifi");
  printWiFiStatus();  //function defined below in the code which prints netwrok details 


}

void loop() {

  // IP address of the receiving device (The IP adress of the computer which is running the server code)
  IPAddress receivingDeviceAddress(10, 225, 161, 140);
  unsigned int receivingDevicePort = 7000;  //should be the same in server.js code

  // read the state of the switch into a local variable:
  int reading1 = digitalRead(buttonPin1);
  int reading2 = digitalRead(buttonPin2);
  int reading3 = digitalRead(buttonPin3);
  int reading4 = digitalRead(buttonPin4);

  // check to see if you just pressed the button
  // (i.e. the input went from LOW to HIGH),  and you've waited
  // long enough since the last press to ignore any noise:

  // If the switch changed, due to pressing:
  if ((reading1 != lastButtonState1) || (reading2 != lastButtonState2) || (reading3 != lastButtonState3) || (reading4 != lastButtonState4)) {
    // reset the debouncing timer
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    // whatever the reading is at, it's been there for longer
    // than the debounce delay, so take it as the actual current state:

   
    if (reading1 != buttonState1) {  // if the button state has changed:
      buttonState1 = reading1;    //reassign the variable buttonstate such that it reflects the current button state

      // only change the switch indicator to high (1) if the new button state is high
      if (buttonState1 == HIGH) {
        buttonSwitch1 = !buttonSwitch1;
      }
    }

      //Follow the same logic for thr next two buttons 
    if (reading2 != buttonState2) {
      buttonState2 = reading2;


      if (buttonState2 == HIGH) {
        buttonSwitch2 = !buttonSwitch2;
      }
    }

    if (reading3 != buttonState3) {
      buttonState3 = reading3;

      
      if (buttonState3 == HIGH) {
        buttonSwitch3 = !buttonSwitch3;
      }
    }
 
  //Button 4 is used as a reset button. When it is pushed, it resets all other buttons to zero.
    if (reading4 != buttonState4) { //checking to see if button state has changed
      buttonState4 = reading4;  //reset button reading
      buttonSwitch1 = LOW;    //reset all switches as off (0)
      buttonSwitch2 = LOW;
      buttonSwitch3 = LOW;

    }



  }

 //printing states of all button switches 
  Serial.print("button1 ");
  Serial.println(buttonSwitch1);
  Serial.print("button2 ");
  Serial.println(buttonSwitch2);
  Serial.print("button3 ");
  Serial.println(buttonSwitch3);

//priniting information about recieving port on arduino and address
 Serial.println(receivingDeviceAddress); 
 Serial.println(receivingDevicePort); 

 //beings UDP for allowing Arduino to send data via UDP 
  Udp.beginPacket(receivingDeviceAddress, receivingDevicePort);

 //sending three bytes via UDP, one for each button. Button 4 does not need to be sent because it changes the switch state of the other buttons 
  Udp.write(buttonSwitch1);
  Udp.write(buttonSwitch2);
  Udp.write(buttonSwitch3);

  //defining the end of the UDP message
  Udp.endPacket();

  // save the current reading of buttons.  Next time through the loop,
  // it'll be the lastButtonState:
  lastButtonState1 = reading1;
  lastButtonState2 = reading2;
  lastButtonState3 = reading3;
  lastButtonState4 = reading4;

}

//function which prints network information
void printWiFiStatus() {
  // print the SSID of the network you're attached to:
  Serial.print("SSID: ");
  Serial.println(WiFi.SSID());

  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("My IP Address: ");
  Serial.println(ip);

  // print the received signal strength:
  long rssi = WiFi.RSSI();
  Serial.print("signal strength (RSSI):");
  Serial.print(rssi);
  Serial.println(" dBm");
}
