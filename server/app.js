require('dotenv').config
const express = require('express');
const scannerRouter = require('./routes/stocks_scanner');
const tickerRouter = require('./routes/ticker');
const tickersearchRouter = require('./routes/financial_data');
const mongoose = require('mongoose')
// const Schema = mongoose.Schema



  
//connect on port 4001
const app = express();
const hostname = '127.0.0.1';
const port = 4001;
const cors = require("cors")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

//When client is connected, these filters are sent
const filters = [
    	{ value: 'small_cap_gainers', label: 'Small Cap Gainers' },
     	{ value: 'aggressive_small_caps', label: 'Aggressive Small Caps'},
      { value: 'undervalued_large_caps', label: 'Undervalued Large Caps' },
     	{ value: 'most_actives', label: 'Most Actives'},
       { value: 'day_losers', label: 'Day Losers' },
     	{ value: 'day_gainers', label: 'Day Gainers'},
       { value: 'growth_technology_stocks', label: 'Growth Technology Stocks' },
     	{ value: 'undervalued_growth_stocks', label: 'Undervalued Growth Stocks'},
];

app.get('/',  cors(), (req, res) => {
 res.send(filters);
 res.end();
});


//Create the three routes for our application
app.use('/stocks_scanner',scannerRouter);
app.use('/ticker',tickerRouter);
app.use('/ticker_search',tickersearchRouter);
app.use('/financial_data',tickersearchRouter);


app.listen(port, function () {
 console.log(`Express app listening at http://${hostname}:${port}/`);
}); 

