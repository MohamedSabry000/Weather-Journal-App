// Setup empty JS object to act as endpoint for all routes

require("dotenv").config();
// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

/*const port = process.env.PORT || 3000;*/
const port = process.env.PORT || 8081;
/* Middleware*/
const bodyParser = require('body-parser');
projectData = {};
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


app.get("/", (req, res) => {
    res.json(projectData);
});

app.get("/projectData", (req, res) => {
    res.json(projectData);
});

app.post("/projectData", (req, res) => {
    const { temperature, date, feeling } = req.body;
    Object.assign(projectData, {
        temperature: `${temperature}`,
        date: date,
        feeling: feeling
    });

    res.status(201).json(projectData);
});


// Setup Server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});