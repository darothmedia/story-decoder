import { combineReducers } from "redux"
import StoryReducer from "./story_reducer"
import EmojiReducer from "./emoji_reducer"
import CategoriesReducer from "./categories_reducer"

const EntitiesReducer = combineReducers({
  stories: StoryReducer,
  emojis: EmojiReducer,
  categories: CategoriesReducer
})

export default EntitiesReducer