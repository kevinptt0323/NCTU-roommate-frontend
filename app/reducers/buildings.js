const initialState = { data: [] };
const buildingsReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_BUILDINGS_DONE':
      return {
        sending: false,
        data: action.response.data,
        error: null,
      };
    default:
      return state;
  }
};

export default buildingsReducer;
