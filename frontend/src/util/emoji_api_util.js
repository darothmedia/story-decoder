import axios from "axios";
import { emojiKey } from "../config/keys";

export const searchEmojis = searchTerm => {
  return(
    axios.get(`https://emoji-api.com/emojis?search=${searchTerm}&access_key=${emojiKey}`)
  )
}

