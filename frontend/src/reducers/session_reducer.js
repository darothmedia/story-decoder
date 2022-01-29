import { RECEIVE_CURRENT_USER, LOGOUT } from "../actions/session_actions";
import { RECEIVE_STORY, REMOVE_STORIES } from "../actions/story_actions";

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
    case RECEIVE_STORY:
      return Object.assign({}, state, {currentStory: action.story})
    case REMOVE_STORIES:
      return Object.assign({}, state, {currentStory: {}})
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default SessionReducer