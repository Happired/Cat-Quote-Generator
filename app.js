const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");
})

let rawdata = fs.readFileSync('quotes.json');
let quotes = JSON.parse(rawdata);


//responds to post request with button press
app.post("/", function(req, res){
    var url = "https://aws.random.cat/meow";
    var imageUrl = "";
    
    try {
    https.get(url, function(response){
  
        response.on("data", function(data){
            var catData = JSON.parse(data);

            // gets url for cat image from json response
            imageUrl = catData.file;
            console.log(imageUrl);

            // randomly generates quote from internal json file
            var theQuote = quotes[Math.ceil(Math.random()*quotes.length)].text

            // sends the cat picture and quote back to client
            // to do later: fix ugly html+css
            res.send("<style> body{font-family: 'Roboto Mono', monospace;background-color: #DCD7C9;color: #2C3639;}button{font-family: 'Roboto Mono', monospace;,text-align:center;margin-left:40%;border:0px;background-color:#A27B5C;}</style><img src= "+imageUrl+" style = 'width: 200px; height: auto;'><br><p>"+theQuote+"</p><br><br><form action = '/' method = 'post'> <button type='submit'>Generate Cat</button></form>");
        })
        
    })} catch (e) {
        // idk
        res.send('someone messed up lol')
    }

    //for debugging
    console.log(imageUrl);
    
})

app.listen(process.env.PORT|| 3000, function(){
    console.log("Server is running on port 3000");
})
