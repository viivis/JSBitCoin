const express= require("express");
const bodyParser= require("body-parser");
const path = require("path");
const request = require("request");
//injecting code from shop.js

const app = express();

app.use(express.static(path.join(__dirname,"public")));
app.use(bodyParser.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', 'views');



app.get('/', function (req, res) {  
    
    res.sendFile(path.join(__dirname,"views","index.html"));     
});



app.post('/', function(req, res){
    let currency = req.body.currency;
   
    let url =`https://api.coindesk.com/v1/bpi/currentprice/${currency}.json`;

   request(url, function(error, response, body){
       console.log("Status", response.statusCode);

       let data = JSON.parse(response.body);
    
       let price;
       let num1= Number(req.body.number1);
     
       
       if(currency === "EUR"){
           price=data.bpi.EUR.rate_float;
           console.log(price);
          res.render('index', 
          {numb: `${price * num1}`, 
          currency1: `${currency}`});

          
        } else{
           price=data.bpi.USD.rate_float;
           console.log(price);
           res.render('index', 
          {numb1: `${price * num1}`});
          
       }
      
   });
   
});
app.listen(process.env.PORT || 5000, function(){
    console.log("Server is running on port 5000");
});


