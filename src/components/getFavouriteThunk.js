export function getFavouriteThunk() {
  return (dispatch) => {
    let favouriteParking = JSON.parse(localStorage.getItem("fav"));
    favouriteParking = favouriteParking ? favouriteParking : [];
    dispatch({type: "SET_FAVOURITE_ID", payload: {id: favouriteParking}})
  }
}
