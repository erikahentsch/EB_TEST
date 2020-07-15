const express = require('express');
const path = require('path')
const request = require('request')
require('dotenv').config();

const app = express();


app.get('/', (req,res)=> {
    res.send("Hello from the back end ")
})

app.get('/env', (req,res)=> {
    res.send(process.env);
    
})

app.get("/image/:id", async (req, res)=> {
    let imgUrl = `http://www.vizzion.com/TrafficCamsService/TrafficCams.ashx?strRequest=GetCameraImage7&intCameraID=${req.params.id}&intDesiredWidth=720&intDesiredHeight=480&intDesiredDepth=8&intOptions=0&strPassword=ZUY%5b%5bBB%5cB3%5bWSVBBIJIQZHU%26IFEO`
    request.get(imgUrl)
        .pipe(res)
})

app.get("/imagetest/:id", async (req, res)=> {
    // console.log(process.env.API_KEY)
    let imgUrl = `http://www.vizzion.com/TrafficCamsService/TrafficCams.ashx?strRequest=GetCameraImage7&intCameraID=${req.params.id}&intDesiredWidth=720&intDesiredHeight=480&intDesiredDepth=8&intOptions=0&strPassword=${process.env.API_KEY}`
    request.get(imgUrl)
        .pipe(res)
})

const PORT = process.env.port || 8080

app.listen(PORT, ()=>{
    console.log("we're working")
});