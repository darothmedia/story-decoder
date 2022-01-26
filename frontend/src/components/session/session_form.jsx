import React, { useState } from "react";
import { connect } from "react-redux";
import { submit } from "../../actions/session_actions";

const mSTP = state => ({
  signedIn: state.session.isSignedIn
})
const mDTP = dispatch => ({
  submitUser: user => dispatch(submit(user))
})

const SessionForm = props => {
  const [userData, setUserData] = useState({
    email: null
  })

  const handleChange = e => {
    e.preventDefault()
    setUserData({...userData, email: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.submitUser(userData)
  }

  return(
    <div className="wrapper" id="formwrapper">
      <form onSubmit={handleSubmit}>
        <label>Enter your email:
          <input type="text" onChange={handleChange} />
        </label>
      </form>
    </div>
  )
}

export default connect(mSTP, mDTP)(SessionForm)