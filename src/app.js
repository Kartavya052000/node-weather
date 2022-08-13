const path =require('path')
const express = require('express')
const hbs=require('hbs')

const app = express()
const geocode = require('../utils.js/geocode')
const forecast = require('../utils.js/forcast')
const { createSecretKey } = require('crypto')
//define path for express config
const publicDir=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
//set up hanldebars engine and views location
app.set('view engine', 'hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)
// app.set('views', path.join(__dirname, '../views'));
//  setup static directory to serve
app.use(express.static(publicDir))
// app.get('',(req,res)=>{
//  res.send('<h1>Weather </h1>')
// })
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Kartavya Bhayana'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        name:'Kartavya Bhayana'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Helper',
        name:'Kartavya Bhayana'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
             error:'You must provide a address term.'
         })
     }
     geocode(req.query.address,(error,data)=>{

        if(error){
           return res.send({error})
        }
 
    forecast(data.latitude,data.longitude, (error, forcastdata) => {
        if(error){
            return res.send({error})

         }
         res.send({
             forecast:forcastdata,
             location:data.location,
             address:req.query.address
         })
 
    
      })
    })
})
app.get('/products',(req,res)=>{
    console.log(req.query.search );
    if(!req.query.search){
       return res.send({
            error:'You must provide a search term.'
        })
    }
    res.send({
        products:[]
    })
})
    

app.get('/about', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/about.html'))
})
 
app.get('/help', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/help.html'))
})
app.get('/help/*',(req,res)=>{
    // res.send('Help Article Not Found')
    res.render('404',{
        title:'404',
        errorMsg:'Help Article Not Found'
    })
})
// app.get('*',(req,res) => {
// res.send('404!Page Not Found')
// })
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMsg:'Page Not Found'
    })
})


app.listen(3000,()=>{
    console.log('Server is Up on port 3000.');
})