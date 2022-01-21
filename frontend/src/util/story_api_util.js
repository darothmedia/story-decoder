import axios from "axios";

export const createStory = storyData => (
  axios.post('/api/stories/create', storyData)
)

export const findStory = storyID => (
  axios.get(`http://localhost:7070/api/stories/${storyID}`)
)