import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getParkingsThunk } from '../components/getParkingsThunk';
import { DropDown } from '../components/DropDown';

export function ListPage() {
  const parkings = useSelector(state => state.parkings.parkings);
  const dispatch = useDispatch();
  const [isDropDown, setIsDropDown] = useState(false);
  const [clickedParkingId, setClickedParkingId] = useState(null);
  const [dropDownParams, setDropDownParams] = useState({});

  const clickedParkingData = useMemo(() => parkings.find(parking => parking.id === clickedParkingId), [clickedParkingId]);

  const openModal = () => {
    dispatch({ type: 'PASS_TRUE_TO_IS_MODAL_OPEN' });
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
      <ul>
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
      </ul>
      {isDropDown &&
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
      }
    </div>
  )
}
