
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
        !rowData.category ||
        !rowData.date
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

// delete all data that has been selected for deletion
app.delete('/delete-row-data', (req, res) => {
    const rowIds = req.body;    // ids of the rows to be deleted
    console.log(`Deleting selected rows: ${rowIds.rowIds}`);

    if (!rowIds || rowIds.rowIds.length === 0) {
        return res.status(400).json({ error: 'Missing row ids for deletion.' })
    }

    const tableData = readTableData();
    const newTableData = tableData
        .filter((row) => !rowIds.rowIds.includes(row.id))   // filter out rows that are not selected for deletion
        .map((row, index) => ({ ...row, id: index + 1 }));  // map each row to the updated id

    writeTableData(newTableData);
    return res.status(200).json({ message: `Rows {${rowIds.rowIds}} successfully deleted from table data.` })
})


app.get('/table-data/:type', (req, res) => {
    const {type} = req.params;
    if (!type) {
        return res.status(400).json({ error: 'Missing type specified.' });
    }
    if (type !== 'category' && type !== 'module') {
        return res.status(400).json({ error: 'Unknown specified type.' });
    }

    // Group and sum amounts by category or module
    // if type = category: compute the total amount for each category and store in a list (['Hardware': X, 'Software': Y, 'Tool': Z])
    // if type = module: // compute the total amount for each module and store in a list (['Main Housing': X, 'Top Housing': Y, 'Bottom Housing': Z])
    const result = {};
    const tableData = readTableData();
    tableData.forEach((item) => {
        const key = item[type];     // key = Hardware, Software or Tools OR Main, Top or Bottom
        if (!result[key]) {
            result[key] = 0; // Initialize the value to 0 if the key is not already in result
        }
        result[key] += Number(parseFloat(item.amount)); // Add the item's amount (converted to a number) to the total for the key
    });

    return res.status(200).json({ message: `Successfully sum amount by ${type}`, result: result});
})


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});