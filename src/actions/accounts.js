import { SubmissionError } from 'redux-form';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const GET_ACCOUNTS_SUCCESS = 'GET_ACCOUNTS_SUCCESS';
export const getAccountsSuccess = accounts => ({
  type: GET_ACCOUNTS_SUCCESS,
  accounts
});

export const GET_ACCOUNTS_ERROR = 'GET_ACCOUNTS_ERROR';
export const getAccountsError = error => ({
  type: GET_ACCOUNTS_ERROR,
  error
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
      console.log(data);
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
