/*
  Debounce

  Each time the input pin goes from LOW to HIGH (e.g. because of a push-button
  press), the output pin is toggled from LOW to HIGH or HIGH to LOW.  There's
  a minimum delay between toggles to debounce the circuit (i.e. to ignore
  noise).

  
*/
//setting up UDP
#include <SPI.h>
#include <WiFiNINA.h>
#include <WiFiUdp.h>

int status = WL_IDLE_STATUS;
#include "arduino_secrets.h"

// enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = SECRET_SSID;        // your network SSID (name)
char pass[] = SECRET_PASS;    // your network password (use for WPA, or use as key for WEP)


//local port to listen on, not needed for now
unsigned int localPort = 5000;

//buffer to hold incoming packet, not needed for now
char packetBuffer[255];

WiFiUDP Udp;


// constants won't change. They're used here to
// set pin numbers:
const int buttonPin1 = 1;    // the number of the pushbutton pin
const int buttonPin2 = 2;
const int buttonPin3 = 3;
const int buttonPin4 = 0;

// Variables will change:
int buttonSwitch1 = LOW;         // the current state of the output pin
int buttonState1;             // the current reading from the input pin
int lastButtonState1 = LOW;   // the previous reading from the input pin

int buttonSwitch2 = LOW;         // the current state of the output pin
int buttonState2;             // the current reading from the input pin
int lastButtonState2 = LOW;

int buttonSwitch3 = LOW;         // the current state of the output pin
int buttonState3;             // the current reading from the input pin
int lastButtonState3 = LOW;

int buttonSwitch4 = LOW;         // the current state of the output pin
int buttonState4;             // the current reading from the input pin
int lastButtonState4 = LOW;

// the following variables are unsigned long's because the time, measured in miliseconds,
// will quickly become a bigger number than can be stored in an int.
unsigned long lastDebounceTime = 0;  // the last time the output pin was toggled
unsigned long debounceDelay = 50;    // the debounce time; increase if the output flickers

void setup() {

  pinMode(buttonPin1, INPUT);
  pinMode(buttonPin2, INPUT);
  pinMode(buttonPin3, INPUT);

  //Initialize serial and wait for port to open:
  Serial.begin(9600);
 /* while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }*/

  // check for the presence of the shield:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue:
    while (true);
  }

  // attempt to connect to WiFi network:
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);

    // Connect to WPA/WPA2 network
    status = WiFi.begin(ssid, pass);

    // wait 10 seconds for connection:
    delay(10000);
  }

  Serial.println("Connected to wifi");
  printWiFiStatus();

  Serial.print("Initializing WiFiUDP library and listening on port ");
  Serial.println(localPort);
  Udp.begin(localPort);

}

void loop() {

  // IP address of the receiving device, Linux computer's IP address (mine for now because Linux is dead)
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

  // If the switch changed, due to noise or pressing:
  if ((reading1 != lastButtonState1) || (reading2 != lastButtonState2) || (reading3 != lastButtonState3) || (reading4 != lastButtonState4)) {
    // reset the debouncing timer
    lastDebounceTime = millis();
  }

  if ((millis() - lastDebounceTime) > debounceDelay) {
    // whatever the reading is at, it's been there for longer
    // than the debounce delay, so take it as the actual current state:

    // if the button state has changed:
    if (reading1 != buttonState1) {
      buttonState1 = reading1;

      // only toggle the LED if the new button state is HIGH
      if (buttonState1 == HIGH) {
        buttonSwitch1 = !buttonSwitch1;
      }
    }

    if (reading2 != buttonState2) {
      buttonState2 = reading2;

      // only toggle the LED if the new button state is HIGH
      if (buttonState2 == HIGH) {
        buttonSwitch2 = !buttonSwitch2;
      }
    }

    if (reading3 != buttonState3) {
      buttonState3 = reading3;

      // only toggle the LED if the new button state is HIGH
      if (buttonState3 == HIGH) {
        buttonSwitch3 = !buttonSwitch3;
      }
    }

    if (reading4 != buttonState4) {
      buttonState4 = reading4;
      buttonSwitch1 = LOW;
      buttonSwitch2 = LOW;
      buttonSwitch3 = LOW;

    }



  }

  // set the LED:
  Serial.print("button1 ");
  Serial.println(buttonSwitch1);
  Serial.print("button2 ");
  Serial.println(buttonSwitch2);
  Serial.print("button3 ");
  Serial.println(buttonSwitch3);

 Serial.println(receivingDeviceAddress); 
Serial.println(receivingDevicePort); 

  Udp.beginPacket(receivingDeviceAddress, receivingDevicePort);

  Udp.write(buttonSwitch1);
  Udp.write(buttonSwitch2);
  Udp.write(buttonSwitch3);

  Udp.endPacket();

  // save the reading.  Next time through the loop,
  // it'll be the lastButtonState:
  lastButtonState1 = reading1;
  lastButtonState2 = reading2;
  lastButtonState3 = reading3;
  lastButtonState4 = reading4;

}

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
