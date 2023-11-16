// import React from 'react'

import { GoogleMap, useLoadScript, Marker, DirectionsRenderer, MarkerClusterer, InfoWindow, DirectionsService } from "@react-google-maps/api"
import { useCallback, useEffect, useState } from "react";
import { useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getParkingsThunk } from "./getParkingsThunk";
import { TooltipElement } from "../UI/TooltipElement";
import { Box, Button, List, ListItem, Tooltip, Typography } from "@mui/material";
import { Places } from "./Places";


export function InfoList(props) {
  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <nav aria-label="secondary mailbox folders">
        <List sx={{ mt: 2 }}>
          <ListItem disablePadding>
            <Typography color="initial" sx={{ my: 1 }}>
              {props.activeMarkerData.data.address}
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
              onClick={() => console.log(1)}
            >Добавити парковку в обрані</Button>
          </ListItem>
          <ListItem disablePadding sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              sx={{ m: '0 auto' }}
              onClick={() => {
                props.openModal();
                props.setIsMarkerInfoWindow(false);
              }}
            >Забронювати місце</Button>
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
                  // props.fetchDirections(props.markerInfoWindowPosition);
                  props.fetchDirections();

                  props.setIsMarkerInfoWindow(false);
                  console.log(3)
                }}
              >Проложити маршрут до цієї точки</Button>
            </ListItem>
          </Tooltip>
        </List>
      </nav>
    </Box>
  )
}
