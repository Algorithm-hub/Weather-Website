const request = require('request')

const geocode = (address,callback)=>{

    const url= 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+address+'.json?access_token=pk.eyJ1IjoiYW51cmFnLXRyaXBhdGhpIiwiYSI6ImNrazcybDF4ZjA1ZG0ydm80YjgwZXlueXoifQ.L9SPiAb9ror-E2w2Ut5CVw&limit=1'

    request({url,json:true},(error,{body})=>{

        if(error)
        {
            callback('Unable to connect Location API')
        }
        else if(body.features.length == 0){
            callback('Search another loacation')
        }
        else{
            callback(undefined,{location:body.features[0].place_name,
                      latitude:body.features[0].center[1],
                     longitude:body.features[0].center[0]}
            )}

    })

}

module.exports=geocode;
