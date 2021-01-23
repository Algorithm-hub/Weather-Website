const path = require('path')
const express = require('express')
const hbs=require('hbs')
const geocode= require('./utils/geocode')
const forecast=require('./utils/forecast')


const app = express()
const port = process.env.PORT||3000

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')


app.set('view engine', 'hbs')
app.set('views',viewsPath)
app.use(express.static(publicDirectoryPath))
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Anurag Tripathi'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Anurag Tripathi'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title:'Help',
        name:'Anurag Tripathi'

    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address)
     return res.send({
         error:'you must provide an address!'
     })
    
     geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error)
        {
         return res.send(error)
        } 
    
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                
                return res.send(error)
            }
            res.send({
                location:location,
                forecast:forecastData
            })
        })
    })

})

app.get('/help/*',(req,res)=>{
    res.render('404', {
               title:'404',
               errorMessage:'Error in Help Page',
               name:'Anurag Tripathi'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Anurag Tripathi',
        errorMessage:'Error Page',
    })
})

app.listen(port, () => {
    console.log('Server is up on port .' + port)
})