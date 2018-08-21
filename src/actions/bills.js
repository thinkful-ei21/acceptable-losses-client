import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';
import {SubmissionError} from 'redux-form';


export const createBill = bill => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  console.log(bill);
  return fetch(`${API_BASE_URL}/bills`, {
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
      const {reason,message,location} = err;
      if (reason === 'ValidationError') {
        console.log('create bill error')
        return Promise.reject(
          new SubmissionError({
            [location]: message
          })
        );
      }
    });
};