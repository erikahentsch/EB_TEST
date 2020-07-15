const express = require('express');
const path = require('path')
const app = express();


app.get('/', (req,res)=> {
    res.send("Hello from the back end ")
})

app.get('/env', (req,res)=> {
    res.send(process.env.DEFAULT);
    
})



const PORT = process.env.port || 8080

app.listen(PORT, ()=>{
    console.log("we're working")
});