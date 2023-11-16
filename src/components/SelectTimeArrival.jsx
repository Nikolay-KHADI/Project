
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';

export function SelectTimeArrival() {
  // const [timeArrival, settimeArrival] = React.useState('');
  
  const dispatch = useDispatch();

  const handleChangeTimeArrival = (event) => {
    // setAge(event.target.value);
    dispatch({type: "SET_TIME_ARRIVAL", payload: {timeArrival: event.target.value}})
  };

  return (
    <Box sx={{ minWidth: 120, pl: 2 }}>
      <FormControl
        fullWidth
      // sx={{ m: 1, minWidth: 220 }}
      >
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          defaultValue={0}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChangeTimeArrival}
          size="small"
        >
          <MenuItem value={0}>00:00</MenuItem>
          <MenuItem value={10}>00:10</MenuItem>
          <MenuItem value={20}>00:20</MenuItem>
          <MenuItem value={30}>00:30</MenuItem>
          <MenuItem value={40}>00:40</MenuItem>
          <MenuItem value={50}>00:50</MenuItem>
          <MenuItem value={60}>01:00</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}