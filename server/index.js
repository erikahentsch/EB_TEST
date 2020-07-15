const express = require('express');
const path = require('path')
const app = express();
require('dotenv').config();


app.get('/', (req,res)=> {
    res.send("Hello from the back end "+process.env.test)
})



const PORT = process.env.port || 8080

app.listen(PORT, ()=>{
    console.log("we're working")
});