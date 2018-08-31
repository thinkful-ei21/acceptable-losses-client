import {
  SHOW_CHANGE_PASSWORD_FORM,
  HIDE_CHANGE_PASSWORD_FORM,
  SHOW_EDIT_INFO_FORM,
  HIDE_EDIT_INFO_FORM,
  SHOW_CONFIRM_DELETE_USER,
  HIDE_CONFIRM_DELETE_USER
} from '../actions/profile';

const initialState = {
  error: null,
  toggleChangePasswordForm: false,
  toggleEditInfoForm: false,
  toggleConfirmDelete: false,
  image: null,
  uploading: false
};

export default function reducer(state = initialState, action) {
  if (action.type === SHOW_CHANGE_PASSWORD_FORM) {
    return {
      ...state,
      toggleChangePasswordForm: true
    };
  } else if (action.type === HIDE_CHANGE_PASSWORD_FORM) {
    return {
      ...state,
      toggleChangePasswordForm: false
    };
  } else if (action.type === SHOW_EDIT_INFO_FORM) {
    return {
      ...state,
      toggleEditInfoForm: true
    };
  } else if (action.type === HIDE_EDIT_INFO_FORM) {
    return {
      ...state,
      toggleEditInfoForm: false
    };
  } else if (action.type === SHOW_CONFIRM_DELETE_USER) {
    return {
      ...state,
      toggleConfirmDelete: true
    };
  } else if (action.type === HIDE_CONFIRM_DELETE_USER) {
    return {
      ...state,
      toggleConfirmDelete: false
    };
  }
  return state;
}
