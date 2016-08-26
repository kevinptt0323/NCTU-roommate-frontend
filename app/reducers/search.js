const initialState = { data: [] };
const profileReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SEARCH_USER':
      return {
        sending: true,
        data: [],
        error: null,
      };
    case 'SEARCH_USER_DONE':
      return {
        sending: false,
        data: action.response.data,
        error: null,
      };
    case 'SEARCH_USER_ERROR':
      return {
        sending: false,
        data: [],
        error: action.response,
      };
    default:
      return state;
  }
};

export default profileReducer;

