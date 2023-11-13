
const initialState = {
  parkings: [],
  isParkingsLoading: false,
}

export const parkingsReducer = (state = initialState, action) => {
  switch (action.type) {

    case "GET_PARKINGS_REQUEST":
      return { ...state, isParkingsLoading: true };

    case "GET_PARKINGS_SUCCESSFULLY":
      return { ...state, isParkingsLoading: false, parkings: action.payload.parkings };

    case "GET_PARKINGS_ERROR":
      return { ...state, isParkingsLoading: false};

    default:
      return state;
  }
}