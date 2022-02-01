import { RECEIVE_STORY, REMOVE_STORIES } from "../actions/story_actions";

const StoryReducer = (state = {}, action) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_STORY:
      return Object.assign({}, state, {
        [action.story.storyID]: action.story,
        currentStory: action.story
      })
    case REMOVE_STORIES:
      return {}
    default:
      return state;
  }
}

export default StoryReducer