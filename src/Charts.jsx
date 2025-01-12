import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);


// main page that displays the charts based on table data
function Charts() {
    const [categoryTableData, setCategoryTableData] = useState([]);     // table data for categories
    const [categoryLabels, setCategoryLabels] = useState([]);           // category labels
    const [categoryValues, setCategoryValues] = useState([]);           // category values

    const [moduleTableData, setModuleTableData] = useState([]);         // table data for modules
    const [moduleLabels, setModuleLabels] = useState([]);               // module labels
    const [moduleValues, setModuleValues] = useState([]);               // module values

    useEffect(() => {
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

                setModuleLabels(moduleEntries.map(([key]) => key));          // ["Main Housing", "Top Housing"]
                setModuleValues(moduleEntries.map(([, value]) => Number(value.toFixed(2))));   // [2, 2.2]
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchTableDataType();
    }, [])

    const handleCategory = () => {
        console.log(categoryLabels);
        console.log(categoryValues);
    }

    const handleModule = () => {
        console.log(moduleLabels);
        console.log(moduleValues);
    }

    const PieForCategories = () => {
        const chartData = {
            labels: categoryLabels,
            datasets: [
              {
                label: "Total Amount (Categories)",
                data: categoryValues,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              },
            ],
          };
        
          return <Pie data={chartData} />;
    }

    const PieForModules = () => {
        const chartData = {
            labels: moduleLabels,
            datasets: [
              {
                label: "Total Amount (Modules)",
                data: moduleValues,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
              },
            ],
          };
        
          return <Pie data={chartData} />;
    }

    return <div style={{color: 'white'}}>
        <h1>This is the charts page</h1>

        <button onClick={handleCategory}>category</button>

        <button onClick={handleModule}>module</button>

        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop:'20px', gap:'100px', height:'500px'}}>
            <PieForCategories />
            <PieForModules />
        </div>
    </div>
}

export default Charts