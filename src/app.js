const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast') 

const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index',{
        title:'Weather',
        name:'Mr. Robot'
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        title:'About me',
        name:'Mr. Robot'
    })
})

app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help',
        message:'Hello there',
        name:'Mr. Robot'
    })
})



app.get('/weather',(req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    const address = req.query.address
    geocode(address, (error, {latititude,longitude,location}={}) =>{
        if(error){
            return res.send({error})
        }
       
                forecast(latititude,longitude, (error,forecastData) =>{
                    if(error){
                        
                        return res.send({error})

                    }
                     res.send({
                        Address: req.query.address,    
                        Location: location,
                        Forecast: forecastData
                     })
                    
                })
             
       })
    


    // res.send(
    //     {forcast:'Weather is 71 degress out.',
    //     location:'Delhi',
    //     address: req.query.address
    // })

})

app.get('/product',(req,res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
   
        console.log(req.query.search)
        res.send({
        product:[]

                })
})


app.get('/help/*',(req,res) => { 
    res.render('404',{
        title:'404',
        errorMessage:'Help article not found',
        name:'Mr. Robot'
    })
  })

app.get('*',(req,res) => { //* wild card provided by node to match evrytghing else in url
  res.render('404',{
    title:'404',
    errorMessage:'Page not found',
    name:'Mr. Robot'
  })
})

app.listen(3000, () =>{
    console.log('Server is up in port 3000.')
})