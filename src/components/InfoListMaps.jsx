
import { Box, Button, List, ListItem, Tooltip, Typography } from "@mui/material";
import { useDispatch } from "react-redux";

export function InfoList(props) {
  const dispatch = useDispatch();

  const addToFavourite = (id) => {
    dispatch({ type: "ADD_FAVOURITE_ID", payload: { id: id } })
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="secondary mailbox folders">
        <List >
          <ListItem disablePadding>
            <Typography
              color="initial"
              align= 'center'
              sx={{ my: 1, fontSize: '18px', fontWeight: '700', align: 'center' }}
            >
              Парковка за адресою: {props.activeMarkerData.data.address}
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography color="initial" sx={{ my: 1 }}>
              Режим роботи: з {props.activeMarkerData.data.openTime} до {props.activeMarkerData.data.closeTime}
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography color="initial" sx={{ my: 1 }}>
              Вартість: {props.activeMarkerData.data.price} грн/год
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography color="initial" sx={{ my: 1 }}>
              Всього місць: {props.activeMarkerData.data.totalPlaces}
            </Typography>
          </ListItem>
          <ListItem disablePadding>
            <Typography color="initial" sx={{ my: 1 }}>
              Вільних місць: {props.activeMarkerData.data.freePlaces}
            </Typography>
          </ListItem>

          <ListItem disablePadding sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              sx={{ m: '0 auto' }}
              onClick={() => addToFavourite(props.id)}
              disabled={props.idFavourites.includes(props.id)}
            >Добавити парковку в обрані </Button>
          </ListItem>
          <ListItem disablePadding sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              sx={{ m: '0 auto' }}
              onClick={() => {
                props.openModal();
                props.setIsMarkerInfoWindow(false);
              }}
            >Забронювати місце </Button>
          </ListItem>
          <Tooltip
            disableHoverListener={!!props.startPointDirection}
            placement="top"
            arrow
            title="Спочатку потрібно задати стартову точку"
          >
            <ListItem disablePadding sx={{ mt: 2 }}>
              <Button
                disabled={!props.startPointDirection}
                variant="outlined"
                sx={{ m: '0 auto' }}
                onClick={() => {
                  props.fetchDirections();
                  props.setIsMarkerInfoWindow(false);
                }}
              >Проложити маршрут до цієї точки</Button>
            </ListItem>
          </Tooltip>
        </List>
      </nav>
    </Box>
  )
}
