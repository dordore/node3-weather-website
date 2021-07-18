const request = require('request');

const forecast = (alt, long, callback) => {
    
    inverseGeocode(alt, long, (error, response) => {
        if (error) {
            callback(error);
        } else {
            const url = `http://api.weatherstack.com/current?access_key=21ce557b5db267209b1546e5e4112591&query=${encodeURIComponent(response)}`        
            request({url:url, json: true}, (error2, response2) => {
        
                if (error2) {
                    callback('unable to connect to web service');
                } else if (response2.body.error) {
                    callback('unable to find location');
                } else {
                     callback(undefined, {
                        temperature: response2.body.current.temperature,
                        chanceForRain: response2.body.current.precip
                    });
                }
            });
        }
    })    
};

const inverseGeocode = (alt, long, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${alt},${long}.json?access_token=pk.eyJ1IjoiZG9kb2RvZG9kb2RvZG8iLCJhIjoiY2tyM25xdmc3MmtqdDJ1cWh6MHB0Zm11ZCJ9.J5OC6qiMy1w3ATZzonHFRQ`;
   
    request({url:url, json: true}, (error, response) => {
        
        if (error) {
            callback('unable to connect to web service');
        } else if (response.body.error) {
            callback('unable to find location');
        } else {
            callback(undefined, response.body.features[0].place_name);
        }
    });
};

module.exports = forecast;