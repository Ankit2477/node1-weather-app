const request = require('postman-request')

const forecast = (latititude,longitude,callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=808adb86906b939104c52cda99cfc18d&query='+latititude+','+longitude;
    
    request({url, json:true},(error,{body}) => {
     
        if(error){
            callback("Unable to connect weather app services!",undefined)
            }else if(body.error){
                callback("Unable to find location",undefined)
            }        
            else{
                callback(undefined,body.current.weather_descriptions[0]+'. It is currently '+body.current.temperature+' degrees out. '+'There is a '+body.current.precip+'% '+' chance of rain.')
            }
        })
}

 

module.exports = forecast