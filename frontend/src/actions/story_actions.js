import * as StoryUtil from '../util/story_api_util'

export const RECEIVE_STORY = 'RECEIVE_STORY'
export const RECEIVE_STORIES = 'RECEIVE_STORIES'
export const RECEIVE_ERRORS = 'RECEIVE ERRORS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'
export const REMOVE_STORIES = 'REMOVE_STORIES'

export const receiveStory = story => ({
  type: RECEIVE_STORY,
  story
})

export const receiveStories = (stories, userID) => ({
  type: RECEIVE_STORIES,
  stories,
  userID
})

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
})

export const clearErrors = () => ({
  type: CLEAR_ERRORS
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
    dispatch(receiveStory(story.data))
  },errors => dispatch(receiveErrors(errors.response.data))
  );

export const editStory = storyData => dispatch => StoryUtil.editStory(storyData)
  .then(story => {
    dispatch(receiveStory(story.data))
  }, errors => dispatch(receiveErrors(errors.response.data))
  );

export const findByUser = userID => dispatch => StoryUtil.findUserStories(userID)
  .then(stories => {
    dispatch(receiveStories(stories.data, userID))
  }, errors => dispatch(receiveErrors(errors.response))
  );