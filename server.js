const express=require('express');
const app=express();
const bodyParser=require("body-parser");
const path = require('path');
app.use(bodyParser.urlencoded({extended: true}));
app.use('/images', express.static(__dirname + "/images"));
app.use(express.static(path.join(__dirname, 'pokeball')));
app.listen(3000,function(){
    console.log("the port is ready at 3000");
})
app.get("/",(req,res)=>{
    console.log(req.body);
    res.sendFile(__dirname + "/index.html");
})
app.post("/",(req,res)=>{
    console.log(req.body);
    res.send("hello");
})
app.post("/pokeball",(req,res)=>{
    console.log(req.body);
    res.sendFile(__dirname + "/pokeball/pokeball.html");
})
app.post('/NumberGuesser',(req,res)=>{
    console.log(req.body);
    res.send("hello");
})
app.post('/xyz',(req,res)=>{
    console.log(req.body);
    res.send("hellos");
})