import {
  GET_INCOMES_SUCCESS,
  GET_INCOMES_ERROR,
  GET_INCOME_SUCCESS,
  GET_INCOME_ERROR,
  SHOW_INCOME_FORM,
  HIDE_INCOME_FORM,
  SHOW_UPDATE_FORM,
  HIDE_UPDATE_FORM
} from '../actions/incomes';

const initialState = {
  incomes: [],
  income: {},
  error: null,
  toggleForm: false,
  toggleUpdateForm: false
};

export default function reducer(state = initialState, action) {
  if (action.type === GET_INCOMES_SUCCESS) {
    return {
      ...state,
      incomes: action.incomes,
      error: null
    };
  } else if (action.type === GET_INCOMES_ERROR) {
    return {
      ...state,
      error: action.error
    };
  } else if (action.type === GET_INCOME_SUCCESS) {
    return {
      ...state,
      income: action.income,
      error: null
    };
  } else if (action.type === GET_INCOME_ERROR) {
    return {
      ...state,
      error: action.error
    };
  } else if (action.type === SHOW_INCOME_FORM) {
    return {
      ...state,
      toggleForm: true
    };
  } else if (action.type === HIDE_INCOME_FORM) {
    return {
      ...state,
      toggleForm: false
    };
  } else if (action.type === SHOW_UPDATE_FORM) {
    return {
      ...state,
      toggleUpdateForm: true
    };
  } else if (action.type === HIDE_UPDATE_FORM) {
    return {
      ...state,
      toggleUpdateForm: false
    };
  }
  return state;
}
