import { useDispatch, useSelector } from 'react-redux'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box, Button, List, ListItem } from '@mui/material';

export function ListPage() {
  const parkings = useSelector(state => state.parkings.parkings);
  const idFavourites = useSelector(state => state.favourite.idFavourites);
  const dispatch = useDispatch();

  const openModal = (id) => {
    dispatch({ type: 'PASS_TRUE_TO_IS_MODAL_OPEN' });
    dispatch({ type: 'SET_PARKING_ID', payload: { idParking: id } })
  }

  const addToFavourite = (id) => {
    dispatch({ type: "ADD_FAVOURITE_ID", payload: { id: id } })
  }

  return (
    <div>
      {parkings.map(parking => (
        <Accordion key={parking.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{ backgroundColor: '#f1f1f1' }}
          >
            <Typography >{parking.data.address}</Typography>
          </AccordionSummary>
          <AccordionDetails>

            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <nav aria-label="secondary mailbox folders">
                <List>

                  <ListItem disablePadding>
                    <Typography color="initial" sx={{ my: 1 }}>
                      Режим роботи: з {parking.data.openTime} до {parking.data.closeTime}
                    </Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <Typography color="initial" sx={{ my: 1 }}>
                      Вартість: {parking.data.price} грн/год
                    </Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <Typography color="initial" sx={{ my: 1 }}>
                      Всього місць: {parking.data.totalPlaces}
                    </Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <Typography color="initial" sx={{ my: 1 }}>
                      Вільних місць: {parking.data.freePlaces}
                    </Typography>
                  </ListItem>

                  <ListItem disablePadding sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      sx={{ m: '0 auto' }}
                      onClick={() => {
                        openModal(parking.id);
                      }}
                    >Забронювати стояночне місце </Button>
                  </ListItem>

                  <ListItem disablePadding sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      sx={{ m: '0 auto' }}
                      onClick={() => addToFavourite(parking.id)}
                      disabled={idFavourites.includes(parking.id)}
                    >Добавити парковку в обрані </Button>
                  </ListItem>

                </List>
              </nav>
            </Box>

          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
