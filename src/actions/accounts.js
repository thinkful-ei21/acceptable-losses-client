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

export const CLEAR_ACCOUNT = 'CLEAR_ACCOUNT';
export const clearAccount = () => ({
  type: CLEAR_ACCOUNT
});

export const GET_ACCOUNTS_ERROR = 'GET_ACCOUNTS_ERROR';
export const getAccountsError = error => ({
  type: GET_ACCOUNTS_ERROR,
  error
});

export const SEARCH_ACCOUNTS = 'SEARCH_RECIPE';
export const searchAccounts = data => ({
  type: SEARCH_ACCOUNTS,
  data
});

export const TOGGLE_FILTER = 'TOGGLE_FILTER';
export const toggleFilter = data => ({
  type: TOGGLE_FILTER,
  data
});

export const TOGGLE_EDIT = 'TOGGLE_EDIT';
export const toggleEdit = () => ({
  type: TOGGLE_EDIT
});

export const TOGGLE_DELETE = 'TOGGLE_DELETE';
export const toggleDelete = () => ({
  type: TOGGLE_DELETE
});

export const TOGGLE_PAY = 'TOGGLE_PAY';
export const togglePay = data => ({
  type: TOGGLE_PAY,
  data
});

export const TOGGLE_WEB = 'TOGGLE_WEB';
export const toggleWeb = data => ({
  type: TOGGLE_WEB,
  data
});

export const GET_DAYS_BILLS = 'GET_DAYS_BILLS';
export const getDaysBills = data => ({
  type: GET_DAYS_BILLS,
  data
});

export const RESET_TOGGLES = 'RESET_TOGGLES';
export const resetToggles = () => ({
  type: RESET_TOGGLES
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
    .then(data => dispatch(getAccountsSuccess(data)))
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

export const getAccount = id => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/accounts/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => dispatch(getAccountSuccess(data)))
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
        console.log('create error');
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};

export const updateAccount = (account, id) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/accounts/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(account)
  })
    .then(res => normalizeResponseErrors(res))
    .then(() => {
      dispatch(getAccounts());
      dispatch(getAccount(id));
    })
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

export const payBill = (account, id) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/accounts/bills/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(account)
  })
    .then(res => normalizeResponseErrors(res))
    .then(() => dispatch(getAccount(id)))
    .then(() => dispatch(getAccounts()))
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

export const deleteAccount = id => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/accounts/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(() => dispatch(getAccountSuccess(null)))
    .then(() => dispatch(getAccounts()))
    .catch(err => {
      const { reason, message, location } = err;
      if (reason === 'ValidationError') {
        console.log('delete bill error');
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};
