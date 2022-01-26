import React, { useState } from "react";
import { connect } from "react-redux";
import { login } from "../../actions/session_actions";

const mSTP = state => ({
  signedIn: state.session.isSignedIn,
  currentUser: state.session.currentUser
})
const mDTP = dispatch => ({
  submitUser: userData => dispatch(login(userData))
})

const SessionForm = props => {
  const [userData, setUserData] = useState({
    email: null
  })

  const handleChange = e => {
    e.preventDefault()
    setUserData({...userData, [e.target.id]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.submitUser(userData)
    console.log(userData)
  }

  return(
    <div className="wrapper" id="formwrapper">
      <form onSubmit={handleSubmit}>
        <label>Enter your email:
          <input type="text" onChange={handleChange} id="email" />
        </label>
        <label>What's your name?
          <input type="text" onChange={handleChange} id="name" />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default connect(mSTP, mDTP)(SessionForm)