const request = require("request");

const forecast = (lattitude, longitude, callback) => {
  const url = "http://api.weatherstack.com/current?access_key=4f0fffd1c987bd989a4191fd9a3c95e7&query=" + lattitude + "," + longitude + "&units=f";

  request({
    url,
    json: true
  }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location. Please provide valid location Coordinates", undefined);
    } else {
      callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently " + response.body.current.temperature + " degress out. It feels like " + response.body.current.feelslike + " degress out" + " with humadity "+ response.body.current.humidity + "%.");
    }
  });
}

module.exports = forecast;
