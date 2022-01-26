import * as SessionAPIUtil from '../util/session_api_util'
import jwt_decode from 'jwt-decode'

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER'
export const LOGOUT = 'LOGOUT'
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS'

export const logoutUser = () => ({
  type: LOGOUT
});

export const receiveCurrentUser = currentUser => ({
  type: RECEIVE_CURRENT_USER,
  currentUser
});

export const receiveErrors = errors => ({
  type: RECEIVE_SESSION_ERRORS,
  errors
})

export const logout = () => dispatch => {
  localStorage.removeItem('jwtToken')
  SessionAPIUtil.setAuthToken(false)
  dispatch(logoutUser())
};

export const submit = user => dispatch => {
  SessionAPIUtil.submit(user)
    .then(res => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      SessionAPIUtil.setAuthToken(token);
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded))
    })
    .catch(err => {
      dispatch(receiveErrors(err.message))
    })
}