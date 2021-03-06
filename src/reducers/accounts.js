import {
  GET_ACCOUNTS_SUCCESS,
  GET_ACCOUNTS_ERROR,
  SEARCH_ACCOUNTS,
  GET_ACCOUNT_SUCCESS,
  TOGGLE_FILTER,
  TOGGLE_EDIT,
  TOGGLE_DELETE,
  TOGGLE_PAY,
  GET_DAYS_BILLS,
  RESET_TOGGLES,
  CLEAR_ACCOUNT,
  TOGGLE_WEB
} from '../actions/accounts';

const initialState = {
  accounts: [],
  account: null,
  error: null,
  searchTerm: '',
  filter: 'abc',
  editButtonToggle: false,
  deleteButtonToggle: false,
  payButtonToggle: null,
  toggleWeb: null,
  daysBills: null,
  selectedDay: null
};

export default function reducer(state = initialState, action) {
  if (action.type === GET_ACCOUNTS_SUCCESS) {
    return {
      ...state,
      accounts: action.accounts,
      error: null
    };
  } else if (action.type === GET_ACCOUNT_SUCCESS) {
    return {
      ...state,
      account: action.account,
      error: null
    };
  } else if (action.type === CLEAR_ACCOUNT) {
    return {
      ...state,
      account: null
    };
  } else if (action.type === GET_ACCOUNTS_ERROR) {
    return {
      ...state,
      error: action.error
    };
  } else if (action.type === SEARCH_ACCOUNTS) {
    return {
      ...state,
      searchTerm: action.data.toLowerCase(),
      error: null
    };
  } else if (action.type === TOGGLE_FILTER) {
    return {
      ...state,
      filter: action.data,
      error: null
    };
  } else if (action.type === TOGGLE_EDIT) {
    return {
      ...state,
      editButtonToggle: !state.editButtonToggle,
      error: null
    };
  } else if (action.type === TOGGLE_WEB) {
    return {
      ...state,
      toggleWeb: action.data,
      error: null
    };
  } else if (action.type === TOGGLE_DELETE) {
    return {
      ...state,
      deleteButtonToggle: !state.deleteButtonToggle,
      error: null
    };
  } else if (action.type === TOGGLE_PAY) {
    return {
      ...state,
      payButtonToggle: action.data,
      error: null
    };
  } else if (action.type === RESET_TOGGLES) {
    return {
      ...state,
      payButtonToggle: null,
      editButtonToggle: false,
      deleteButtonToggle: false,
      toggleWeb: null,
      selectedDay:null,
      error: null
    };
  } else if (action.type === GET_DAYS_BILLS) {
    return {
      ...state,
      selectedDay: action.data,
      // daysBills: state.accounts.filter(account => {
      //   if (account.nextDue && moment(account.nextDue.dueDate).format('YYYY-MM-DD') === action.data) {
      //     return account.nextDue;
      //   }
      //   return '';
      // }),
      error: null
    };
  }

  return state;
}
