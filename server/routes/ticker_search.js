const express = require('express');
const https = require('https');
const router = express.Router();
var axios = require("axios").default;


//pass a ticker name and sent and api call to get quote about the stock
router.get('/:query', (req, res) => {
    var options = createUrlCall(req.params.query) ;
    axios.request(options).then(function (response) {

      console.log(response.data.error);
      
       res.send(response.data);
       res.end();
    }).catch(function (error) {
        console.error(error);
    });
});

//create an api call with key to obtain quote
function createUrlCall(query) {
    var options = {
        method: 'GET',
        url: 'https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/',
        headers: { 
          'x-rapidapi-host': 'yahoo-finance15.p.rapidapi.com',
          'x-rapidapi-key': 'd6b1da70e9msh1bd665a18c6d1a2p153400jsnb61d92d01c53'
        }
      };
 options.url += query ;
 return options;
}

module.exports = router;