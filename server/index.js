const express = require('express');
const path = require('path')
const request = require('request')
const fetch = require('node-fetch')
var parser = require('xml2js');
require('dotenv').config();

const app = express();


app.get('/', (req,res)=> {
    res.send("Hello from the back end ")
})

app.get('/env', (req,res)=> {
    res.send(process.env);
    
})

app.get('/api', getPoints, getData, (req, res)=> {
    console.log("api")
})

app.get('/api/:pts', getPoints, getData, (req, res) => {
    console.log("api w/ points")
});

function getPoints(req,res,next) {
    console.log("getting points", req.params.pts);
    if (!req.params.pts) {
        console.log('no points')
        let defaultPts =  process.env.default.split(',');
        req.params.pts = defaultPts
    } else 
    req.params.pts = req.params.pts.split(',')

    next();
}

function getData(req,res,next) {
    console.log("getting Data", req.params.pts[1]);

    let lat1 = req.params.pts[0]
    let lng1 = req.params.pts[1]
    let lat2  = req.params.pts[2]
    let lng2 = req.params.pts[3]

    const url = `http://www.vizzion.com/TrafficCamsService/TrafficCams.asmx/GetCamerasInBox2?dblMinLongitude=${Math.min(lng1,lng2)}&dblMaxLongitude=${Math.max(lng1, lng2)}&dblMinLatitude=${Math.min(lat1, lat2)}&dblMaxLatitude=${Math.max(lat1,lat2)}&strRoadNames=&intOptions=0`
    fetch(`${url}&strPassword=ZUY%5b%5bBB%5cB3%5bWSVBBIJIQZHU%26IFEO`)
      .then(response=>response.text())
      .then(body=>{
        parser.parseString(body, (err, result)=>{
            let parsedData = result.DataSet['diffgr:diffgram'][0].DataSetCameras[0].Cameras;
            let cameraData = []
            parsedData.map(camera=>{
                let tempObject = {}
                tempObject['id'] = camera.CameraID[0];
                tempObject['name'] = camera.Name[0];
                tempObject['lat'] = camera.Latitude[0];
                tempObject['long'] = camera.Longitude[0];
                if (camera.Hotspot) {
                    tempObject['hotspot'] = true;
                } else {
                    tempObject['hotspot'] = false;
                }
                cameraData.push(tempObject)
            });
            
            res.send(cameraData);
        });
      });

}


app.get("/static", (req, res)=> {
    let image = "<img src={'/camera.png'} />"
    res.send(image)
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