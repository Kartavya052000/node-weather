const request = require('postman-request');

const geocode =(address,callback)=>{
    const url='http://api.positionstack.com/v1/forward?access_key=1d1056ab812788bb8e2ceb68e0986299&query=' +address
    request({url,json:true},(error,response)=>{
    if(error){
        callback('Unable to connect to location services!',undefined)
    }
    // else if (response.body.data.length==0){
    // callback('Unable to find location,Try Another Search',undefined)
    // }
    else{
        callback(undefined,{
            latitude:response.body.data[0].latitude,
            longitude:response.body.data[0].longitude,
            location:response.body.data[0].locality,
        })
    }
    })
    }

    module.exports =geocode