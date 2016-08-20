import request from 'superagent';
import prefix from 'superagent-prefix';

import { CALL_API } from '../actions/api';
import { SERVER_HOST } from '../config';

const server = prefix(SERVER_HOST);

export default store => next => action => {
  if ( !action[CALL_API] ) {
    return next(action);
  }
  const { method, path, query = {}, body, failureType, successType, sendingType } = action[CALL_API];
  const { withToken } = action;
  const { dispatch } = store;

  dispatch({ type: sendingType });

  if (withToken) {
    //req.set('Authorization', `Bearer ${token}`);
    query['token'] = store.getState().auth.token;
  }

  let req = request[method](path)
    .use(server)
    .query(query)
    .send(body);

  req.end((err, res)=> {
      if (err) {
        dispatch({
          type: failureType,
          response: err
        });
      } else {
        dispatch({
          type: successType,
          response: res.body
        });
      }
    });
};
