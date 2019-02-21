/*
  WiFi UDP Tranceiver. Buttons are pushed to activate LED on another arduino. Can also receive byte to activate LEDs
  Based on UDP Send and Receive String

  created 19 February 2019
  by Ingie Baho 

*/

#include <SPI.h>
#include <WiFiNINA.h>
#include <WiFiUdp.h>

int status = WL_IDLE_STATUS;
#include "arduino_secrets.h"
///////please enter your sensitive data in the Secret tab/arduino_secrets.h
char ssid[] = SECRET_SSID;        // your network SSID (name)
char pass[] = SECRET_PASS;    // your network password (use for WPA, or use as key for WEP)
int keyIndex = 0;            // your network key Index number (needed only for WEP)

unsigned int localPort = 2390;      // local port to listen on. Other code must have 5000 for this instead


char packetBuffer[255]; //buffer to hold incoming packet

WiFiUDP Udp;

const int RED_LED = 0;
const int GREEN_LED = 1;
const int YELLOW_LED = 2;

const int RED_BUTTON = 5;
const int GREEN_BUTTON = 4;
const int YELLOW_BUTTON = 3;

// remember the button state so we only send when the state changes
boolean redButtonState;
boolean lastRedButtonState = LOW;

boolean greenButtonState;
boolean lastGreenButtonState = LOW;

boolean yellowButtonState;
boolean lastYellowButtonState = LOW;

void setup() {
  //Initialize serial and wait for port to open:
  Serial.begin(9600);

  pinMode(RED_LED, OUTPUT);
  pinMode(GREEN_LED, OUTPUT);
  pinMode(YELLOW_LED, OUTPUT);
  
  while (!Serial) {
    ; // do nothing until serial port connects
  }

  // Some defensive programming. Checking for the presence of the shield:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue:
    while (true);
  }

  // check for the WiFi module:
  if (WiFi.status() == WL_NO_MODULE) {
    Serial.println("Communication with WiFi module failed!");
    // don't continue
    while (true);
  }

  // check firmware version
  String fv = WiFi.firmwareVersion();
  if (fv < "1.0.0") {
    Serial.println("Please upgrade the firmware");
  }

  // attempt to connect to WiFi network:
  while ( status != WL_CONNECTED) {
    Serial.print("Attempting to connect to SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network. Change this line if using open or WEP network:
    status = WiFi.begin(ssid, pass);
    // wait 10 seconds for connection:
    delay(10000);
  }
  Serial.println("Connected to wifi");
  printWiFiStatus();

  Serial.print("Initializing WiFiUDP library and listening on port ");
  Serial.println(localPort);
  Udp.begin(localPort);

  pinMode(LED_BUILTIN, OUTPUT);
}
//function to send button states through UDP 
void sendButtonStates(IPAddress address, unsigned int port){
  
  //check current button states
  redButtonState = digitalRead(RED_BUTTON); 
  greenButtonState = digitalRead(GREEN_BUTTON);
  yellowButtonState = digitalRead(YELLOW_BUTTON);
  
//checking to see if any of the three buttons were pushed
  if(redButtonState != lastRedButtonState || 
  greenButtonState != lastGreenButtonState || 
  yellowButtonState != lastYellowButtonState)
  {
    Udp.beginPacket(address, port);
    
//send button states through UDP when any button state changed 
    
    Udp.write(redButtonState);
    if(redButtonState != lastRedButtonState){
      Serial.print("red button state changed; sending new state: ");
      Serial.println(redButtonState);
      lastRedButtonState = redButtonState;
    }
 
    Udp.write(greenButtonState);
    if(greenButtonState != lastGreenButtonState){
      Serial.print("green button state changed; sending new state: ");
      Serial.println(greenButtonState);
      lastGreenButtonState = greenButtonState;
    }

    Udp.write(yellowButtonState);
    if(yellowButtonState != lastYellowButtonState){
      Serial.print("yellow button state changed; sending new state: ");
      Serial.println(yellowButtonState);
      lastYellowButtonState = yellowButtonState;
    }
    
    printCurrentButtonState(redButtonState, greenButtonState, yellowButtonState);
     
    Udp.endPacket();
  }
}
//function to receive incoming bytes over UDP and activate LEDs
void receiveLEDStates(){
  // if there's data available, read a packet
  int packetSize = Udp.parsePacket();
  if (packetSize)
  {
    if (packetSize != 3){
      Serial.println("Incorrect packet size received.");
    }
    else{
      Serial.print("Received packet of size ");
      Serial.println(packetSize);
      Serial.print("From ");
      IPAddress remoteIp = Udp.remoteIP();
      Serial.print(remoteIp);
      Serial.print(", port ");
      Serial.println(Udp.remotePort());
  
      // read the packet into packetBufffer
      int len = Udp.read(packetBuffer, 255);
      digitalWrite(RED_LED, packetBuffer[0]);
      digitalWrite(GREEN_LED, packetBuffer[1]);
      digitalWrite(YELLOW_LED, packetBuffer[2]);
    }
  }
}

void loop() {
  // IP address of the receiving device
  IPAddress receivingDeviceAddress(192, 168, 1, 14);
  unsigned int receivingDevicePort = 5000;   //other code must have 2390 for this 

  sendButtonStates(receivingDeviceAddress, receivingDevicePort);
  
  receiveLEDStates();
}
//function to print wifi info
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
//function to print button state info
void printCurrentButtonState(boolean currentRedButtonState, boolean currentGreenButtonState, boolean currentYellowButtonState){
  Serial.print("red = ");
    Serial.print(currentRedButtonState);
    Serial.print("\tgreen = ");
    Serial.print(currentGreenButtonState);
    Serial.print("\tyellow = ");
    Serial.print(currentYellowButtonState);
    Serial.println();
  }
