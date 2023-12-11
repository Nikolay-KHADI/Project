const initialState = {
  idParking: null,
  timeArrival: 0,
  timeDeparture: 1,
}

export const bookedParkingReducer = (state = initialState, action) => {
  switch (action.type) {

    case "SET_PARKING_ID":
      return { ...state, idParking: action.payload.idParking };

    case "SET_TIME_ARRIVAL":
      return { ...state, timeArrival: action.payload.timeArrival };

    case "SET_TIME_DEPARTURE":
      return { ...state, timeDeparture: action.payload.timeDeparture };

    default:
      return state;
  }
}