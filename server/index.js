const express = require('express');
const app = express();




app.get('/', (req,res)=> {
    res.send("Hello World")
})



const PORT = process.env.port || 8080

app.listen(PORT, ()=>{
    console.log("we're working")
});