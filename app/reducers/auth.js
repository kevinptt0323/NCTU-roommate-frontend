const initialState = { token: "" };
const authReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_TOKEN':
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};

export default authReducer;
