import * as StoryUtil from '../util/story_api_util'

export const RECEIVE_STORY = 'RECEIVE_STORY'
export const RECEIVE_ERRORS = 'RECEIVE ERRORS'
export const REMOVE_STORIES = 'REMOVE_STORIES'

export const receiveStory = story => ({
  type: RECEIVE_STORY,
  story
})

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
})

export const removeStories = () => ({
  type: REMOVE_STORIES
})

export const createStory = story => dispatch => StoryUtil.createStory(story)
  .then(story => dispatch(receiveStory(story.data)), 
    errors => dispatch(receiveErrors(errors))
  );

export const findStory = storyID => dispatch => StoryUtil.findStory(storyID)
  .then(story => {
    dispatch(receiveStory(story.data[0]))
  },errors => dispatch(receiveErrors(errors))
  );