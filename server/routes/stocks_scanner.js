const express = require('express');
const https = require('https');
const router = express.Router();
const axios = require("axios").default;

//parse stocks and push values to a object array and send it back
function parseStocksRsp(rsp) {
    var stocks = [];
    for (let i = 0; i < rsp.quotes.length; i++) {
     stock_symbol = rsp.quotes[i];     
     stocks.push(stock_symbol);
    }
    return stocks;
   }

//Get filter's value and make api call to Yahoo to get all stocks
router.get('/:query', (req, res) => {
    const options = createUrlCall(req.params.query) ;
    axios.request(options).then(function (response) {
        //sent raw data to be parsed and returned 
       var praased_data = parseStocksRsp(response.data);
        //push data to client side
       res.send(praased_data);
       res.end();

    }).catch(function (error) {
        console.error(error);
    });
});

//Create an object with api information to use it to make api calls to Yahoo and include Urlm key and host
function createUrlCall(query) {
    var options = {
        method: 'GET',
        url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/co/collections/',
        headers: { 
          'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
          'x-rapidapi-key': 'd6b1da70e9msh1bd665a18c6d1a2p153400jsnb61d92d01c53'
        }
      };
 options.url += query ;
 return options;
}

module.exports = router;