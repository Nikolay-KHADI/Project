
import { GoogleMap,  Marker, DirectionsRenderer, MarkerClusterer, InfoWindow, DirectionsService } from "@react-google-maps/api"
import { useCallback, useState } from "react";
import { useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Places } from "./Places";
import { InfoList } from "./InfoList";

export function Map() {
  const mapRef = useRef();
  const parkings = useSelector(state => state.parkings.parkings);
  const [isMarkerInfoWindow, setIsMarkerInfoWindow] = useState(false);
  const [markerInfoWindowPosition, setMarkerInfoWindowPosition] = useState({});
  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const [isInfoWindowRightClick, setisInfoWindowRightClick] = useState(false);
  const [infoWindowRightClickPosition, setInfoWindowRightClickPosition] = useState({});
  const [startPointDirection, setStartPointDirection] = useState(null);
  const [directions, setDirections] = useState(null);
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

  // const fetchDirections = (endPoint) => {
  //   if (!startPointDirection || !endPoint) return;
  const fetchDirections = () => {
    if (!startPointDirection || !markerInfoWindowPosition) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: startPointDirection,
        // destination: endPoint,
        destination: markerInfoWindowPosition,

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
          options={directionsRendererOptions}
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
            <InfoList
              activeMarkerData={activeMarkerData}
              openModal={openModal}
              setIsMarkerInfoWindow={setIsMarkerInfoWindow}
              startPointDirection={startPointDirection}
              fetchDirections={fetchDirections}
            ></InfoList>           
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
  )
}
