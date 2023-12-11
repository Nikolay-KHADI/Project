
export const postBookedParkingThunk = (idParking, timeArrival, timeDeparture, phoneNumber, carNumber) => {
  const body = {
    idParking, timeArrival, timeDeparture, phoneNumber, carNumber
  }
  return (dispatch) => {
    fetch("https://eo3ibkut1ibpj98.m.pipedream.net", {
      method: "POST",
      headers: {"Content-Type": "application/json" },
      mode: "cors",
      body: JSON.stringify(body),
    })

    .then(res => res.json())
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      dispatch({type: "POST_PARKING_ERROR"});
      console.error(err);
      })
  }
}

