
export const getParkingsThunk = () => {
  return (dispatch) => {
    dispatch({ type: "GET_PARKINGS_REQUEST" });
    fetch("https://eoqaqjjqqt9v9h.m.pipedream.net")

    .then(res => res.json())
    .then(res => {
      const parkings = Object.values(res)
      dispatch({type: "GET_PARKINGS_SUCCESSFULLY", payload: {parkings: parkings}})
    })
    .catch(err => {
      dispatch({type: "GET_PARKINGS_ERROR"});
      console.error(err);
      })
  }
}

