import { combineReducers } from "redux";
import SessionErrorsReducer from "./session_errors_reducer";
import StoryErrorsReducer from "./story_errors_reducer";
import EmojiErrorsReducer from "./emoji_errors_reducer";

const ErrorsReducer = combineReducers({
  session: SessionErrorsReducer,
  story: StoryErrorsReducer,
  emojis: EmojiErrorsReducer
})

export default ErrorsReducer