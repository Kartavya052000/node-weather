const request = require('postman-request');

const forecast =(latitude,longitude,callback)=>{
const url = 'http://api.weatherstack.com/current?access_key=df075e84fd997113c533919d086c0d3b&query='+latitude +','+longitude
console.log(url,"sd");
request({url,json:true},(error,{body})=>{
    if(error){
        callback('Unable to connect to location services!',undefined)
    }
    // else if (response.body.data.length==0){
    // callback('Unable to find location,Try Another Search',undefined)
    // }
    else{
        callback(undefined,body)
    }
    })
    }

    module.exports =forecast