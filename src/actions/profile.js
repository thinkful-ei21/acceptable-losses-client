import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const SHOW_CHANGE_PASSWORD_FORM = 'SHOW_CHANGE_PASSWORD_FORM';
export const showChangePasswordForm = () => ({
  type: SHOW_CHANGE_PASSWORD_FORM
});

export const HIDE_CHANGE_PASSWORD_FORM = 'HIDE_CHANGE_PASSWORD_FORM';
export const hideChangePasswordForm = () => ({
  type: HIDE_CHANGE_PASSWORD_FORM
});

export const SHOW_EDIT_INFO_FORM = 'SHOW_EDIT_INFO_FORM';
export const showEditInfoForm = () => ({
  type: SHOW_EDIT_INFO_FORM
});

export const HIDE_EDIT_INFO_FORM = 'HIDE_EDIT_INFO_FORM';
export const hideEditInfoForm = () => ({
  type: HIDE_EDIT_INFO_FORM
});

export const SHOW_CONFIRM_DELETE_USER = 'SHOW_CONFIRM_DELETE_USER';
export const showConfirmDeleteUser = () => ({
  type: SHOW_CONFIRM_DELETE_USER
});

export const HIDE_CONFIRM_DELETE_USER = 'HIDE_CONFIRM_DELETE_USER';
export const hideConfirmDeleteUser = () => ({
  type: HIDE_CONFIRM_DELETE_USER
});

export const UPLOADING_REQUEST = 'UPLOADING_REQUEST';
export const uploadingRequest = () => ({
  type: UPLOADING_REQUEST
});

export const UPLOADING_SUCCESS = 'UPLOADING_SUCCESS';
export const uploadingSuccess = image => ({
  type: UPLOADING_SUCCESS,
  image
});

export const changePassword = values => (dispatch, getState) => {
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/users/password`, {
    method: 'PUT',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(values)
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(() => dispatch(hideChangePasswordForm()))
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

export const uploadImage = value => dispatch => {
  dispatch(uploadingRequest());
  fetch(`${API_BASE_URL}/images/upload`, {
    method: 'POST',
    body: value
  })
    .then(res => res.json())
    .then(image => dispatch(uploadingSuccess(image)))
    .catch(err => console.error(err));
};
