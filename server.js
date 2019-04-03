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
var req = require("request");

const { WebhookClient } = require("dialogflow-fulfillment");

const expressApp = express().use(bodyParser.json());

expressApp.post("/webhook", function(request, response, next) {
  const agent = new WebhookClient({ request: request, response: response });

  function weatherFinder(agent) {
    const cityName = agent.parameters.city;
    console.log("cityName: ", cityName);

    let apiKey = "4970e4f266675063af77ad454f45ebd6";
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;

     req.get(url, function(err, response, body) {
    
        let weather = JSON.parse(body);
        let message = `It's ${weather.main.temp} degrees and ${ weather.main.humidity} humidity !`;
        console.log("weather:", message);
        let temp = weather.main.temp;
        console.log("temperature:", temp);

        agent.add(`The weather for the city  degrees `);
      
      // agent.add(`The weather for the city ${cityName} is: 0.0000 degrees `);
    });
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
expressApp.listen(process.env.PORT || 3000, function() {
  console.log("app is running in 3000");
});

// expressApp.get("/", function(req, res) {
//   res.send("hello world");
// });

// function callWeatherApi (city, date) {
//   return new Promise((resolve, reject) => {
//     // Create the path for the HTTP request to get the weather
//     let path = '/premium/v1/weather.ashx?format=json&num_of_days=1' +
//       '&q=' + encodeURIComponent(city) + '&key=' + wwoApiKey + '&date=' + date;
//     console.log('API Request: ' + host + path);

//     // Make the HTTP request to get the weather
//     http.get({host: host, path: path}, (res) => {
//       let body = ''; // var to store the response chunks
//       res.on('data', (d) => { body += d; }); // store each response chunk
//       res.on('end', () => {
//         // After all the data has been received parse the JSON for desired data
//         let response = JSON.parse(body);
//         let forecast = response['data']['weather'][0];
//         let location = response['data']['request'][0];
//         let conditions = response['data']['current_condition'][0];
//         let currentConditions = conditions['weatherDesc'][0]['value'];

//         // Create response
//         let output = `Current conditions in the ${location['type']}
//         ${location['query']} are ${currentConditions} with a projected high of
//         ${forecast['maxtempC']}°C or ${forecast['maxtempF']}°F and a low of
//         ${forecast['mintempC']}°C or ${forecast['mintempF']}°F on
//         ${forecast['date']}.`;

//         // Resolve the promise with the output text
//         console.log(output);
//         resolve(output);
//       });
//       res.on('error', (error) => {
//         console.log(`Error calling the weather API: ${error}`)
//         reject();
//       });
//     });
//   });
// }
