import { GET_ERRORS, CLEAR_ERRORS,ERROR, ERROR_NULL } from './actionsType';


export const returnErrors = (msg, status, id = null) => {
  return {
    type: GET_ERRORS,
    payload: { msg, status, id }
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
export const errors = (msg) => {
  return {
type: ERROR,
msg:msg
};
};
export const errorNull = (msg) => {
  return {
type: ERROR_NULL
};
};