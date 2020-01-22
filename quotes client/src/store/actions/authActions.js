import axios from 'axios';
import { returnErrors,clearErrors } from './errorActions';
import {store} from '../../index'

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,LODING_FINISH,USER_ID
} from './actionsType';

export const userLoading=()=>{return{type: USER_LOADING}};
export const lodingFinish=()=>{return{type: LODING_FINISH}};
export const userId=(id)=>{return{type: USER_ID,id:id}};


export const loadUser = () => (dispatch, getState) => {
dispatch(clearErrors())
  dispatch({ type: USER_LOADING });

  axios
    .get('https://thawing-badlands-49385.herokuapp.com/api/auth/user', tokenConfig(getState))
    .then(res =>{
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
      dispatch(userId(res.data._id))
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

// Register User
export const register = (name,email, password ) => dispatch => {
dispatch(clearErrors())
dispatch(userLoading())
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });
  axios
    .post('https://thawing-badlands-49385.herokuapp.com/api/user', body, config)
    .then(res =>{
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
      dispatch(userId(res.data.user.id))
    })
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL')
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

export const login = (email, password) => dispatch => {
dispatch(clearErrors())
dispatch(userLoading())
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({email, password });

  axios
    .post('https://thawing-badlands-49385.herokuapp.com/api/auth', body, config)
    .then(res =>{
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    
      dispatch(userId(res.data.user.id))
    })
    .catch(err => {
      let data=err.response?err.response:"";
      data=data.data?data.data:data;
      let status=err.response?err.response:"";
      status=status.status?status.status:status;
      dispatch(
        returnErrors(data,status, 'LOGIN_FAIL')
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  };
};

export const tokenConfig = getState => {
  const token = store.getState().auth.token;

  const config = {
    headers: {
      'Content-type': 'application/json'
    }
  };

  if (token) {
    config.headers['x-auth-token'] = token;
  }

  return config;
};