
/*
 *  PubNub IoT prototype with Arduino
 *  data sent by Arduino with DS18B20 temperature sensor using Johnny-Five
 *  https://github.com/pubnub/johnnyfive-eon
 *
 *  Bhavana Srinivas @bhavana1110
 *  License: MIT
 */


// Init PubNub - Please use your own keys. Get them from https://admin.pubnub.com
var pubnub = require('pubnub')({
  subscribe_key: 'insert-your-sub-key',
  publish_key:   'insert-your-pub-key',
  ssl: true
});

var channel = 'Arduino-node';

var temp = 0;

function publish() {
  var data = {
    'temperature': temp,
  };
  pubnub.publish({
    channel: channel,
    message: data,
  });
}

// Johnny-Five
// Using a temperature sensor, type DS18B20
// This requires OneWire support using the ConfigurableFirmata

var five = require('johnny-five');

five.Board().on('ready', function() {
  var temperature = new five.Thermometer({
    controller: 'DS18B20',
    pin: 2
  });

  temperature.on('data', function() {
    console.log(this.celsius + '°C', this.fahrenheit + '°F');
    temp = this.celsius;
  });

// Publishing data every 3 seconds
  setInterval(publish, 3000);
});
