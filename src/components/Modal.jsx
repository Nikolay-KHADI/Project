// import React from 'react'

// import { ErrorMessage, Field, Form, Formik } from "formik";
// import * as Yup from "yup";
// import { Input } from "./Input";

export function Modal(props) {

  console.log("Render Modal");

  return (
    <div className={'modal'} >
      <div className="overlay" onClick={props.closeModal}></div>
      <div className="modalWindow">
        <div className="modalHeader">
          <div>Щоб забронювати місце введіть наступні дані:</div>
        </div>
        <div className="modalBody">
          {/* <p>{props.bodyText}</p> */}
          {/* <form action=""> */}
          <label htmlFor="arrivalTime"> Час поїздки до стоянки</label>
          <input type="time" defaultValue="00:00" step="600" list="timeArrival" id="arrivalTime"></input>
          {/* <span className="validity"></span> */}
          <datalist id="timeArrival">
            <option value="00:10"></option>
            <option value="00:20"></option>
            <option value="00:30"></option>
            <option value="00:40"></option>
            <option value="00:50"></option>
            <option value="01:00"></option>
          </datalist>
          <br />

          <label htmlFor="departureTime"> Кількість часу </label>
          <input type="time" defaultValue="01:00" step="1800" list="timeDeparture" id="departureTime"></input>
          {/* <span className="validity"></span> */}
          <datalist id="timeDeparture">
            {/* <option value="00:30"></option> */}
            <option value="01:00"></option>
            {/* <option value="01:30"></option> */}
            <option value="02:00"></option>
            {/* <option value="02:30"></option> */}
            <option value="03:00"></option>
            {/* <option value="03:30"></option> */}
            <option value="04:00"></option>
            {/* <option value="04:30"></option> */}
            <option value="05:00"></option>
            {/* <option value="05:30"></option> */}
            <option value="06:00"></option>
            {/* <option value="06:30"></option> */}
            <option value="07:00"></option>
            {/* <option value="07:30"></option> */}
            <option value="08:00"></option>
            {/* <option value="08:30"></option> */}
            <option value="09:00"></option>
            {/* <option value="09:30"></option> */}
            <option value="10:00"></option>

          </datalist>

          <div>До сплати: 100 грн</div>
          <button onClick={() => {
            console.log("Забронювати місце");
            props.closeModal();
            }}>Забронювати місце та перейти до оплати</button>
          {/* </form> */}
          {/* <Formik> 
            <Field name="time" type="time" label="timeParking" component={Input}></Field>
          </Formik> */}

        </div>
      </div>
    </div>
  )
}