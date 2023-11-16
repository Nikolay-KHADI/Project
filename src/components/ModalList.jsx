

// import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography'
import { SelectTimeArrival } from './SelectTimeArrival.jsx';
import { SelectTimeDeparture } from './SelectTimeDeparture.jsx';
import { useSelector } from 'react-redux';
import { Button } from '@mui/material';


// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';

export function ModalList() {

  // const timeArrival = useSelector(state => state.booked.timeArrival);
  const timeDeparture = useSelector(state => state.booked.timeDeparture);
  const price = useSelector(state => {
    const id = state.booked.idParking;
    const parkings = state.parkings.parkings;
    const parking = parkings.find(parking => parking.id === id);
    return parking.data.price;
  });

  const cost = () => {
    return price * (timeDeparture)
  }

  // console.log(cost());

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="secondary mailbox folders">
        <List sx={{ mt: 2 }}>
          <ListItem disablePadding>
            <Typography color="initial" sx={{ my: 1 }}>
              Час поїздки до стоянки
            </Typography>
            <SelectTimeArrival />
          </ListItem>

          <ListItem disablePadding>
            <Typography color="initial" sx={{ my: 1 }}>
              Кількість часу
            </Typography>
            <SelectTimeDeparture />
          </ListItem>

          <ListItem disablePadding>
            <Typography color="initial" sx={{ my: 1 }}>
              До сплати: {cost()} грн
            </Typography>
          </ListItem>

          <ListItem disablePadding sx={{ mt: 2 }}>
          <Button variant="outlined" sx={{ m: '0 auto' }}>Забронювати місце</Button>
            {/* <ListItemButton variant="contained" component="a" href="#simple-list" sx={{ backgroundColor: '#f1f1f1' }}>
            <Typography color="initial" sx={{ my: 1 }}>
              До сплати грн
            </Typography>
            </ListItemButton> */}
          </ListItem>


        </List>
      </nav>
    </Box>
  );
}