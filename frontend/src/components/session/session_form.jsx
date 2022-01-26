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
    email: null,
    existing: null
  })

  const handleChange = e => {
    e.preventDefault()
    setUserData({...userData, [e.target.className]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.submitUser(userData)
    console.log(userData)
  }

  const handleClick = e => {
    e.preventDefault()
    if (e.target.id === 'new') {
      setUserData({...userData, existing: false})
    } else if (e.target.id === 'existing') {
      setUserData({ ...userData, existing: true })
    }
  }

  return(
    <div className="wrapper" id="formwrapper">
      <h1>Let's get started!</h1>
      <div id='buttonwrapper'>
        <button id='new' onClick={handleClick}>I'm new</button>
        <button id='existing' onClick={handleClick}>I've been here before</button>
      </div>
      <form onSubmit={handleSubmit}>
        {userData.existing !== null ? <label>Enter your email:
          <input type="text" onChange={handleChange} className="email" />
        </label> : null}
        {userData.existing === false ? 
          <div>
            <label>What's your name?
              <input type="text" onChange={handleChange} className="name" />
            </label>
            <label>Pick an Emoji that describes you:
              <input type="radio" onChange={handleChange} className="emoji" id=":)" value=":)" />
            </label>
          </div> : null}
        {userData.existing !== null ?
          <button onClick={handleSubmit}>Submit</button> : null}
      </form>
    </div>
  )
}

export default connect(mSTP, mDTP)(SessionForm)