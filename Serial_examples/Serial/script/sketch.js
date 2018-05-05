var serial;                            // variable to hold an instance of the serialport library
//var options = { baudrate: 9600};      // set baudrate to 9600; must match Arduino baudrate
var portName = '/dev/cu.usbmodemFD121'; // fill in your serial port name here
var inData;
var message;                    // for incoming serial data

function setup() {
  createCanvas(400, 300);          // make the canvas
  serial = new p5.SerialPort();    // make a new instance of the serialport library
  serial.on('data', serialEvent);  // callback for when new data arrives
  serial.on('error', serialError); // callback for errors
  serial.open(portName);           // open a serial port @ 9600
}

function draw() {
  fill(255);
  if (inData){
    var mappedBackground = map(inData, 0, 1023, 0, 255);
    background(mappedBackground);
    if (inData > 800){
      fill(0);
    }
  }
  else {
  background(0);
  }

  text("sensor value: " + message, 30, 30);
  text("background value: " + mappedBackground, 30, 50);
}



function serialEvent() {
  // inData = Number(serial.read());   // can use this when just looking for 1 byte msgs from Arduino

  // Alternatively, read a string from the serial port, looking for new line as data separator:
  var inString = serial.readStringUntil('\r\n');
  // check to see that there's actually a string there:
  if (inString.length > 0 ) {
    // convert it to a number:
    inData = Number(inString);
    message = inString;
  }
}


function serialError(err) {
  println('Something went wrong with the serial port. ' + err);
}
