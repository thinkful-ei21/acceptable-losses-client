import jwtDecode from 'jwt-decode';
import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';
import { saveAuthToken, clearAuthToken } from '../local-storage';

export const SET_AUTH_TOKEN = 'SET_AUTH_TOKEN';
export const setAuthToken = authToken => ({
  type: SET_AUTH_TOKEN,
  authToken
});

export const UPDATE_USER = 'UPDATE_USER';
export const updateUser = user => ({
  type: UPDATE_USER,
  user
});

export const CLEAR_AUTH = 'CLEAR_AUTH';
export const clearAuth = () => ({
  type: CLEAR_AUTH
});

export const AUTH_REQUEST = 'AUTH_REQUEST';
export const authRequest = () => ({
  type: AUTH_REQUEST
});

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const authSuccess = currentUser => ({
  type: AUTH_SUCCESS,
  currentUser
});

export const AUTH_ERROR = 'AUTH_ERROR';
export const authError = error => ({
  type: AUTH_ERROR,
  error
});

export const UPLOADING_REQUEST = 'UPLOADING_REQUEST';
export const uploadingRequest = () => ({
  type: UPLOADING_REQUEST
});

export const UPLOADING_SUCCESS = 'UPLOADING_SUCCESS';
export const uploadingSuccess = user => ({
  type: UPLOADING_SUCCESS,
  user
});

export const DELETE_IMAGE_SUCCESS = 'DELETE_IMAGE_SUCCESS';
export const deleteImageSuccess = user => ({
  type: DELETE_IMAGE_SUCCESS,
  user
});

const storeAuthInfo = (authToken, dispatch) => {
  const decodedToken = jwtDecode(authToken);
  dispatch(setAuthToken(authToken));
  dispatch(authSuccess(decodedToken.user));
  saveAuthToken(authToken);
};

export const login = (username, password) => dispatch => {
  dispatch(authRequest());
  return fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username,
      password
    })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ authToken }) => storeAuthInfo(authToken, dispatch))
    .catch(err => {
      const { code } = err;
      const message = code === 401 ? 'Incorrect username or password' : 'Unable to login, please try again';
      dispatch(authError(err));
      return Promise.reject(
        new SubmissionError({
          _error: message
        })
      );
    });
};

export const refreshAuthToken = () => (dispatch, getState) => {
  dispatch(authRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(({ authToken }) => storeAuthInfo(authToken, dispatch))
    .catch(err => {
      dispatch(authError(err));
      dispatch(clearAuth());
      clearAuthToken(authToken);
    });
};

export const editInfo = values => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/users/settings`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(values)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => dispatch(updateUser(data)))
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        console.log('create bill error');
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};

export const deleteUser = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/users/delete`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
      clearAuth();
      clearAuthToken();
    })
    .catch(err => console.error(err));
};

export const uploadImage = value => (dispatch, getState) => {
  dispatch(uploadingRequest());
  const authToken = getState().auth.authToken;
  fetch(`${API_BASE_URL}/images/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${authToken}`
    },
    body: value
  })
    .then(res => res.json())
    .then(image => dispatch(uploadingSuccess(image)))
    .catch(err => console.error(err));
};

export const deleteImage = public_id => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/images/delete`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({ public_id })
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(user => dispatch(deleteImageSuccess(user)))
    .catch(err => console.error(err));
};
