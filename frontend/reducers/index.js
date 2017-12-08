import { combineReducers } from 'redux';

function loggedInReducer(state = false, action) {
  switch (action.type) {
    case 'LOGIN':
      return true;
    case 'LOGOUT':
      return false;
    default:
      return state;
  }
}

export default combineReducers({ loggedIn: loggedInReducer });
