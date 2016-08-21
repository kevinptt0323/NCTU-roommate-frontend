import request from 'superagent';
import prefix from 'superagent-prefix';

import { SERVER_HOST } from '../config';

const server = prefix(SERVER_HOST);

export const sendAjax = ({withToken = false, ...options}) => (dispatch, getState) => {
  const { method, path, query = {}, body, failureType, successType, sendingType } = options;

  dispatch({ type: sendingType });

  if (withToken) {
    //req.set('Authorization', `Bearer ${token}`);
    query['token'] = getState().auth.token;
  }

  let req = request[method](path)
    .use(server)
    .query(query)
    .send(body);

  return req.end((err, res)=> {
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
