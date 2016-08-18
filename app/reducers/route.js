const initialState = { path: { pathname: "/", query: {} } };
const routeReducer = (state = initialState, action) => {
  switch(action.type) {
    case 'SET_HISTORY_PATH':
      return {
        ...state,
        path: action.path,
      };
    default:
      return state;
  }
};

export default routeReducer;

