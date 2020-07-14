const express = require('express');
const path = require('path')
const app = express();


app.use('*', express.static('public'));
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));

app.get('/server', (req,res)=> {
    res.send("Hello from the back end")
})



const PORT = process.env.port || 8080

app.listen(PORT, ()=>{
    console.log("we're working")
});