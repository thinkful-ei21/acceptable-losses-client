import { SubmissionError } from 'redux-form';
import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const GET_INCOMES_SUCCESS = 'GET_INCOMES_SUCCESS';
export const getIncomesSuccess = incomes => ({
  type: GET_INCOMES_SUCCESS,
  incomes
});

export const GET_INCOMES_ERROR = 'GET_INCOMES_ERROR';
export const getIncomesError = error => ({
  type: GET_INCOMES_ERROR,
  error
});

export const GET_INCOME_SUCCESS = 'GET_INCOME_SUCCESS';
export const getIncomeSuccess = income => ({
  type: GET_INCOME_SUCCESS,
  income
});

export const GET_INCOME_ERROR = 'GET_INCOME_ERROR';
export const getIncomeError = error => ({
  type: GET_INCOME_ERROR,
  error
});

export const SHOW_INCOME_FORM = 'SHOW_INCOME_FORM';
export const showIncomeForm = () => ({
  type: SHOW_INCOME_FORM
});

export const HIDE_INCOME_FORM = 'HIDE_INCOME_FORM';
export const hideIncomeForm = () => ({
  type: HIDE_INCOME_FORM
});

export const DELETE_INCOME_SUCCESS = 'DELETE_INCOME_SUCCESS';
export const deleteIncomeSuccess = () => ({
  type: DELETE_INCOME_SUCCESS
});

export const DELETE_INCOME_ERROR = 'DELETE_INCOME_ERROR';
export const deleteIncomeError = error => ({
  type: DELETE_INCOME_ERROR,
  error
});

export const SHOW_UPDATE_FORM = 'SHOW_UPDATE_FORM';
export const showUpdateForm = () => ({
  type: SHOW_UPDATE_FORM
});

export const HIDE_UPDATE_FORM = 'HIDE_UPDATE_FORM';
export const hideUpdateForm = () => ({
  type: HIDE_UPDATE_FORM
});

export const getIncomes = () => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/income`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => dispatch(getIncomesSuccess(data)))
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

export const getIncome = id => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/income/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => dispatch(getIncomeSuccess(data)))
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

export const createIncome = income => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/income`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(income)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(() => {
      dispatch(hideIncomeForm());
      dispatch(getIncomes());
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

export const updateIncome = (values, id) => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/income/${id}`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(values)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(() => {
      dispatch(hideUpdateForm());
      dispatch(getIncomes());
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

export const deleteIncome = incomeId => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/income/${incomeId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(() => dispatch(getIncomes()))
    .catch(err => dispatch(deleteIncomeError(err)));
};
