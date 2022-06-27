# US_Stock_Scanner-cab432

The stock scanner website provides filters on the US market for most active stocks of the day. Users can find stocks with highest gain and loss of the day. In addition, scanner can search for stocks with high growth and volatility. The website updates the data daily from 9am to 4pm in New York time every day. successful day traders utilize daily stocks scanner to make a trade. A stock shown in the scanner means a high volatiles and volume -buyers and sellers- which can significantly improve the day trader pick of stocks and trades. In addition to providing the stocks with most active movement, the website provides a news feed for each stock, helping the day trader understand the reason behind the stock’s movement.

Services used

API 1:

Rapidapi yahoo finance API Return list of stocks when a user makes an API call. Users have to determine the filter based on the once available from the API. In addition, the user can use this API to obtain certain stock quote such as the price, volume, percentage change To search specific stock symbol: Endpoint: https://yahoo-finance15.p.rapidapi.com/api/yahoo/qu/quote/{stock ticker} To search list of stocks based on chosen filter: Endpoint: https://yahoo-finance15.p.rapidapi.com/api/yahoo/co/collections/{filter} Docs: https://rapidapi.com/sparior/api/yahoo-finance15/

API 2:

Finnhub API Return news about a specific stock chosen by the user. The news organize in order the newest to the oldest. This api provide the headline, source, date and url link to the news website. Endpoint: https://finnhub.io/api/v1/company-news?symbol={stock name} Docs: https://finnhub.io/docs/api/market-news
Mashup Use Cases and Services

Use case 1:

As a
Day trader
I want
To find a list of Stocks that have high volume and volatility using filters
So that
I can trade stocks that have potential to significantly move up and make profit
US equity market has more than 700 stocks and finding a stock for daily trades can be a struggle. To solve this issue, This website provide a list of filters to help a day trader find stocks on play and have high potential to move up or down and provide opportunity to buy or sell. The website provides list of stocks based on the following filters: Small Cap Gainers, Aggressive Small Caps, Undervalued Large Caps, Most Actives, Day Losers, Day Gainers, Growth Technology Stocks, Undervalued Growth Stocks. User can pick one of the filters from a dropdown as shown in figure (1)

![Screenshot](https://github.com/sohybqasem/US_Stock_Scanner-cab432/blob/main/figure%201.png)
Figure 1 filters
After the user chooses the filter, top list of stocks that fulfill the requirement appears. For example, if the users chose the day losers filter, results shows stocks with biggest negative price change as shown in figure(2)
Figure 2 losers stocks

Use case 2:

As a
Day trader
I want
Find the news that explains why the stock is in the list and have high volume and volatility
So that
I can make an assessment if the stock move is based on reliable news
When day trader clicks on the stock, the stock’s row will expand and show headlines of latest news related to the stock. This can assess the day trader to understand why a stock move very high or low. The expanded row shows the news headline, date, source and a link to the sources’ website when headline is clicked as shown in figure()
Figure 3 news expanded

Use Case 3:

As a
Day trader
I want
Search for specific stock and find about its day’s performance including current price, volume, price change and the news as well.
So that
It can help day trader track chosen stock without need to use the filters
On top of the filters dropdown, a search bar is implemented to help day trader search for specific stock and display current price, volume and price change as shown in figure 4
Figure 4 search stock symbol

Client Side: 

Open your terminal and then type

$ git clone {the url to the GitHub repo}

This clones the repo

cd into the new folder and type

$ npm install

This installs the required dependencies

To run the React project.
$ npm start

Server Side: 

Install MongoDb:
the Server side uses MongoDb to store data that has already been requested from the API. before running the server, install MongoDB from this link:
https://www.mongodb.com/docs/manual/installation/

Install Redis:
Redis works as a cache and save recent data pulled form api to help decreasing the number of requests to api, click the link below:
https://redis.io/docs/getting-started/installation/

Running the server:

cd into the new folder and type, Server

$ npm install

This installs the required dependencies

To run the React Server.
$ npm start
