
import { useLoadScript } from "@react-google-maps/api"
import { Map } from '../components/Map';
const libraries = ["places"]
export function MapPage() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_MAP_API_KEY,
    libraries: libraries,
  });
  if (!isLoaded) return <div>Loading...</div>
  return <Map />
}

