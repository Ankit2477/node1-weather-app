const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiYW5raXRwMjQ5NCIsImEiOiJja2w5Z3p2ZjUwOW15MndueW96Mmc3aWhtIn0.rROher2A9vyHC0MjpawM2g&limit=1' 
    
    request({url:url,json:true}, (error,{body}) => {
        if(error){
          callback('Unable to connect location services',undefined)
        } else if(body.features.length === 0){
          callback('Unable to find location try another search',undefined)
        } else{
          callback(undefined,{
             latititude: body.features[0].center[1],
             longitude:  body.features[0].center[0],
             location:   body.features[0].place_name
          })
        }
    })
  
  }

  module.exports = geocode