
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer, MarkerClusterer, InfoWindow, DirectionsService } from "@react-google-maps/api"
import { useCallback, useEffect, useState } from "react";
import { useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getParkingsThunk } from "./getParkingsThunk";
import { TooltipElement } from "../UI/TooltipElement";
import { Box, Button, List, ListItem, Tooltip, Typography } from "@mui/material";
import { Places } from "./Places";

export function Map() {
  const mapRef = useRef();
  const parkings = useSelector(state => state.parkings.parkings);
  const [isMarkerInfoWindow, setIsMarkerInfoWindow] = useState(false);
  const [markerInfoWindowPosition, setMarkerInfoWindowPosition] = useState({});
  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const [isInfoWindowRightClick, setisInfoWindowRightClick] = useState(false);
  const [infoWindowRightClickPosition, setInfoWindowRightClickPosition] = useState({});
  const [startPointDirection, setStartPointDirection] = useState(null);
  // const [endPointDirection, setEndPointDirection] = useState({});
  const [directions, setDirections] = useState(null);
  // const [tooltipParams, setTooltipParams] = useState(null);

  const [findPlace, setFindPlace] = useState(null);


  const dispatch = useDispatch();

  const activeMarkerData = useMemo(() => parkings.find(marker => marker.id === activeMarkerId), [activeMarkerId]);

  const openModal = () => {
    dispatch({ type: 'PASS_TRUE_TO_IS_MODAL_OPEN' });
    dispatch({ type: 'SET_PARKING_ID', payload: { idParking: activeMarkerId } })
  }

  const center = useMemo(() => ({ lat: 49.8076, lng: 36.0533 }), []);
  const options = {
    disableDefaultUI: true,
    clickableIcons: false,
  }

  const directionsRendererOptions = {
    suppressMarkers: true
  }

  const onLoad = useCallback(map => (mapRef.current = map), [])

  const handleClickMarker = (event, id) => {
    setIsMarkerInfoWindow(true);
    setActiveMarkerId(id);
    setMarkerInfoWindowPosition({ lat: event.latLng?.lat(), lng: event.latLng?.lng() });
    setisInfoWindowRightClick(false);
  }

  const fetchDirections = (endPoint) => {
    if (!startPointDirection || !endPoint) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: startPointDirection,
        destination: endPoint,
        travelMode: google.maps.TravelMode.DRIVING
      },
      (result, resultStatus) => {
        if (resultStatus === "OK" && result) {
          setDirections(result)
        }
      }
    )
  }

  console.log('render Map');

  return (

    <div className="map">
      <div className="mapFind">
        <h3>12312312312312</h3>
        <Places setFindPlace={(coord) => {
          setFindPlace(coord);
          mapRef.current.panTo(coord);
        }} />
      </div>
      <GoogleMap
        zoom={14}
        center={center}
        mapContainerClassName='map-container'
        options={options}
        onLoad={onLoad}
        onClick={() => {
          setisInfoWindowRightClick(false);
          setIsMarkerInfoWindow(false);
        }}
        onRightClick={(event) => {
          setInfoWindowRightClickPosition({ lat: event.latLng?.lat(), lng: event.latLng?.lng() });
          setisInfoWindowRightClick(true);
          setIsMarkerInfoWindow(false);
        }}
      >
        {findPlace && <Marker
          position={findPlace}
          icon="./src/img/2.png"
        ></Marker>}

        {startPointDirection && <Marker
          position={startPointDirection}
          icon="./src/img/2.png"
        ></Marker>}

        {directions && <DirectionsRenderer
          directions={directions}
          // draggable={true}
          // markerOptions={visible=false}
          // options={options_2}
          options={directionsRendererOptions}

        // visible={true}


        />}
        <MarkerClusterer>
          {(clusterer) => parkings.map(marker => (
            <Marker
              key={marker.id}
              position={marker.position}
              clusterer={clusterer}
              onClick={(event) => handleClickMarker(event, marker.id)}
            />
          ))}
        </MarkerClusterer>
        {isMarkerInfoWindow && markerInfoWindowPosition && <InfoWindow
          onLoad={onLoad}
          // position={{ lat: 49.8, lng: 36.05 }}
          position={markerInfoWindowPosition}
          onCloseClick={() => setIsMarkerInfoWindow(false)}
        >
          <div>

            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <nav aria-label="secondary mailbox folders">
                <List sx={{ mt: 2 }}>
                  <ListItem disablePadding>
                    <Typography color="initial" sx={{ my: 1 }}>
                      {activeMarkerData.data.address}
                    </Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <Typography color="initial" sx={{ my: 1 }}>
                      Режим роботи: з {activeMarkerData.data.openTime} до {activeMarkerData.data.closeTime}
                    </Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <Typography color="initial" sx={{ my: 1 }}>
                      Вартість: {activeMarkerData.data.price} грн/год
                    </Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <Typography color="initial" sx={{ my: 1 }}>
                      Всього місць: {activeMarkerData.data.totalPlaces}
                    </Typography>
                  </ListItem>
                  <ListItem disablePadding>
                    <Typography color="initial" sx={{ my: 1 }}>
                      Вільних місць: {activeMarkerData.data.freePlaces}
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
                        openModal();
                        setIsMarkerInfoWindow(false);
                      }}
                    >Забронювати місце</Button>
                  </ListItem>
                  <Tooltip
                    disableHoverListener={!!startPointDirection}
                    placement="top"
                    arrow
                    title="Спочатку потрібно задати стартову точку"
                  >
                    <ListItem disablePadding sx={{ mt: 2 }}>
                      <Button
                        disabled={!startPointDirection}
                        variant="outlined"
                        sx={{ m: '0 auto' }}
                        onClick={() => {
                          fetchDirections(markerInfoWindowPosition);
                          setIsMarkerInfoWindow(false);
                          console.log(3)
                        }}
                      >Проложити маршрут до цієї точки</Button>
                    </ListItem>
                  </Tooltip>
                </List>
              </nav>
            </Box>
          </div>

        </InfoWindow>}

        {isInfoWindowRightClick && infoWindowRightClickPosition && <InfoWindow
          onLoad={onLoad}
          position={infoWindowRightClickPosition}
          onCloseClick={() => setisInfoWindowRightClick(false)}
        >
          <div
            className="btn"
            onClick={() => {
              setStartPointDirection(infoWindowRightClickPosition);
              setisInfoWindowRightClick(false)
            }}
          >Проложити маршрут з цієї точки</div>
        </InfoWindow>}

      </GoogleMap>
    </div>
    // {/* {console.log('render end', tooltipParams) || tooltipParams && <TooltipElement params={tooltipParams} />} */}
    // {/* </div> */}
  )
}
