import { GET_ACCOUNTS_SUCCESS, GET_ACCOUNTS_ERROR, SEARCH_ACCOUNTS, GET_ACCOUNT_SUCCESS,TOGGLE_FILTER,TOGGLE_EDIT } from '../actions/accounts';

const initialState = {
  accounts: [],
  account:null,
  error: null,
  searchTerm: '',
  filter: 'abc',
  editButtonToggle: false
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
  } else if (action.type === GET_ACCOUNTS_ERROR) {
    return {
      ...state,
      error: action.error
    };
  } else if (action.type === SEARCH_ACCOUNTS) {
    return Object.assign({}, state, {
      searchTerm: action.data.toLowerCase(),
      error: null
    });
  }else if (action.type === TOGGLE_FILTER) {
    return Object.assign({}, state, {
      filter: action.data,
      error: null
    }); 
  }else if (action.type === TOGGLE_EDIT) {
    console.log('edit is toggled')
    return Object.assign({}, state, {
      editButtonToggle: !state.editButtonToggle,
      error: null
    });
  }
  return state;
}
