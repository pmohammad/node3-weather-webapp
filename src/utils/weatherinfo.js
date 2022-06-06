const request = require('request')
const weatherInfo = (latitude, longitude, callback) => {
    console.log(latitude+"," +longitude)
    const url = 'http://api.weatherstack.com/current?access_key=0ac0b9374e1ceacab44a5a1e8bd09903&query=' + latitude+','+longitude
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location services!')
        } else if(body.success === false ) {
            callback(body.error.info)
        } else {
            const result = "In "+ body.location.name+", Its "+body.current.weather_descriptions[0]+" and there is currently " + body.current.temperature + " degree out and feels like "+ body.current.feelslike + "and humidity is "+ body.current.humidity
            callback(result)
        }
    })
}

//module.exports = weatherInfo
module.exports = {
    weatherInfo: weatherInfo
}