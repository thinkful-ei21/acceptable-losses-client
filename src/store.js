import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { loadAuthToken } from './local-storage';
import authReducer from './reducers/auth';
import { setAuthToken, refreshAuthToken } from './actions/auth';
import accountReducer from './reducers/accounts';
import incomeReducer from './reducers/incomes';
import profileReducer from './reducers/profile';

const store = createStore(
  combineReducers({
    form: formReducer,
    auth: authReducer,
    accounts: accountReducer,
    incomes: incomeReducer,
    profile: profileReducer
  }),
  applyMiddleware(thunk)
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
  const token = authToken;
  store.dispatch(setAuthToken(token));
  store.dispatch(refreshAuthToken());
}

export default store;
