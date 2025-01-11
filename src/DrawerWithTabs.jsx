import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, Box, List, ListItem, ListItemButton, ListItemText, Button } from '@mui/material';

// returns the button that opens the drawer component for navigation
const DrawerWithTabs = () => {
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const pages = ['Dashboard', 'Charts'];

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
                        pages.map((page) => (
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => handleNavigation('/'.concat(page.toLowerCase()))}>
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
