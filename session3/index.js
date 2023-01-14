const express = require('express');
const app = express();

app.use(express.static("../gol"));

app.get('/', function(req, res){
    res.send("<h2>Meine tolle Überschrift</h2><p>hier mein Text</p>");
});

app.get("/name/:name", function(req, res){
    let name = req.params.name;
    res.send("<h1>Hello " + name +"</h1>");
 });

app.get('/gol', function(req, res){
    res.redirect('index.html');
});

app.get('/google/:search', function(req, res){
    let searchTerm = req.params.search;
    res.redirect("https://www.google.com/search?q="+searchTerm);
});

app.get("/*", function(req, res) {
    res.status(404).send("Uups geht nicht....");
});

app.listen(3000, function(){
    console.log("Mein Server läuft auf Port 3000");
});

