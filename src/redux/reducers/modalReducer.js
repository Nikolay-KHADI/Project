const initialState = {
  isModalOpen: false,
}

export const modalReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'PASS_FALSE_TO_IS_MODAL_OPEN':
      return { ...state, isModalOpen: false };

    case 'PASS_TRUE_TO_IS_MODAL_OPEN':
      return { ...state, isModalOpen: true };

    default:
      return state;
  }
}