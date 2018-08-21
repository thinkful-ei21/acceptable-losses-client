import { GET_ACCOUNTS_SUCCESS, GET_ACCOUNTS_ERROR } from '../actions/accounts';

const initialState = {
  accounts: [],
  error: null
};

export default function reducer(state = initialState, action) {
  if (action.type === GET_ACCOUNTS_SUCCESS) {
    return {
      ...state,
      accounts: action.accounts,
      error: null
    };
  } else if (action.type === GET_ACCOUNTS_ERROR) {
    return {
      ...state,
      error: action.error
    };
  }
  return state;
}
