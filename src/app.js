const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//define paths foe express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname , '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDir));


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'FOTOTO'
    });
});

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'aboutush',
        name: 'gokoko'
    } );
});

app.get('/help', (req,res) => {
    res.render('help', {
        message: "drink a lot of water and eat well!",
        title: 'help',
        name: 'cvcvc'
    } );
});


app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'no address ,was suplied'
        });
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                });
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address 
            });
            
        });    
    });

});

app.get('/products', (req, res) => {
    if (!req.query.search){
        return res.send({
            error: 'you must provide a search term!'
        });
    }
    
    console.log(req.query.search);
    res.send({
        products: []
    });
});

app.get('/help/*', (req, res) => {
    res.render('404-page', {
        message: 'no help article found',
        title: 'help',
        name: 'cvcvc'
    });
});

app.get('*', (req, res) => {
    res.render('404-page', {
        message: 'my 404 page',
        title: '404 page',
        name: 'wewewewe'
    });
});


app.listen(3001, () => {
    console.log('server is up on port 3000');
})