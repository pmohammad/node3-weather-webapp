const path = require('path')
const express = require('express')
const hbs = require('hbs')

const fc = require('./utils/forecast.js')
const wi = require('./utils/weatherinfo.js')

const app = express()

//setup path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath  = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//setup handlebars, engine and view locations
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'This the game',
        name: 'Mohammad'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mohammad Dawood'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help Page',
        heading: 'How can i help you',
        name: 'Mohammad Dawood Petlawad'
    })
})

app.get('/weather', (req, res) => {    
    if(!req.query.city){
        return res.send({
            error:'No city found'
        })
    }
    
    fc.forecast(req.query.city, ({ code, msg, latitude, longitude, location }) => {
        if (code === '404') {            
            res.send({
                error:true,
                title:'Weather',
                forecast:msg,
                location:location,
                name: 'Mohammad Dawood Petlawad'
            })
        } else {
            wi.weatherInfo(latitude, longitude, (result) => {
                res.send({
                    error:false,
                    title:'Weather',
                    forecast:result,
                    location:location,
                    name: 'Mohammad Dawood Petlawad'

                })
            })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404',{
        title:'404 Page',
        Message:'Kuch nahi h idhar',
        name: 'Mohammad Dawood Petlawad'
    })
})

app.get('*', (req,res) =>{
    res.render('404',{
        title:'404 Page',
        Message:'Ankh khol ke likh lawde',
        name: 'Mohammad Dawood Petlawad'
    })
})
app.listen(3000, () => {
    console.log('server is running')
})