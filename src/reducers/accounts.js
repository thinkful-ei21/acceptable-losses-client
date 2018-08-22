import { GET_ACCOUNTS_SUCCESS, GET_ACCOUNTS_ERROR, SEARCH_ACCOUNTS } from '../actions/accounts';

const initialState = {
  accounts:[
    // {
    //   id,
    //   userId,
    //   name,
    //   url,
    //   bills: [
    //     {
    //       id,
    //       paid,
    //       frequency,
    //       dueDate,
    //       amount,
    //     }
    //   ]
    // }
  ],
  error: null,
  searchTerm:''
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
  } else if (action.type === SEARCH_ACCOUNTS) {
    console.log('searchterm set to '+ action.data)
    return Object.assign({}, state, {
        searchTerm: action.data.toLowerCase(),
        error: null
    });
}  
  return state;
}
