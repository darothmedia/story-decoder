import * as EmojiUtil from '../util/emoji_api_util'

export const RECEIVE_EMOJIS = 'RECEIVE_EMOJIS'
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS'
export const CLEAR_EMOJIS = 'CLEAR_EMOJIS'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'

export const receiveEmojis = (emojis, searchTerm) => ({
  type: RECEIVE_EMOJIS,
  emojis,
  searchTerm
})

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors
})

export const clearEmojis = () => ({
  type: CLEAR_EMOJIS
})

export const clearErrors = () => ({
  type: CLEAR_ERRORS
})

export const searchEmojis = searchTerm => dispatch => 
  EmojiUtil.searchEmojis(searchTerm)
    .then((emojis) => dispatch(receiveEmojis(emojis.data, searchTerm)),
      errors => dispatch(receiveErrors(errors))
  );

