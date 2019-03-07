const express = require("express");
const bodyParser = require("body-parser");
var request = require("request");

// const cityName = 'karachi';

// request(url, function (err, response, body) {
//   if(err)
//     { console.log('error:', error);
//    } else {
//      let weather = JSON.parse(body)
//      let message = `It's ${weather.main.temp} degrees and ${weather.main.humidity} in ${weather.name}!`;
//      console.log(message);}
//  });

const { WebhookClient } = require("dialogflow-fulfillment");

const expressApp = express().use(bodyParser.json());

expressApp.post("/webhook", function(req, res, next) {
  const agent = new WebhookClient({ request, response });
  const gapp = dialogflow({
    req: req,
    res: res
  });

  gapp.intent("Find weather", conv => {
    const apiKey = "4970e4f266675063af77ad454f45ebd6";
    const cityName = agent.parameters.name;
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;
    request(url, function(err, response, body) {
      let weather = JSON.parse(body);

      console.log(cityName);
      conv.add(
        `The current weather in the ${cityName}  is ${weather.main.temp} and ${
          weather.main.humidity
        } humidity `
      );
    });
  });

  gapp.intent("Default Welcome Intent", conv => {
    conv.add("Hi, I will help you to find weather");
  });

  gapp.intent("Default Fallback Intent", conv => {
    conv.add(`I didn't understand. Can you tell me something else?`);
  });
});

// expressApp.get("/", function(req, res) {
//   res.send("hello world");
// });

expressApp.listen(process.env.PORT || 3000, function() {
  console.log("app is running in 3000");
});
