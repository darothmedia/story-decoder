import { RECEIVE_EMOJIS, CLEAR_EMOJIS } from "../actions/emoji_actions";

const EmojiReducer = (state = {}, action) => {
  Object.freeze(state)
  switch(action.type) {
    case RECEIVE_EMOJIS:
      return action.emojis
    case CLEAR_EMOJIS:
      return {}
    default:
      return state;
  }
}

export default EmojiReducer