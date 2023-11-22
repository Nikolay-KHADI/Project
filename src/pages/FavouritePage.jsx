import { useDispatch, useSelector } from 'react-redux';
import { Accordion, AccordionDetails, AccordionSummary } from '@mui/material';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function FavouritePage() {
  const parkings = useSelector(state => state.parkings.parkings);
  const idFavourites = useSelector(state => state.favourite.idFavourites);
  const favouriteParking = parkings.filter(parking => idFavourites.includes(parking.id));
  const dispatch = useDispatch();

  const openModal = (id) => {
    dispatch({ type: 'PASS_TRUE_TO_IS_MODAL_OPEN' });
    dispatch({ type: 'SET_PARKING_ID', payload: { idParking: id } });
  }

  const revoveFromFavourite = (id) => {
    dispatch({ type: "DELETE_FAVOURITE_ID", payload: { id: id } });
  };

  return (
    <div>

      {favouriteParking.map(parking => (
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
            <h4>Режим роботи: з {parking.data.openTime} до {parking.data.closeTime} </h4>
            <h4>Вартість: {parking.data.price} грн/год </h4>
            <h4>Всього місць: {parking.data.totalPlaces}</h4>
            <h4>Вільних місць: {parking.data.freePlaces}</h4>
            <button
              className="btn"
              onClick={() => {
                openModal(parking.id);
              }}
            >
              Забронювати стояночне місце
            </button>
            <button
              className="btn"
              onClick={() => {
                revoveFromFavourite(parking.id)
              }}
            >
              Видалити парковку з обраних
            </button>

          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
