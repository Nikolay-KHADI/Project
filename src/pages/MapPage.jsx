
// import './MapPage.css'
import { useLoadScript } from "@react-google-maps/api"
import { Map } from '../components/Map';


export function MapPage() {
  // const key= import.meta.env.VITE_MAP_API_KEY;
  console.log('render App');

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
    // libraries: ["places"],
  });



  if (!isLoaded) return <div>Loading...</div>
  return <Map />
}
