
// import React from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
  ComboboxOptionText,
} from "@reach-ui-fork/combobox";
import "@reach-ui-fork/combobox/styles.css";
import { Divider, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';


export function Places({ setFindPlace }) {


  const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();

    const res = await getGeocode({ address: val });
    const { lat, lng } = getLatLng(res[0]);
    setFindPlace({ lat, lng });
  }

  return (
    <Combobox onSelect={handleSelect}>

      <ComboboxInput
        // style={{ width: "210px" }}
        value={value}
        onChange={event => setValue(event.target.value)}
        className="mapFindInput"
        placeholder="Пошук"
      >
        {/* <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <DirectionsIcon />
        </IconButton> */}

      </ComboboxInput>

      {/* <ComboboxInput
        // style={{ width: "210px" }}
        value={value}
        onChange={event => setValue(event.target.value)}
        className="mapFindInput"
        placeholder="Пошук"
      >


        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
          <DirectionsIcon />
        </IconButton>
        <ComboboxInput /> */}


      <ComboboxPopover>
        <ComboboxList>
          {status === "OK" && data.map(({ place_id, description }) => (
            <ComboboxOption key={place_id} value={description} />
          ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  )
}
