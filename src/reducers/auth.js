import {
  SET_AUTH_TOKEN,
  CLEAR_AUTH,
  AUTH_REQUEST,
  AUTH_SUCCESS,
  AUTH_ERROR,
  UPDATE_USER,
  UPLOADING_REQUEST,
  UPLOADING_SUCCESS,
  DELETE_IMAGE_SUCCESS
} from '../actions/auth';

const initialState = {
  authToken: null, // authToken !== null does not mean it has been validated
  currentUser: null,
  loading: false,
  uploading: false,
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === SET_AUTH_TOKEN) {
    return {
      ...state,
      authToken: action.authToken
    };
  } else if (action.type === CLEAR_AUTH) {
    return {
      ...state,
      authToken: null,
      currentUser: null
    };
  } else if (action.type === AUTH_REQUEST) {
    return {
      ...state,
      loading: true,
      error: null
    };
  } else if (action.type === AUTH_SUCCESS) {
    return {
      ...state,
      loading: false,
      currentUser: action.currentUser
    };
  } else if (action.type === AUTH_ERROR) {
    return {
      ...state,
      loading: false,
      error: action.error
    };
  } else if (action.type === UPDATE_USER) {
    return {
      ...state,
      currentUser: action.user
    };
  } else if (action.type === UPLOADING_REQUEST) {
    return {
      ...state,
      uploading: true
    };
  } else if (action.type === UPLOADING_SUCCESS) {
    return {
      ...state,
      uploading: false,
      currentUser: action.user
    };
  } else if (action.type === DELETE_IMAGE_SUCCESS) {
    return {
      ...state,
      currentUser: action.user
    };
  }
  return state;
}
