const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
})

let rawdata = fs.readFileSync('quotes.json');
let quotes = JSON.parse(rawdata);
console.log(quotes);


//responds to post request with button press
app.post("/", function(req, res){
    var url = "https://api.thecatapi.com/v1/images/search";
    var imageUrl = "";
    

    https.get(url, function(response){

        try {response.on("data", function(data){
            var catData = JSON.parse(data);

            imageUrl = catData[0].url;
            console.log(imageUrl);


            var theQuote = quotes[Math.ceil(Math.random()*quotes.length)].text

            res.send("<img src= "+imageUrl+" style = 'width: 200px; height: auto;'><br><p>"+theQuote+"</p><br><br><form action = '/' method = 'post'> <button type='submit'>Generate Cat</button></form>");
        })}
        catch (e) {
            res.send("someone messed up lol contact the developer ahaha");
        }
    })

    //Math.ceil(Math.random())*

    /*var url = "https://api.quotable.io/random";
    https.get(url, function(respon){
        console.log(respon.statusCode);

        respon.on("data", function(data){
            var quoteData = JSON.parse(data);

            quote = quoteData.content;
            
            
        })
    })*/



    
    console.log(imageUrl);
    
})

app.listen(3000, function(){
    console.log("Server is running on port 3000");
})


//api key:
// 73709aa0-828d-4d85-9b3e-cd700e024af8