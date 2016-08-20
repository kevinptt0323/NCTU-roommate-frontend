export const CALL_API = Symbol('CALL_API');

export const sendAjax = ({withToken = false, ...options}) => ({
  [CALL_API]: {
    ...options
  },
  withToken
});
