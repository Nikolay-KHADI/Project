
import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch } from 'react-redux';

export function SelectTimeDeparture() {

  const dispatch = useDispatch();

  const handleChangeTimeDeparture = (event) => {
    dispatch({type: "SET_TIME_DEPARTURE", payload: {timeDeparture: event.target.value}})
  };

  return (
    <Box sx={{ minWidth: 120, pl: 10.7  }}>
      <FormControl
        fullWidth
      sx={{ minWidth: 104 }}
      >
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          defaultValue={1}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChangeTimeDeparture}
          size="small"
        >
          <MenuItem value={1}>01:00</MenuItem>
          <MenuItem value={2}>02:00</MenuItem>
          <MenuItem value={3}>03:00</MenuItem>
          <MenuItem value={4}>04:00</MenuItem>
          <MenuItem value={5}>05:00</MenuItem>
          <MenuItem value={6}>06:00</MenuItem>
          <MenuItem value={7}>07:00</MenuItem>
          <MenuItem value={8}>08:00</MenuItem>
          <MenuItem value={9}>09:00</MenuItem>
          <MenuItem value={10}>10:00</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}