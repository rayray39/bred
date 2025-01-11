import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, Box, List, ListItem, ListItemButton, ListItemText, ListItemIcon, Button } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DataUsageIcon from '@mui/icons-material/DataUsage';

// returns the button that opens the drawer component for navigation
const DrawerWithTabs = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const pages = ['Dashboard', 'Charts'];
    const icons = [<DashboardIcon/>, <DataUsageIcon/>];

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleNavigation = (path) => {
        navigate(path); // Navigate to the selected page
        setOpen(false); // Close the drawer
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button onClick={toggleDrawer(true)} variant='outlined' style={{color:'white', borderColor: 'white', padding: '5px 40px 5px 40px'}}>Menu</Button>
            <Drawer open={open} onClose={toggleDrawer(false)} anchor='right' >
                <Box sx={{ width: 250 }} role="presentation">
                <List>
                    {
                        pages.map((page, index) => (
                        <ListItem disablePadding key={index}>
                            <ListItemButton onClick={() => handleNavigation('/'.concat(page.toLowerCase()))}>
                                <ListItemIcon>
                                    {icons[index]}
                                </ListItemIcon>
                                <ListItemText primary={page} />
                            </ListItemButton>
                        </ListItem>
                        ))
                    }
                </List>
                </Box>
            </Drawer>
        </div>
    );
};

export default DrawerWithTabs;
