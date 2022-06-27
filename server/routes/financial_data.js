const express = require('express');
const https = require('https');
const router = express.Router();
const axios = require("axios").default;
const mongoose = require('mongoose')
const ObjectId = require('mongodb');
const responseTime = require('response-time')
const redis = require('redis');

//mongoose library to connct to mongo server
mongoose.connect("mongodb://localhost/financials")
const db = mongoose.connection
db.on('error',(error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

//create the schema of our database
const Schema = mongoose.Schema
const testCollectionSchema = new Schema({}, { strict: false })

//create a collection in the database
const TestCollection = mongoose.model('financials_shet', testCollectionSchema)

// Catch error when occur
const redisClient = redis.createClient();
redisClient.on('error', (err) => {
console.log("Error " + err); 


});
// Used for header info later.
router.use(responseTime());

//pass a ticker name and sent and api call to get quote about the stock
router.get('/:query/:data_type',  (req, res) => {

    //create the url for api request 
    const options = createUrlCall(req.params.query,req.params.data_type) ;
    const ticker = req.params.query
    const sheets = req.params.data_type

    const datakey = ticker+'-'+sheets
    const redisKey = `yahoo:${datakey}`;

     redisClient.get(redisKey, (err, result) => {
         //handling error from redis
        if (err) {
            logger.error(`Fatal error occurred "${err.message}". Stopping server.`);
            throw e; // Fatal error, don't attempt to fix
        }
        else{
            //check if redis returned results
        if (result) {

            // serve from catche
            console.log("Show reults from cache");
            const resultJSON = JSON.parse(result);
            delete resultJSON.file_type; 

            //process the data correctly
            var redis_results = []
            const props = Object.keys(resultJSON)
            for (let i = 0; i < props.length; i++) {
                redis_results.push(resultJSON[i]);
              }

            res.send(redis_results);
            res.end();
            } else{

        //set the file type key to get data from mongo
       TestCollection.findOne({ file_type: datakey }, function(err, doc) {

        if(err){
            //handle any error produced by mongo
            logger.error(`Fatal error occurred "${err.message}". Stopping server.`);
            throw e; // Fatal error, don't attempt to fix
        }else {
        if( doc === null ) {
            
            //nothing found in the database or redis which require us to make api call 
            //and store data in mongo and redis
            axios.request(options).then(function (response) {
                const data1 = response.data
                data1['file_type'] = datakey;
                var resultJSON = ""

            //format the data based on client request
                	if (sheets === "income-statement"){
                        resultJSON = response.data.incomeStatementHistory.incomeStatementHistory}
					else if (sheets === "balance-sheet"){
						resultJSON = response.data.balanceSheetHistory.balanceSheetStatements
					}else if (sheets === "cashflow-statement"){
						resultJSON = response.data.cashflowStatementHistory.cashflowStatements
					}
                    resultJSON['file_type'] = datakey;

             //itmes and dates are pushed to columns
                var all_columns = []
                all_columns.push({Header:'Items', accessor: 'items'})          
                resultJSON.map((item) => (all_columns.push({Header:item.endDate.fmt, accessor: item.endDate.fmt})))
                
                //in this loop, we get all figures and numbers and exclude max age and end date
                var output = [];
                resultJSON.forEach(function (obj, i) {
                    var s = 0
                    for (var key in obj) {
                        var value = obj[key];
                        if(value.length!==0 && key !== "endDate" && key !=="maxAge"){
                         if(i===0){
                         output.push({items: ((key.split(/(?=[A-Z][a-z])/).join(" ")).charAt(0).toUpperCase() + (key.split(/(?=[A-Z][a-z])/).join(" ")).slice(1))});
                         }
                         if(key !== "endDate" && key !=="maxAge" && s < output.length ){
                            if(value.fmt === undefined ){
                                (output[s])[obj.endDate.fmt] = 0
                            }else{
                                (output[s])[obj.endDate.fmt] = value.fmt
                            }
                          ++s;
                        }    
                        }
                    }
                })

               //combine both coumns and rows in this array and send it to client side
                const final_resultsJson = []
                final_resultsJson.push(all_columns,output)
               
                //create a file type for mongo
                final_resultsJson['file_type'] = datakey;

                try{
                //send results to redis mongo while handling errors
                redisClient.setex(redisKey, 3600, JSON.stringify({  ...final_resultsJson, }));
                console.log('Data is uploaded to Redis')
                } catch (error) {
                    console.error(error)
                    res.status(500)
                  }
                const testCollectionData = new TestCollection(final_resultsJson)
                testCollectionData.save()
                .catch((error) => {
                    //When there are errors We handle them here
                    console.log(error);
                    res.send(400, "Bad Request");
                });
                  console.log("Data uploaded to Mongodb")

                  //send back the resutls with error handling
                res.send(final_resultsJson);
                res.end();
            }).catch(function (error) {
                console.error(error);
                res.send(error);
            });
        } else {
            //get data from mongo and upload it to upload to redis and send back to client
            var mongo_results = []

            //pull data from mongo
            delete doc._doc._id; 
            delete doc._doc.__v;

            try{
                //send results to redis mongo while handling errors
                redisClient.setex(redisKey, 3600, JSON.stringify({...doc._doc, }));
                console.log('Data is uploaded to Redis')
                } catch (error) {
                    console.error(error)
                    res.status(500)
                  }

            delete doc._doc.file_type; 
            console.log('Data shown from mongo')
            const props = Object.keys(doc._doc)

            for (let i = 0; i < props.length; i++) {
                mongo_results.push(doc._doc[i]);
              }

            res.send(mongo_results);
            res.end();
        }
    }
    })
}
        }
})

});

//create an api call with key to obtain quote
function createUrlCall(query, data_type) {
    const options = {
        method: 'GET',
        url: 'https://mboum-finance.p.rapidapi.com/qu/quote/',
        headers: { 
          'x-rapidapi-host': 'mboum-finance.p.rapidapi.com',
          'x-rapidapi-key': '51b9dc46f7mshb573f3fdd2590f0p120393jsnc7106ee4b8c5'
        }
      };
 options.url += (query+'/'+ data_type) ;
 return options;
}

module.exports = router;