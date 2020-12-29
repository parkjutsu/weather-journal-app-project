// Setup empty JS array to act as endpoint for all routes
projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

const port = 8000;
// Spin up the server
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    console.log("server running");
    console.log(`running on localhost: ${port}`);
}

// Callback function to complete POST '/addWeather'
const addWeather = (req, res) => {
    let data = req.body;
    let newEntry = {
        temp: data.temp,
        date: data.date,
        userRes: data.userRes
    }
    projectData.push(newEntry);
};

// Post Route
app.post('/addWeather', addWeather);

// Callback function to complete GET '/all'
const getWeatherData = (req, res) => {
    console.log(projectData);
    res.send(projectData);
};

// Initialize all route with a callback function
app.get('/all', getWeatherData)