import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ListItemText } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import categories from '../data/categories.json';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
    },
  },
};

// provides the select (dropdown) for Categories
export default function Categories({handleSelectedCategories}) {
    const theme = useTheme();
    const [categoryName, setCategoryName] = React.useState([]);
    const [allCategories, setAllCategories] = React.useState([]);

    React.useEffect(() => {
        setAllCategories(categories);
    }, [categories])

    const handleChange = (event) => {
        const value = event.target.value;
        console.log(`selected categories (Categories.jsx): ${value}`);
        handleSelectedCategories(value);
        setCategoryName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div>
        <FormControl sx={{ mt: 2, width: 300, bgcolor: 'white', borderRadius:'4px'}} size='small'>
            <InputLabel id="multiple-category-label" sx={{color:'black'}}>Category</InputLabel>
            <Select
            labelId="multiple-category-label"
            id="multiple-category"
            multiple
            value={categoryName}
            onChange={handleChange}
            input={<OutlinedInput label="Category" />}
            renderValue={(selected) => selected.join(', ')}
            MenuProps={MenuProps}
            sx={{ 
                color: 'black', // Set selected text color
                '.MuiSelect-icon': { color: 'black' }, // Set dropdown arrow color
            }}
            >
            {allCategories.map((category) => (
                <MenuItem key={category} value={category}>
                    <Checkbox checked={categoryName.includes(category)} />
                    <ListItemText primary={category} />
                </MenuItem>
            ))}
            </Select>
        </FormControl>
        </div>
  );
}


