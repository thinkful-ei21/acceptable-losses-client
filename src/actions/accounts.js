import { SubmissionError } from 'redux-form';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const GET_ACCOUNTS_SUCCESS = 'GET_ACCOUNTS_SUCCESS';
export const getAccountsSuccess = accounts => ({
  type: GET_ACCOUNTS_SUCCESS,
  accounts
});

export const GET_ACCOUNT_SUCCESS = 'GET_ACCOUNT_SUCCESS';
export const getAccountSuccess = account => ({
  type: GET_ACCOUNT_SUCCESS,
  account
});

export const GET_ACCOUNTS_ERROR = 'GET_ACCOUNTS_ERROR';
export const getAccountsError = error => ({
  type: GET_ACCOUNTS_ERROR,
  error
});

export const SEARCH_ACCOUNTS = 'SEARCH_RECIPE';
export const searchAccounts = (data) => ({
    type: SEARCH_ACCOUNTS,
    data
});


export const getAccounts = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/accounts`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => {
      dispatch(getAccountsSuccess(data));
    })
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        console.log('user.js error');
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};

export const getAccount = (id) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/accounts/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => {
      dispatch(getAccountSuccess(data));
    })
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        console.log('user.js error');
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};


export const createBill = bill => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  console.log(bill);
  return fetch(`${API_BASE_URL}/accounts`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(bill)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
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
