
const express = require('express');             // create the server
const fs = require('fs');                       // for reading and writing files
const bodyParser = require('body-parser');      // middleware for dealing with json data
const path = require('path');                   // for working with files and directory paths

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// Path to the JSON file
const tableFilePath = path.join(__dirname, 'data', 'table.json');

// read data from json file.
const readTableData = () => {
    const data = fs.readFileSync(tableFilePath, 'utf-8');
    return JSON.parse(data);
};

// write data back to the json file.
const writeTableData = (data) => {
    fs.writeFileSync(tableFilePath, JSON.stringify(data, null, 2), 'utf-8');
};



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});