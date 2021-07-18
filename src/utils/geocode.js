const request = require('request');

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZG9kb2RvZG9kb2RvZG8iLCJhIjoiY2tyM25xdmc3MmtqdDJ1cWh6MHB0Zm11ZCJ9.J5OC6qiMy1w3ATZzonHFRQ&limit=1`;

    request({url: url, json: true}, (error, response) => {
        if (error) {
            callback('unable to connect to location services!', undefined);
        } else if (response.body.features.length != 0) {
            callback(undefined, {
              latitude: response.body.features[0].center[0],
              longitude: response.body.features[0].center[1],
              location: response.body.features[0].place_name
            } )
        } else {
            callback('could not find location!', undefined);
        }       
    })
};

module.exports = geocode;
