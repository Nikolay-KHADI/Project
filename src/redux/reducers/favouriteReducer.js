

const initialState = {
  idFavourites: [],
}

export const favouriteReducer = (state = initialState, action) => {

  switch (action.type) {

    case "SET_FAVOURITE_ID":
      return { ...state, idFavourites: action.payload.id };

    case "ADD_FAVOURITE_ID":
      const addId = action.payload.id;
      return { ...state, idFavourites: [...state.idFavourites, addId] };

    case "DELETE_FAVOURITE_ID":
      const removeId = action.payload.id;
      return { ...state, idFavourites: state.idFavourites.filter(idFav => removeId !== idFav) };

    default:
      return state;
  }
}



// const initialState = [];

// export const favouriteReducer = (state = [], action) => {
//   switch (action.type) {

//     case "SET_FAVOURITE_ID":
//       const id = action.payload.idFavourites;
//       return [ ...state, id] ;

//     case "ADD_FAVOURITE_ID":
//       // const id = action.payload.idFavourites;

//       return  [...state, action.payload.idFavourites ];

//     case "DELETE_FAVOURITE_ID":
//       return  [state.filter(idFav => id !== idFav)];

//     default:
//       return state;
//   }
// }