
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
    

})

app.post("/",function(req,res){
   console.log(req.body.cityName);
   const query = req.body.cityName;
const apiKey = "f50c7e875fa246a303d7e3e482ee85a1";
const units = "metric";
const yurtURL = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units="+ units +"&APPID="+ apiKey +"";
https.get(yurtURL, function (response) {
    // console.log(response.statusCode);
    response.on("data", function (data) {
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const description = weatherData.weather[0].description
        const icon = weatherData.weather[0].icon
        const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
        const time =  new Date()
        const timeNow = time.getTime() 
        res.write("<p>" + time + "</p>")
        res.write("<p>"+ query + " is: " + description + " " + "</p>");
        res.write("<img src= " + imageURL + ">");
        res.write("<h1>"+ query + "'s Temperature "+ " is: " + " " + temp + " " + "degree celcius.</h1>");
        res.send();
    });
});
})


app.listen(3000, function (request, response) {
    console.log("Your app is running on port 3000")
});



