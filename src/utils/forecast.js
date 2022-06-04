const request = require('request')



const forecast = (location, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=0ac0b9374e1ceacab44a5a1e8bd09903&query=' + location    
    request({ url, json: true }, (error, { body}) => {
        if (error) {
            callback({
                msg:'Unable to connect to location services!',
                code:'404'
            })
        } else if(body.success === false ) {
            callback({
                msg:body.error.info,
                code:'404'
            })
        } else {            
            callback({
                latitude:body.location.lat,
                longitude:body.location.lon,
                location:body.location.region,
            })
        }
    })
}

//module.exports = forecast
module.exports = {
    forecast: forecast
}