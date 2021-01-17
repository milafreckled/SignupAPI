const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.get("/", function(req, res){
  res.sendFile(__dirname+"/signup.html");
  console.log("Post request received");
});
app.post("/", (req, res)=>{
  const userName = req.body.name;
  const userSurname = req.body.surname;
  const userEmail = req.body.email;
  var data = {
    members:[
      { email_address: userEmail,
      status: "subscribed",
      merge_fields:{
        FNAME: userName,
        LNAME: userSurname
      },
    }
    ]
  };
  const jsonData = JSON.stringify(data);
  const url = "";
  const options = {
    method: "POST",
    auth: YOUR_API,
  };
  const request = https.request(url, options, function(response){
    if (response.statusCode === 200){
      res.sendFile(__dirname+"/success.html");
    }else{
      res.sendFile(__dirname+"/failure.html");
    }
    console.log(response.statusCode);
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, ()=>{
console.log("Server is running on 3000 port");
});
