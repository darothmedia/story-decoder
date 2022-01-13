import axios from "axios"

export const fetchUser = (payload) => {
  return (
    axios.post('/api/users/user', payload)
  )
}