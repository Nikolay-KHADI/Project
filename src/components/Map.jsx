
import { GoogleMap, useLoadScript, Marker, DirectionsRenderer, MarkerClusterer, InfoWindow, DirectionsService } from "@react-google-maps/api"
import { useCallback, useEffect, useState } from "react";
import { useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getParkingsThunk } from "./getParkingsThunk";
import { TooltipElement } from "../UI/TooltipElement";

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
  const [tooltipParams, setTooltipParams] = useState(null);

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getParkingsThunk())
  // }, [dispatch])

  const activeMarkerData = useMemo(() => parkings.find(marker => marker.id === activeMarkerId), [activeMarkerId]);


  const openModal = () => {
    dispatch({ type: 'PASS_TRUE_TO_IS_MODAL_OPEN' });
  }

  const center = useMemo(() => ({ lat: 49.8076, lng: 36.0533 }), []);
  const options = {
    disableDefaultUI: true,
    clickaableIcons: false
  }

  const onLoad = useCallback(map => (mapRef.current = map), [])

  const handleClick = (event) => {
    setIsMarkerInfoWindow(true);
    setMarkerInfoWindowPosition({ lat: event.latLng?.lat(), lng: event.latLng?.lng() });
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
    <div className="container">

      <div className="map">
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
          {directions && <DirectionsRenderer directions={directions} />}
          <MarkerClusterer>
            {(clusterer) => parkings.map(marker => (
              <Marker
                key={marker.id}
                position={marker.position}
                clusterer={clusterer}
                onClick={(event) => {
                  handleClick(event);
                  setisInfoWindowRightClick(false);
                  setActiveMarkerId(marker.id);
                }}
              />
            ))}
          </MarkerClusterer>
          {isMarkerInfoWindow && markerInfoWindowPosition && <InfoWindow
            onLoad={onLoad}
            // position={{ lat: 43.397, lng: -80.644 }}
            position={markerInfoWindowPosition}
            onCloseClick={() => setIsMarkerInfoWindow(false)}
          >

            <div>
              <h3>{activeMarkerData.data.address}</h3>
              <h4>Режим роботи: з {activeMarkerData.data.openTime} до {activeMarkerData.data.closeTime} </h4>
              <h4>Вартість: {activeMarkerData.data.price} грн/год </h4>
              <h4>Всього місць: {activeMarkerData.data.totalPlaces}</h4>
              <h4>Вільних місць: {activeMarkerData.data.freePlaces}</h4>
              <button
                className="btn"
                onClick={() => {
                  console.log(1);
                }}
              >
                Добавити парковку в обрані
              </button>
              <button
                className="btn"
                onClick={() => {
                  openModal();
                  setIsMarkerInfoWindow(false);
                }}
              >
                Забронювати стояночне місце
              </button>
              <button
                data-tooltip="Спочатку потрібно задати стартову точку"
                disabled={!startPointDirection}
                className="btn"
                onClick={() => {
                  fetchDirections(markerInfoWindowPosition);
                  setIsMarkerInfoWindow(false);
                  // console.log(!!startPointDirection);
                }}
                onMouseOver={(event) => {
                  if (startPointDirection) return;
                  const target = event.target;
                  // console.log('target', target);
                  const tooltip = target.dataset.tooltip;
                  if (!tooltip) return;
                  const coords = target.getBoundingClientRect();
                  const left = coords.left;
                  const parentWidth = target.offsetWidth;
                  const top = coords.top;
                  setTooltipParams({ left, parentWidth, top, tooltip });
                }}
                onMouseLeave={() => setTooltipParams(null)}
              >Проложити маршрут до цієї точки</button>
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
      {console.log('render end', tooltipParams) || tooltipParams && <TooltipElement params={tooltipParams} />}
    </div>
  )
}
