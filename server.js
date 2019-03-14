const express = require("express");
const bodyParser = require("body-parser");
var request = require("request");

// const apiKey = "4970e4f266675063af77ad454f45ebd6";
// const cityName = 'karachi';

// url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;
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

expressApp.post("/webhook", function (request, response, next) {
  const agent = new WebhookClient({ request: request, response: response });

  // agent.intent("Find weather", conv => {

  //    conv.add(`The current weather in the  is `);
  // });

  agent.intent("Default Welcome Intent", conv => {
    agent.add("Hi, I will help you to find weather");
  });

  agent.intent("Default Fallback Intent", conv => {
    agent.add(`I didn't understand. Can you tell me something else?`);
  });
});

// expressApp.get("/", function(req, res) {
//   res.send("hello world");
// });

expressApp.listen(process.env.PORT || 3000, function () {
  console.log("app is running in 3000");
});
