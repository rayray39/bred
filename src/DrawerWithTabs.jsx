import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, Box, List, ListItem, ListItemButton, ListItemText, Button } from '@mui/material';

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
        <div>
        <Button onClick={toggleDrawer(true)}>Open Drawer</Button>
        <Drawer open={open} onClose={toggleDrawer(false)}>
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
