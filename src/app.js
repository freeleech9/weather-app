const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join (__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//handlebars setup and views location
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Imtiaz'
    })

})

app.get('/about', (req, res) => {
    res.render('about',{
        title: 'about me',
        name: 'Imtiaz Kabir'
    })

})

app.get('/help', (req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'Imtiaz Kabir',
        helpText: 'heeeelllpppp',
    })

})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error: 'no address'
        })
    }
    geocode(req.query.address, (error, {latitude, longlitude, location}={} ) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longlitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address,
            })

        })

        
    })

})

app.get('/help/*', (req, res) =>{
    res.render('404',{
        title: 'ERROR 404',
        name: 'Imtiaz Kabir',
        errorMessage: 'help page not found'
    })

})




app.get('*', (req, res) =>{
    res.render('404', {
        title: 'ERROR 404',
        name: 'Imtiaz Kabir',
        errorMessage: 'page not found'
    })
})

app.listen(3000, ()=>{
    console.log('its running on port 3000')
})