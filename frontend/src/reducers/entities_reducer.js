import { combineReducers } from "redux"
import StoryReducer from "./story_reducer"

const EntitiesReducer = combineReducers({
  stories: StoryReducer
})

export default EntitiesReducer