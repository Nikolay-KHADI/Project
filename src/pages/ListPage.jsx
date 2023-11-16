import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getParkingsThunk } from '../components/getParkingsThunk';
import { DropDown } from '../components/DropDown';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export function ListPage() {
  const parkings = useSelector(state => state.parkings.parkings);
  const dispatch = useDispatch();
  const [isDropDown, setIsDropDown] = useState(false);
  const [clickedParkingId, setClickedParkingId] = useState(null);
  const [dropDownParams, setDropDownParams] = useState({});

  const clickedParkingData = useMemo(() => parkings.find(parking => parking.id === clickedParkingId), [clickedParkingId]);

  const openModal = (id) => {
    dispatch({ type: 'PASS_TRUE_TO_IS_MODAL_OPEN' });
    dispatch({type: 'SET_PARKING_ID', payload: {idParking: id}})
  }

  console.log("Render ListPage");
  // console.log(parkings);
  // function getWindowDimensions() {
  //   const { innerWidth: width, innerHeight: height } = window;
  //   return {
  //     width,
  //     height
  //   };
  // }

  return (
    <div>
      <div> Список парковок </div>

      {parkings.map(parking => (
        <Accordion key={parking.id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{backgroundColor: '#f1f1f1'}}
          >
            <Typography >{parking.data.address}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <Typography> */}
              {/* <div className='dropDownWindow'> */}
                {/* <h3>{parking.data.address}</h3> */}
                <h4>Режим роботи: з {parking.data.openTime} до {parking.data.closeTime} </h4>
                <h4>Вартість: {parking.data.price} грн/год </h4>
                <h4>Всього місць: {parking.data.totalPlaces}</h4>
                <h4>Вільних місць: {parking.data.freePlaces}</h4>
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
                    openModal(parking.id);
                    // setIsDropDown(false);
                  }}
                >
                  Забронювати стояночне місце
                </button>

              {/* </div> */}
            {/* </Typography> */}
          </AccordionDetails>
        </Accordion>


        // <li
        //   key={parking.id}
        // >{parking.data.address}</li>
      ))}





      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion> */}


      {/* <ul>
        {parkings.map(parking => (
          <li
            key={parking.id}
            className='addressList'
            onClick={(event) => {
              setIsDropDown(true);
              setClickedParkingId(parking.id);
              // if (startPointDirection) return;
              const target = event.target;
              const coords = target.getBoundingClientRect();
              // console.log(getWindowDimensions());
              // console.log(window.innerHeight);
              // console.log('coords', coords);

              const left = coords.left;
              const parentHeight = target.offsetHeight;
              const top = coords.top;
              setDropDownParams({ left, parentHeight, top });
            }}
          >{parking.data.address}</li>
        ))}
      </ul> */}


      {/* {isDropDown &&
        <DropDown
          params={dropDownParams}
          closeDropDown={() => setIsDropDown(false)}
        >
          <div className='dropDownWindow'>
            <h3>{clickedParkingData.data.address}</h3>
            <h4>Режим роботи: з {clickedParkingData.data.openTime} до {clickedParkingData.data.closeTime} </h4>
            <h4>Вартість: {clickedParkingData.data.price} грн/год </h4>
            <h4>Всього місць: {clickedParkingData.data.totalPlaces}</h4>
            <h4>Вільних місць: {clickedParkingData.data.freePlaces}</h4>
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
                setIsDropDown(false);
              }}
            >
              Забронювати стояночне місце
            </button>

          </div>
        </DropDown>
      } */}
    </div>
  )
}
