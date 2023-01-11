const express = require('express');
const app = express();

app.get('/', function(req, res){
    res.send("<h2>Meine tolle Überschrift</h2><p>hier mein Text</p>");
});

app.get("/name/:name", function(req, res){
    let name = req.params.name;
    res.send("<h1>Hello " + name +"</h1>");
 });
 

app.listen(3000, function(){
    console.log("Mein Server läuft auf Port 3000");
});

