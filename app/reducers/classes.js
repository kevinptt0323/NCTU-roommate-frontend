const initialState = { data: [] };
const classesReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_CLASSES_DONE':
      return {
        sending: false,
        data: action.response.data,
        error: null,
      };
    default:
      return state;
  }
};

export default classesReducer;
