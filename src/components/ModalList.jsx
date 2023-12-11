import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography'
import { SelectTimeArrival } from './SelectTimeArrival.jsx';
import { SelectTimeDeparture } from './SelectTimeDeparture.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { Button, TextField } from '@mui/material';
import { MuiTelInput } from 'mui-tel-input'
import { useState } from 'react';
import { postBookedParkingThunk } from './postBookedParkingThunk.js';
export function ModalList() {
  const idParking = useSelector(state => state.booked.idParking);
  const timeArrival = useSelector(state => state.booked.timeArrival);
  const timeDeparture = useSelector(state => state.booked.timeDeparture);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const dispatch = useDispatch();
  const price = useSelector(state => {
    const id = state.booked.idParking;
    const parkings = state.parkings.parkings;
    const parking = parkings.find(parking => parking.id === id);
    return parking.data.price;
  });
  const handleSubmit = () => {
    dispatch({ type: 'PASS_FALSE_TO_IS_MODAL_OPEN' });
    dispatch(postBookedParkingThunk(idParking, timeArrival, timeDeparture, phoneNumber, carNumber));
  }
  const cost = () => {
    return price * (timeDeparture)
  }
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="secondary mailbox folders">
        <List sx={{ mt: 2 }}>
          <ListItem disablePadding sx={{ my: 1 }}>
            <Typography color="initial" sx={{ my: 1 }}>
              Час поїздки до стоянки
            </Typography>
            <SelectTimeArrival />
          </ListItem>
          <ListItem disablePadding sx={{ my: 1 }}>
            <Typography color="initial" sx={{ my: 1 }}>
              Кількість часу
            </Typography>
            <SelectTimeDeparture />
          </ListItem>
          <ListItem disablePadding sx={{ my: 1 }}>
            <MuiTelInput
              defaultCountry="UA"
              onlyCountries={['PL', 'UA']}
              label="Номер телефону"
              value={phoneNumber}
              onChange={(newValue) => {
                setPhoneNumber(newValue)
              }}
            />
          </ListItem>
          <ListItem disablePadding sx={{ my: 1 }}>
            <TextField
              id="outlined-basic"
              label="Номер авто"
              variant="outlined"
              value={carNumber}
              onChange={(event) => {
                setCarNumber(event.target.value);
              }}
            />
          </ListItem>
          <ListItem disablePadding sx={{ my: 1 }}>
            <Typography color="initial" sx={{ my: 1 }}>
              До сплати: {cost()} грн
            </Typography>
          </ListItem>
          <ListItem disablePadding sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              sx={{ m: '0 auto' }}
              onClick={handleSubmit}
            >Забронювати місце</Button>
          </ListItem>
        </List>
      </nav>
    </Box>
  );
}