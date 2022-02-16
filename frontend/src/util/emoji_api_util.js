import axios from "axios";
import { emojiKey } from "../../../config/keys";

export const searchEmojis = searchTerm => (
  axios.get(`https://emoji-api.com/emojis?search=${searchTerm}&access_key=${emojiKey}`)
)

