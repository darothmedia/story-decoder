import { combineReducers } from "redux"
import StoryReducer from "./story_reducer"
import EmojiReducer from "./emoji_reducer"

const EntitiesReducer = combineReducers({
  stories: StoryReducer,
  emojis: EmojiReducer
})

export default EntitiesReducer