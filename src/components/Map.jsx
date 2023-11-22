
import { GoogleMap, Marker, DirectionsRenderer, MarkerClusterer, InfoWindow, DirectionsService } from "@react-google-maps/api"
import { useCallback, useEffect, useState } from "react";
import { useMemo, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Places } from "./Places";
import { InfoList } from "./InfoList";
import { Distance } from "./Distance";


export function Map() {
  const mapRef = useRef();
  const parkings = useSelector(state => state.parkings.parkings);
  const idFavourites = useSelector(state => state.favourite.idFavourites);
  const [isMarkerInfoWindow, setIsMarkerInfoWindow] = useState(false);
  const [markerInfoWindowPosition, setMarkerInfoWindowPosition] = useState({});
  const [activeMarkerId, setActiveMarkerId] = useState(null);
  const [isInfoWindowMapClick, setIsInfoWindowMapClick] = useState(false);
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
    disableDoubleClickZoom: true,
  }

  const directionsRendererOptions = {
    suppressMarkers: true
  }

  // const onLoad = useCallback(map => (mapRef.current = map), [])
  const onLoad = useCallback(map => {
    if (map?.data) {
      mapRef.current = map
    }
  }, [])


  const handleClickMarker = (event, id) => {
    setIsMarkerInfoWindow(true);
    setActiveMarkerId(id);
    setMarkerInfoWindowPosition({ lat: event.latLng?.lat(), lng: event.latLng?.lng() });
    setIsInfoWindowMapClick(false);
  }

  const fetchDirections = () => {
    if (!startPointDirection || !markerInfoWindowPosition) return;

    const service = new google.maps.DirectionsService();
    service.route(
      {
        origin: startPointDirection,
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
  const filterOnDistance = () => {
    if (!findPlace) return;
    const radius = 0.5;

    return parkings.filter(parking => {
      const x = (findPlace.lat - parking.position.lat) * 111.19;
      const y = (findPlace.lng - parking.position.lng) * 72.13;
      const z = Math.sqrt(x * x + y * y);
      return z < radius;
    })
  }


  console.log("Render Map");

  return (

    <div className="map">
      <div className="mapFind">
        <h4>Пошук на карті</h4>
        <Places setFindPlace={(coord) => {
          setFindPlace(coord);
          mapRef.current?.panTo(coord);
          setDirections(null);
          // mapRef.current?.set
        }} />
        {directions && <Distance />}
      </div>
      <GoogleMap
        zoom={findPlace ? 17 : 14}
        center={center}
        mapContainerClassName='map-container'
        options={options}
        onLoad={onLoad}
        onClick={(event) => {
          setInfoWindowRightClickPosition({ lat: event.latLng?.lat(), lng: event.latLng?.lng() });
          isMarkerInfoWindow ? false : setIsInfoWindowMapClick(!isInfoWindowMapClick);
          setIsMarkerInfoWindow(false);
        }}
      >

        {findPlace && <Marker
          position={findPlace}
          icon={{
            path: "M3.2175 5.84461c-0.0646693,-0.124528 -0.165315,-0.307008 -0.282587,-0.519646 -0.477114,-0.865087 -1.22503,-2.22118 -1.22503,-2.76819 0,-0.470374 0.190677,-0.896236 0.498945,-1.2045 0.308268,-0.308268 0.73413,-0.498945 1.2045,-0.498945 0.470374,0 0.896236,0.190677 1.2045,0.498945 0.308268,0.308268 0.498945,0.73413 0.498945,1.2045 0,0.547012 -0.747913,1.9031 -1.22503,2.76819 -0.121382,0.220091 -0.224953,0.407878 -0.289256,0.532531l-0.189165 -0.0975 0.189594 0.0978031c-0.0540118,0.104709 -0.182689,0.145803 -0.287398,0.0917913 -0.045626,-0.0235354 -0.0791693,-0.061248 -0.0980315,-0.10498zm0.0907441 -0.724646c0.036811,0.066748 0.0719646,0.130484 0.105091,0.190803 0.033126,-0.0603189 0.0682795,-0.124055 0.105091,-0.190803 0.456339,-0.827421 1.17169,-2.12446 1.17169,-2.56319 0,-0.352591 -0.142906,-0.671795 -0.373945,-0.902835 -0.231039,-0.231039 -0.550244,-0.373945 -0.902835,-0.373945 -0.352591,0 -0.671795,0.142906 -0.902835,0.373945 -0.231039,0.231039 -0.373945,0.550244 -0.373945,0.902835 0,0.438724 0.71535,1.73577 1.17169,2.56319z" + "M3.41333 1.75545c0.208469,0 0.397213,0.0845118 0.53385,0.22115 0.136638,0.136638 0.22115,0.325382 0.22115,0.53385 0,0.208461 -0.0845118,0.397213 -0.22115,0.53385 -0.136638,0.13663 -0.325386,0.22115 -0.53385,0.22115 -0.208465,0 -0.397213,-0.0845197 -0.53385,-0.22115 -0.136638,-0.136638 -0.22115,-0.32539 -0.22115,-0.53385 0,-0.208469 0.0845118,-0.397213 0.22115,-0.53385 0.136638,-0.136638 0.325382,-0.22115 0.53385,-0.22115zm0.232181 0.522819c-0.0594016,-0.0594016 -0.141496,-0.0961496 -0.232181,-0.0961496 -0.090685,0 -0.17278,0.036748 -0.232181,0.0961496 -0.0594016,0.0594016 -0.0961496,0.141496 -0.0961496,0.232181 0,0.090685 0.036748,0.17278 0.0961496,0.232181 0.0594055,0.0594016 0.141492,0.0961496 0.232181,0.0961496 0.090689,0 0.172776,-0.036748 0.232181,-0.0961496 0.0594016,-0.0594016 0.0961496,-0.141496 0.0961496,-0.232181 0,-0.090685 -0.036748,-0.17278 -0.0961496,-0.232181z",
            fillColor: "red",
            fillOpacity: 0.8,
            scale: 9,
            strokeColor: "a50000",
            strokeWeight: 0.5,
            anchor: { x: 4, y: 5.7 }
          }}
        ></Marker>}
        {startPointDirection && <Marker
          icon={{
            path: "M3.2175 5.84461c-0.0646693,-0.124528 -0.165315,-0.307008 -0.282587,-0.519646 -0.477114,-0.865087 -1.22503,-2.22118 -1.22503,-2.76819 0,-0.470374 0.190677,-0.896236 0.498945,-1.2045 0.308268,-0.308268 0.73413,-0.498945 1.2045,-0.498945 0.470374,0 0.896236,0.190677 1.2045,0.498945 0.308268,0.308268 0.498945,0.73413 0.498945,1.2045 0,0.547012 -0.747913,1.9031 -1.22503,2.76819 -0.121382,0.220091 -0.224953,0.407878 -0.289256,0.532531l-0.189165 -0.0975 0.189594 0.0978031c-0.0540118,0.104709 -0.182689,0.145803 -0.287398,0.0917913 -0.045626,-0.0235354 -0.0791693,-0.061248 -0.0980315,-0.10498zm0.0907441 -0.724646c0.036811,0.066748 0.0719646,0.130484 0.105091,0.190803 0.033126,-0.0603189 0.0682795,-0.124055 0.105091,-0.190803 0.456339,-0.827421 1.17169,-2.12446 1.17169,-2.56319 0,-0.352591 -0.142906,-0.671795 -0.373945,-0.902835 -0.231039,-0.231039 -0.550244,-0.373945 -0.902835,-0.373945 -0.352591,0 -0.671795,0.142906 -0.902835,0.373945 -0.231039,0.231039 -0.373945,0.550244 -0.373945,0.902835 0,0.438724 0.71535,1.73577 1.17169,2.56319z" + "M3.41333 1.75545c0.208469,0 0.397213,0.0845118 0.53385,0.22115 0.136638,0.136638 0.22115,0.325382 0.22115,0.53385 0,0.208461 -0.0845118,0.397213 -0.22115,0.53385 -0.136638,0.13663 -0.325386,0.22115 -0.53385,0.22115 -0.208465,0 -0.397213,-0.0845197 -0.53385,-0.22115 -0.136638,-0.136638 -0.22115,-0.32539 -0.22115,-0.53385 0,-0.208469 0.0845118,-0.397213 0.22115,-0.53385 0.136638,-0.136638 0.325382,-0.22115 0.53385,-0.22115zm0.232181 0.522819c-0.0594016,-0.0594016 -0.141496,-0.0961496 -0.232181,-0.0961496 -0.090685,0 -0.17278,0.036748 -0.232181,0.0961496 -0.0594016,0.0594016 -0.0961496,0.141496 -0.0961496,0.232181 0,0.090685 0.036748,0.17278 0.0961496,0.232181 0.0594055,0.0594016 0.141492,0.0961496 0.232181,0.0961496 0.090689,0 0.172776,-0.036748 0.232181,-0.0961496 0.0594016,-0.0594016 0.0961496,-0.141496 0.0961496,-0.232181 0,-0.090685 -0.036748,-0.17278 -0.0961496,-0.232181z",
            fillColor: "#43a731",
            fillOpacity: 0.8,
            scale: 9,
            strokeColor: "red",
            strokeWeight: 0.5,
            anchor: { x: 4, y: 5.7 }
          }}
          position={startPointDirection}
        ></Marker>}

        {directions && <DirectionsRenderer
          directions={directions}
          options={{ suppressMarkers: true }}
        />}

        {!findPlace && <MarkerClusterer>
          {(clusterer) => parkings.map(marker => (
            <Marker
              key={marker.id}
              position={marker.position}
              clusterer={clusterer}
              onClick={(event) => handleClickMarker(event, marker.id)}
            />
          ))}
        </MarkerClusterer>}

        {findPlace && <MarkerClusterer>
          {(clusterer) => filterOnDistance().map(marker => (
            <Marker
              key={marker.id}
              position={marker.position}
              clusterer={clusterer}
              onClick={(event) => handleClickMarker(event, marker.id)}
            />
          ))}
        </MarkerClusterer>}

        {isMarkerInfoWindow && markerInfoWindowPosition && <InfoWindow
          onLoad={onLoad}
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
              id= {activeMarkerId}     
              idFavourites={idFavourites}    
            ></InfoList>
          </div>

        </InfoWindow>}

        {isInfoWindowMapClick && infoWindowRightClickPosition && <InfoWindow
          onLoad={onLoad}
          position={infoWindowRightClickPosition}
          // position={{ lat: 49.81161570856876, lng: 36.10123643951418 }}
          onCloseClick={() => setIsInfoWindowMapClick(false)}
        >
          <div
            className="btn"
            onClick={() => {
              setStartPointDirection(infoWindowRightClickPosition);
              // setStartPointDirection({ lat: 49.81161570856876, lng: 36.10123643951418 });
              setIsInfoWindowMapClick(false)
            }}
          >Проложити маршрут з цієї точки</div>
        </InfoWindow>}

      </GoogleMap>
    </div>
  )
}
