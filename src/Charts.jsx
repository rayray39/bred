import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);


// main page that displays the charts based on table data
function Charts() {
    const [categoryTableData, setCategoryTableData] = useState([]);     // table data for categories
    const [categoryLabels, setCategoryLabels] = useState([]);           // category labels
    const [categoryValues, setCategoryValues] = useState([]);           // category values
    const [numberOfCategories, setNumberOfCategories] = useState(0);    // number of categories

    const [moduleTableData, setModuleTableData] = useState([]);         // table data for modules
    const [moduleLabels, setModuleLabels] = useState([]);               // module labels
    const [moduleValues, setModuleValues] = useState([]);               // module values
    const [numberOfModules, setNumberOfModules] = useState(0);          // number of modules

    const [chartSelect, setChartSelect] = useState('categories');       // toggle button

    const pieChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 16, // Adjust legend label font size
                    },
                    color: 'white', // Legend label color (optional)
                },
            },
            tooltip: {
                bodyFont: {
                    size: 18, // Tooltip text font size
                },
                titleFont: {
                    size: 20, // Tooltip title font size
                },
                padding: 12, // Add padding inside the tooltip
                boxPadding: 10, // Adjust padding between the tooltip and content
            },
        },
    };

    useEffect(() => {
        // fetch data for category total and module total
        const fetchTableDataType = async () => {
            try {
                // Parallel fetches
                const [categoryResponse, moduleResponse] = await Promise.all([
                    fetch('http://localhost:5000/table-data/category', {method: 'GET'}),
                    fetch("http://localhost:5000/table-data/module", {method: 'GET'}),
                ]);
        
                const categoryData = await categoryResponse.json();
                const moduleData = await moduleResponse.json();

                if (!categoryResponse.ok) {
                    console.log(categoryData.error);
                    console.log('Error in fetching data for categories.');
                }
                if (!moduleResponse.ok) {
                    console.log(moduleData.error);
                    console.log('Error in fetching data for modules.');
                }
        
                setCategoryTableData(categoryData.result);
                setModuleTableData(moduleData.result);

                // Convert result objects to arrays and extract labels/values
                const categoryEntries = Object.entries(categoryData.result); // [["Hardware", 2], ["Software", 2.2]]
                const moduleEntries = Object.entries(moduleData.result);     // [["Main Housing", 2], ["Top Housing", 2.2]]

                setCategoryLabels(categoryEntries.map(([key]) => key));      // ["Hardware", "Software"]
                setCategoryValues(categoryEntries.map(([, value]) => Number(value.toFixed(2)))); // [2, 2.2]
                setNumberOfCategories(categoryEntries.length);

                setModuleLabels(moduleEntries.map(([key]) => key));          // ["Main Housing", "Top Housing"]
                setModuleValues(moduleEntries.map(([, value]) => Number(value.toFixed(2))));   // [2, 2.2]
                setNumberOfModules(moduleEntries.length);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchTableDataType();
    }, [])

    const handleCategory = () => {
        // used for debugging fetched data from server
        console.log(categoryLabels);
        console.log(categoryValues);
    }

    const handleModule = () => {
        // used for debugging fetched data from server
        console.log(moduleLabels);
        console.log(moduleValues);
    }

    const getCategoriesBgColors = () => {
        // returns a list of random colors for the category's piechart
        const colors = [];
        for (let i = 0; i < numberOfCategories; i++) {
            const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
            colors.push(randomColor);
        }

        return colors;
    }

    const getModulesBgColors = () => {
        // returns a list of random colors for the module's piechart
        const colors = [];
        for (let i = 0; i < numberOfModules; i++) {
            const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
            colors.push(randomColor);
        }

        return colors;
    }

    const PieForCategories = () => {
        // pie chart for categories
        const chartData = {
            labels: categoryLabels,
            datasets: [
              {
                label: "Total Amount",
                data: categoryValues,
                backgroundColor: getCategoriesBgColors(),
              },
            ],
          };
        
          return <Pie data={chartData} options={pieChartOptions} />;
    }

    const PieForModules = () => {
        // pie chart for modules
        const chartData = {
            labels: moduleLabels,
            datasets: [
              {
                label: "Total Amount",
                data: moduleValues,
                backgroundColor: getModulesBgColors(),
              },
            ],
          };
        
          return <Pie data={chartData} options={pieChartOptions} />;
    }

    const handleToggleChange = (event, newChartSelect) => {
        setChartSelect(newChartSelect);
    }

    return <div style={{color: 'white'}}>
        <Stack spacing={2} sx={{ alignItems: 'center' }}>
            <ToggleButtonGroup color='primary' value={chartSelect} onChange={handleToggleChange} exclusive sx={{backgroundColor: 'white'}}>
                <ToggleButton value='categories'>
                    {'Categories'}
                </ToggleButton>
                <ToggleButton value='modules'>
                    {'Modules'}
                </ToggleButton>
            </ToggleButtonGroup>
        </Stack>

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'30px', height:'560px'}}>
            {chartSelect === 'categories' ? <PieForCategories /> : <PieForModules />}
        </div>
    </div>
}

export default Charts