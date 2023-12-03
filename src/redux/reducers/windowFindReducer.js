
const initialState = {
  isWindowFindOpen: false,
}

export const windowFindReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'TOGGLE_WINDOW_FIND':
      return { ...state, isWindowFindOpen: !state.isWindowFindOpen };

    default:
      return state;
  }
}