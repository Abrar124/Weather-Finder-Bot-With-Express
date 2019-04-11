async function humidity(req, res) {
    console.log("context are: ", req.body.queryResult.outputContexts)
    var cityName;
    var abcContext = getContext(req.body.queryResult.outputContexts, "abc")
    console.log("return is :", abcContext)
    if (req.body.queryResult.parameters.city) {
        cityName = req.body.queryResult.parameters.city
    }
    else if (abcContext.parameters.abccity) {
        cityName = abcContext.parameters.abccity
    }
    else {
        res.send({
            fulfillmentText: `Please enter the city name`
        })
        return
    }
    var session = req.body.session
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`
    await rq(url, function (err, _res, body) {
        let weather = JSON.parse(body);
        console.log("weather is: ", weather)
        if (err) {
            console.log('error is:', err);
            res.send({
                fulfillmentText: `error while calling api`
            })
        } else {
            res.send({
                outputContexts: [
                    {
                        "name": `${session}/contexts/abc`,
                        "lifespanCount": 5,
                        "parameters": {
                            "abccity": cityName
                        }
                    }
                ],
                fulfillmentText: `The humidity in ${cityName} is ${weather.main.humidity}% !`

            })
            return
        }
    })
}