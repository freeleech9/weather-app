const request = require('request')

const forecast = (latitude, longlitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=420e85cd03a6cdafa865b6eedce07b42&query='+latitude+','+longlitude
    request({url,json:true}, (error, {body}) => {
        if(error){
            callback('try again')
        }
        else if(body.error){
            callback('Please enter a city name')
        }
        else{
            callback(undefined, "it is currently "+body.current.temperature+" degree celcius outside and it is "+body.current.weather_descriptions+" where it feels like "+body.current.feelslike+" degree celcius")
        }
    }
    )
}
module.exports = forecast