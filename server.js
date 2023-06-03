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
app.post("/pokeball",(req,res)=>{
    console.log(req.body);
    res.sendFile(__dirname + "/pokeball/pokeball.html");
})
app.post("/score",(req,res)=>{
    console.log(req.body);
    const val=Number(req.body.score);
    console.log(val);
    res.sendFile(__dirname + "/thanksspage.html");
})
app.post("/",(req,res)=>{
    console.log(req.body);
    res.sendFile(__dirname + "/index.html");
})
