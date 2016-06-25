// Dependencies
// =============================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


//import data from waitlist and table list
var waitList = [];
var tableList = [];


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get('/', function(req, res){
	//res.send("Welcome to the Star Wars Page!")
	res.sendFile(path.join(__dirname + '/app/public/hotRestaurant.html'));
})

app.get('/tables', function(req, res){
	//res.send("Welcome to the Star Wars Page!")
	res.sendFile(path.join(__dirname + '/app/public/hotRestaurantTable.html'));
})

app.get('/reservation', function(req, res){
	//res.send("Welcome to the Star Wars Page!")
	res.sendFile(path.join(__dirname + '/app/public/hotRestaurantReservations.html'));
})

// Search for Specific Character (or all characters) - provides JSON
app.get('/api/:list?', function(req, res){

	var chosen = req.params.list;

	if(chosen == "wait"){
        res.json(waitList);
    }
	else{
		res.json(tableList);
	}
})

// Create New Characters - takes in JSON input
app.post('/api/new', function(req, res){

	var newTable = req.body;
	newTable.routeName = newTable.name.replace(/\s+/g, '').toLowerCase()

	console.log(newTable);
    if(tableList.length <= 5)
    {
	    tableList.push(newTable);
    }
    else
    {
        waitList.push(newTable);
    }

	res.json(newTable);
})

// Starts the server to begin listening 
// =============================================================
app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})