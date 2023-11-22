
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
} from "@reach-ui-fork/combobox";
import "@reach-ui-fork/combobox/styles.css";


export function Places({ setFindPlace }) {

  const { ready, value, setValue, suggestions: { status, data }, clearSuggestions } = usePlacesAutocomplete();

  const handleSelect = async (val) => {
    setValue(val, false);
    clearSuggestions();

    const res = await getGeocode({ address: val });
    const { lat, lng } = getLatLng(res[0]);
    // console.log({ lat, lng });
    setFindPlace({ lat, lng });
  }

  return (
    <div>
      <Combobox onSelect={handleSelect} 
      // style={{ backgroundColor: '#fff' }}
      >

        <ComboboxInput
          style={{ width: "15vw" }}
          value={value}
          onChange={event => setValue(event.target.value)}
          className="mapFindInput"
          placeholder="Пошук"
          // width={'410px'}
        >
        </ComboboxInput>

        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" && data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
          </ComboboxList>
          {/* <div>1</div> */}
        </ComboboxPopover>
        {/* <div>2</div> */}
      </Combobox>
      {/* <div>3</div> */}

    </div>
  )
}
