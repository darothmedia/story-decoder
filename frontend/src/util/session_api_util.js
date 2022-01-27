import axios from 'axios';

export const setAuthToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const submit = (userData) => (
  axios.post('/api/users/submit', userData)
)

export const login = (user) => (
  axios.post('/api/users/login', user)
)