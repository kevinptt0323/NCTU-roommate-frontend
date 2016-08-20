const initialState = { data: {} };
const profileReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_PROFILE':
      return {
        sending: true,
        data: null,
        error: null,
      };
    case 'GET_PROFILE_DONE':
      return {
        sending: false,
        data: action.response.data,
        error: null,
      };
    case 'GET_PROFILE_ERROR':
      return {
        sending: false,
        data: null,
        error: action.response,
      };
    default:
      return state;
  }
};

export default profileReducer;
