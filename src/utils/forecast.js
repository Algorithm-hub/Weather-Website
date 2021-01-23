const request = require('request')

const forecast=(latitude,longitude,callback)=>{

    const url='http://api.weatherstack.com/current?access_key=44f98e5fe856a0df4ba0f4bd6f8f7997&query='+ latitude + ',' + longitude
    request({url,json:true},(error,{body})=>{

        if(error)
        {
            callback('Unable to connect Weather API')
        }
        else if(body.error){
            callback('Unable to  find location')
        }
        else{
            callback(undefined,`${body.current.weather_descriptions[0]} . current temprature is ${body.current.temperature} degrees out.It feelslike ${body.current.feelslike} degrees out.`)
        }

    })

}

module.exports=forecast
