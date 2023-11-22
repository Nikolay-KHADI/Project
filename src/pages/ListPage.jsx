import { useDispatch, useSelector } from 'react-redux'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function ListPage() {
  const parkings = useSelector(state => state.parkings.parkings);
  const dispatch = useDispatch();
  const idFavourites = useSelector(state => state.favourite.idFavourites);

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
                addToFavourite(parking.id)
              }}
              disabled={idFavourites.includes(parking.id)}
            >
              Добавити парковку в обрані
            </button>

          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
