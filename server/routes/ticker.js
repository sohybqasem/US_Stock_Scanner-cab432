const express = require('express');
const https = require('https');
const router = express.Router();
var axios = require("axios").default;

//Parse news of the choose ticker and get headline, source, datetime and url
function parseNewsRsp(rsp) {
    var news = [];
    const headline = Object.keys(rsp[0].headline);
    const source = Object.keys(rsp[0].source);
    const date = Object.keys(rsp[0].datetime);
    const url = Object.keys(rsp[0].url);

//push all all objects into stocks and create an array of objects containing last 5 news of ticker
    for (let i = 0; i < 5; i++) {
     news.push(
         {headline: rsp[i].headline,
            source : rsp[i].source,
            date : rsp[i].datetime,
            url : rsp[i].url,
        });
    }
    //here where we printing the values
    return news;
   }

   //pass ticker name and make api call to finnhub to get recent news about the stock
router.get('/:query', (req, res) => {

    //get today date and search for news from today 
   var today = new Date();
   var dd = String(today.getDate()).padStart(2, '0');
   var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
   var yyyy = today.getFullYear();
   today =   yyyy + '-' + mm + '-' + dd

    const ticker = req.params.query;
    url = "https://finnhub.io/api/v1/company-news?symbol="+ String(ticker) +`&from=2021-03-01&to=${today}&token=c53gcsqad3if62bgcgb0`
    axios.get(url).then(function (response) {
        
   //pass raw news and prase them
       var praased_data = parseNewsRsp(response.data);
       res.send(praased_data);
       res.end();
    }).catch(function (error) {
        console.error(error);
    });

});

module.exports = router;