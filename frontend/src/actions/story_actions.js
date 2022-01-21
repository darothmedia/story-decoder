import * as StoryUtil from '../util/story_api_util'

export const RECEIVE_STORY = 'RECEIVE_STORY'
export const RECEIVE_ERRORS = 'RECEIVE ERRORS'

export const receiveStory = story => {
  type: RECEIVE_STORY,
  story
}

export const receiveErrors = errors => {
  type: RECEIVE_ERRORS,
  errors
}

export const createStory = story => dispatch => StoryUtil.createStory(story)
  .then(payload => dispatch(receiveStory(payload.data)), 
    errors => dispatch(receiveErrors(errors))
  );

export const findStory = storyID => dispatch => StoryUtil.findStory(storyID)
  .then(payload => dispatch(receiveStory(payload.data)),
    errors => dispatch(receiveErrors(errors))
  );