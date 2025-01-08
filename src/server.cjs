
const express = require('express');             // create the server
const fs = require('fs');                       // for reading and writing files
const bodyParser = require('body-parser');      // middleware for dealing with json data
const path = require('path');                   // for working with files and directory paths
const cors = require('cors');

const app = express();
const PORT = 5000;

// middleware for CORS (cross origin resource sharing)
app.use(cors());

// Middleware
// app.use(bodyParser.json());
app.use(express.json())

// Path to the JSON file
const tableFilePath = path.join(__dirname, '../data/table.json');

// read data from json file.
const readTableData = () => {
    try {
        const data = fs.readFileSync(tableFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error in reading table data: ${error}`);
    }
};

// write data back to the json file.
const writeTableData = (data) => {
    try {
        fs.writeFileSync(tableFilePath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.error(`Error in writing table data to table.json: ${error}`);
    }
};

// save a new row of data (uploaded from form) to table data
app.post('/save-form-data', (req, res) => {
    const formData = req.body;

    if (!formData) {
        return res.status(400).json({ error: 'Form data not found.' });
    }
    const rowData = formData.formData;
    if (!rowData.description ||
        !rowData.amount ||
        !rowData.module ||
        !rowData.category
    ) {
        return res.status(400).json({ error: 'Missing form data property.' });
    }

    const tableData = readTableData();
    const rowDataWithId = {id: tableData.length + 1, ...rowData};       // add id prop
    tableData.push(rowDataWithId);   // add formData to the existing data.
    console.log(`saving form data: ${JSON.stringify(rowDataWithId)}`);
    writeTableData(tableData);

    return res.status(200).json({ message: "Form data saved successfully!" })
})

// returns all the rows of data that are inside table data
app.get('/get-table-data', (req, res) => {
    const tableData = readTableData();

    if (!tableData) {
        return res.status(400).json({ error: 'Unable to read table data.' });
    }

    let totalAmount = 0;
    tableData.forEach(data => {
        totalAmount += Number(parseFloat(data.amount).toFixed(2));
    });

    return res.status(200).json({ message: 'Table data successfully returned.', tableData: tableData, totalAmount: totalAmount })
})


app.delete('/delete-row-data', (req, res) => {
    const rowIds = req.body;    // ids of the rows to be deleted
    console.log(`Deleting selected rows: ${rowIds.rowIds}`);

    if (!rowIds || rowIds.rowIds.length === 0) {
        return res.status(400).json({ error: 'Missing row ids for deletion.' })
    }

    const tableData = readTableData();
    const newTableData = tableData.filter((row) => !rowIds.rowIds.includes(row.id));
    writeTableData(newTableData);
    return res.status(200).json({ message: `Rows {${rowIds.rowIds}} successfully deleted from table data.` })
})


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});