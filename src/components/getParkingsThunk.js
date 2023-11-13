
export const getParkingsThunk = () => {
  return (dispatch) => {
    dispatch({ type: "GET_PARKINGS_REQUEST" });
    fetch("./data.json")
    .then(res => res.json())
    // Promise.reject(new Error('Fetch parkings went with error'))
    .then(res => {
      dispatch({type: "GET_PARKINGS_SUCCESSFULLY", payload: {parkings: res}})
    })
    .catch(err => {
      dispatch({type: "GET_PARKINGS_ERROR"});
      console.error(err);
      })
  }
}