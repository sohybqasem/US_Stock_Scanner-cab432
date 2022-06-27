import axios from "axios"
import React, { useState,useEffect } from "react"
import "./App.css"
import DataTable from 'react-data-table-component';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { SearchBar } from "@workday/canvas-kit-labs-react-header";
import { Navbar , Container} from "react-bootstrap";
import Collapsible from 'react-collapsible';
import {Tabs, Tab} from 'react-bootstrap'
import CssBaseline from '@material-ui/core/CssBaseline'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useTable } from 'react-table'


function App() {
	//usestate to update values of our data 
	const [ filters, setFilters ] = useState([])
	const[stocks, setStocks] = useState([]);
	const [searchValue, setSearchValue] = React.useState("");
	const [searcherror, setSearcherror] = useState("There are no records to display");
	
	//alawys run and provide make a call to serverside to get filters list
	useEffect(() => {
		try{
		axios.get("http://127.0.0.1:4001/").then(function(response) {
			setFilters(response.data)
		})}catch (error){
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			console.log(error.config);
		}

	}, [])

//Columns names show in our datatable
  const columns = [
	{
	  name: "Symbol",
	  selector: (row) => row.symbol
	},
	{
	  name: "Current Price",
	  selector: (row) => row.regularMarketPrice
	},
	{
		name: "Volume",
		selector: (row) => row.regularMarketVolume
	  },
	  {
		name: "Price Change %",
		selector: (row) => row.regularMarketChangePercent
	  }
  ];
  
  //Make api call to server to get all stocks when choosing the filter
	async function postName(e) {
		const url = "http://127.0.0.1:4001/stocks_scanner/" + String(e.value)
		try {
			await axios.get(url).then(function(response) {
				setStocks(response.data)
			})
		} catch (error){
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			console.log(error.config);
		}
	}


//This table used to show the numbers and figures
function Table({ columns, data }) {
	// Use the state and functions returned from useTable to build your UI
	const { getTableProps, headerGroups, rows, prepareRow } = useTable({
	  columns,
	  data
	});
  
	// Render the UI for your table
	return (
	  <MaUTable {...getTableProps()}>
		<TableHead  >
		  {headerGroups.map((headerGroup) => (
			<TableRow {...headerGroup.getHeaderGroupProps()}>
			  {headerGroup.headers.map((column) => (
				<TableCell  c {...column.getHeaderProps()}>


				<h7 className="font-elemts">{column.render("Header")}</h7>

				  
				</TableCell>
			  ))}
			</TableRow>
		  ))}
		</TableHead>
		<TableBody>
		  {rows.map((row, i) => {
			prepareRow(row);
			return (
			  <TableRow {...row.getRowProps()}>

				{row.cells.map((cell) => {
				  return (
					<TableCell {...cell.getCellProps()}>
					   
					  {cell.render("Cell")}
					</TableCell>
				  );
				})}
			  </TableRow>
			);
		  })}
		</TableBody>
	  </MaUTable>
	);
  }
	// pass a ticker when expand icon is clicked and make api call to get news
	 function Expand(data) {
		const[news, setNews] = useState([]);
		const [sheets, setSheets] = useState([]);
		const [data_columns, setData_columns] = useState([]);
		const [data_data, setData_data] = useState([]);
	

		const [key, setKey] = useState('income-statement');
		const url = "http://127.0.0.1:4001/ticker/" + String(data.data.symbol)
		const url_sheets = "http://127.0.0.1:4001/financial_data/" + String(data.data.symbol)

		//This stock news API
		  useEffect(() => {
			try {
			axios.get(url).then(function(response) {
			setNews(response.data)
			})}
			catch (error){
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					console.log(error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log('Error', error.message);
				}
				console.log(error.config);
			}
		}, [])

		//stocks Financial sheets api
		useEffect(() => {
			try {
				axios.get(url_sheets+ '/' + key).then(function(response) {
					setSheets(response.data)
					setData_columns(response.data[0])
					setData_data(response.data[1])
					})	
			} catch (error){
				if (error.response) {
					// The request was made and the server responded with a status code
					// that falls out of the range of 2xx
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				} else if (error.request) {
					// The request was made but no response was received
					// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
					// http.ClientRequest in node.js
					console.log(error.request);
				} else {
					// Something happened in setting up the request that triggered an Error
					console.log('Error', error.message);
				}
				console.log(error.config);
			}
		}, [key])


	//When expan icon clicked, return news headlines, sources, and data with a link to the original news
		return(   
			//collapsible for stocks's news
			<>
			<Collapsible trigger={"The Stock News"}>
			   <div style={{background:'#E0E0E0'}}>
			{news.map(each_news => (
			  <div   style={{  marginLeft: '2.9rem'}} key={each_news.headline + each_news.source}>
				<div>  <h3 style={{textAlign: 'left'  ,fontSize : '1.2em'}}><a href={each_news.url} style={{color: 'black',  textdecorationline:'none'
                        }}> {each_news.headline}</a></h3></div>
				<div> <h6 style={{textAlign: 'left' ,fontSize : '0.8em' , color: ''}}> By: {each_news.source} | Time: {String(new Date(each_news.date*1000))}</h6> </div>
			  </div>
			))}
		  </div>
		  </Collapsible>
		
<Collapsible trigger={"Stock Financials"}>
<div>

	{/* Here we have the tabs with each sheets mentioned  */}
<Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="income-statement" title="Income Statement">
		  <div>
	  <CssBaseline />
      <Table columns={data_columns} data={data_data} />
		  </div>
      </Tab>

      <Tab eventKey="cashflow-statement" title="Cashflow Statement">
	  <div>
	  <CssBaseline />
      <Table columns={data_columns} data={data_data} />
		  </div>
      </Tab>

      <Tab eventKey="balance-sheet" title="Balance Sheet">
	  <div>
	  <CssBaseline />
      <Table columns={data_columns} data={data_data} />
		  </div>
      </Tab>
    </Tabs>
	</div>
</Collapsible>
</>
		  		  
		);
	}

	//Pass what user search and make api call to get a chosen ticker information
	async function search_ticker(e) {
		const url = "http://127.0.0.1:4001/ticker_search/" + searchValue
		try {
			await axios.get(url).then(function(response) {
				setStocks(response.data)
			
				setSearcherror(response.data.error)
			})
		} catch (error){
			if (error.response) {
				// The request was made and the server responded with a status code
				// that falls out of the range of 2xx
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			} else if (error.request) {
				// The request was made but no response was received
				// `error.request` is an instance of XMLHttpRequest in the browser and an instance of
				// http.ClientRequest in node.js
				console.log(error.request);
			} else {
				// Something happened in setting up the request that triggered an Error
				console.log('Error', error.message);
			}
			console.log(error.config);
		}
	}

	//Update our search value
	const handleChange = (e) => {
	  setSearchValue(e.target.value);
	};
  
    //Show all the components on screen mostly using react boostrap and other libraries imported
	return (
		<div className="App">

	<Navbar bg="dark" variant="dark">
    <Container>
      <Navbar.Brand>
      Stocks Scanner
      </Navbar.Brand>
    </Container>
 	 </Navbar>

      <SearchBar
        onInputChange={handleChange}
        placeholder={`Search the stock`}
        grow={true}
        onSubmit={search_ticker}
      />
			<Dropdown options={filters} onChange={postName}  placeholder="Select an option" />
        <div >
		<DataTable
        columns={columns}
        data={stocks}
        expandableRows
        expandableRowsComponent={Expand}
		noDataComponent = {("div",{style:{padding:"50%"}},`${searcherror}`)}
    	  />
			</div>
		</div>
	)
}

export default App
