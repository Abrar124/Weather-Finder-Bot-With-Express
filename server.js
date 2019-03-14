
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
const express = require("express");
const bodyParser = require("body-parser");
var request = require("request");

const { WebhookClient } = require("dialogflow-fulfillment");




const expressApp = express().use(bodyParser.json());

expressApp.post("/webhook", function (request, response, next) {
  const agent = new WebhookClient({ request: request, response: response });


  function weatherFinder(agent) {
    const cityName= agent.parameters.city;
    console.log(cityName);
    // let apiKey = '4970e4f266675063af77ad454f45ebd6';
    // let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;
    agent.add(`The weather for the city ${cityName} is:`);
  }


  function welcome(agent) {
    agent.add(`Good day! What can I do for you today?`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }
  let intentMap = new Map();
  intentMap.set("Default Welcome Intent", welcome);
  intentMap.set("Default Fallback Intent", fallback);
  intentMap.set("Find weather", weatherFinder);

  agent.handleRequest(intentMap);

});
expressApp.listen(process.env.PORT || 3000, function () {
  console.log("app is running in 3000");
});


// expressApp.get("/", function(req, res) {
//   res.send("hello world");
// });

