import { GET_ACCOUNTS_SUCCESS, GET_ACCOUNTS_ERROR, SEARCH_ACCOUNTS, GET_ACCOUNT_SUCCESS,TOGGLE_FILTER } from '../actions/accounts';

const initialState = {
  accounts: [
    // 1: {
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
  filter: 'abc'
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
    
  }
  return state;
}
