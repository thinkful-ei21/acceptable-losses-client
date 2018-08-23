import { GET_ACCOUNTS_SUCCESS, GET_ACCOUNTS_ERROR, SEARCH_ACCOUNTS, GET_ACCOUNT_SUCCESS } from '../actions/accounts';

const initialState = {
  accounts: [
    // {
    //   id,
    //   userId,
    //   name,
    //   url,
    //   frequency,
    //   nextDue:{date,amount} === oldest bill not yet paid
    //   bills: [
    //     {
    //       id,
    //       paid,
    //       dueDate,
    //       amount,
    // onetime: false,
    //     }
    //   ]
    // }
  ],
  account: {},
  error: null,
  searchTerm: '',
  alphaSort: false,
  dateSort: false
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
  }
  return state;
}
