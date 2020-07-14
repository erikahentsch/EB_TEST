const express = require('express');
const app = express();

const PORT = process.env.port || 8080


app.get('/', (req,res)=> {
    res.send("Hello World")
})




app.listen(PORT, ()=>{
    console.log("we're working")
});