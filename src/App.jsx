import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import DrawerWithTabs from './DrawerWithTabs'
import Dashboard from './Dashboard';
import Charts from './Charts';

function App() {

    return (
        <Router>
            <DrawerWithTabs />
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/charts" element={<Charts />} />
            </Routes>
        </Router>
    )
}

export default App
