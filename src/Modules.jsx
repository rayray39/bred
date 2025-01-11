import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { ListItemText } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import { MODULES } from './Constants';

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

// provides the select (dropdown) for Modules
export default function Modules({handleSelectedModules}) {
  const theme = useTheme();
  const [moduleName, setModuleName] = React.useState([]);

  const handleChange = (event) => {
    const value = event.target.value;   // value is always an array
    console.log(`selected modules (Modules.jsx): ${value}`);
    handleSelectedModules(value);
    setModuleName(
      // On autofill we get a stringified value.
      // in the event that value is not an array (a string), split it to get an array.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl sx={{ mt: 2, width: 300, bgcolor: 'white', borderRadius:'4px'}} size='small'>
        <InputLabel id="multiple-module-label" sx={{color:'black'}}>Module</InputLabel>
        <Select
          labelId="multiple-module-label"
          id="multiple-module"
          multiple
          value={moduleName}
          onChange={handleChange}
          input={<OutlinedInput label="Module" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          sx={{ 
            color: 'black', // Set selected text color
            '.MuiSelect-icon': { color: 'black' }, // Set dropdown arrow color
          }}
        >
          {MODULES.map((module) => (
            <MenuItem key={module} value={module}>
                <Checkbox checked={moduleName.includes(module)} />
                <ListItemText primary={module} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}


