import { RECEIVE_CURRENT_USER, LOGOUT } from "../actions/session_actions";

const initialState = {
  isSignedIn: false,
  currentUser: {}
}

const SessionReducer = (state=initialState, action) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      return Object.assign({}, state, {
        isSignedIn: true, 
        currentUser: action.currentUser});
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default SessionReducer