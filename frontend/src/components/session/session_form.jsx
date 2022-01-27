import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { login, signup } from "../../actions/session_actions";
import { signUpEmojis, printEmoji } from "../../util/emoji_util";
import { clearErrors } from "../../actions/session_actions";

const mSTP = state => ({
  signedIn: state.session.isSignedIn,
  currentUser: state.session.currentUser,
  errors: state.errors.session
})
const mDTP = dispatch => ({
  submitUser: userData => dispatch(signup(userData)),
  loginUser: userData => dispatch(login(userData)),
  clearErrors: () => dispatch(clearErrors())
})

const SessionForm = props => {
  const [userData, setUserData] = useState({
    existing: null,
    emojis: []
  })

  const signUpRef = useRef()
  const loginRef = useRef()
  const emailField = useRef()

  const signUpButton = () => {
    if (props.errors.email === 'No account found for this email') {
      return <button id='new' onClick={handleClick}>Sign Up</button>
    } else if (userData.existing === true) {
      return <button onClick={handleSubmit}>Submit</button>
    }
  }

  const handleChange = e => {
    setUserData({...userData, [e.target.className]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    userData.existing ? props.loginUser(userData) : props.submitUser(userData)
  }

  const handleClick = e => {
    e.preventDefault()
    props.clearErrors()
    if (e.target.id === 'new') {
      setUserData({...userData, existing: false})
      signUpRef.current.className = 'active'
      loginRef.current.className = 'inactive'
    } else if (e.target.id === 'existing') {
      setUserData({ ...userData, existing: true })
      loginRef.current.className = 'active'
      signUpRef.current.className = 'inactive'
    }
    if (emailField.current) {
      emailField.current.focus()
    }
    
  }

  const emojiChoices = (emojiList) => {
    while (userData.emojis.length < 5) {
      let emojiIDX = Math.floor(Math.random() * (emojiList.length - 1))
      if (!userData.emojis.includes(emojiList[emojiIDX])) {
        userData.emojis.push(emojiList[emojiIDX])
      }
    }

    return userData.emojis.map((choice, idx) => (
      <div key={idx}>
        <input
          type="radio"
          onChange={handleChange}
          className="emoji"
          id={choice}
          value={printEmoji(choice)}
          name="emoji" />
        <label htmlFor={choice} key={idx} id='emojilabel'>
          {printEmoji(choice)}
        </label>
      </div>
    ))
  }

  return(
    <div className="wrapper" id="formwrapper">
      <h1>Let's get started! {printEmoji('1F600')}</h1>
      <div id='buttonwrapper'>
        <button id='new' onClick={handleClick} ref={signUpRef}>I'm new {printEmoji('1F64B')}</button>
        <button id='existing' onClick={handleClick} ref={loginRef}>I've been here before {printEmoji('1F481')}</button>
      </div>
      <form onSubmit={handleSubmit}>
        {userData.existing !== null ? 
          <div>
            <label>What's your email address?
              <input type="text" onChange={handleChange} className="email" ref={emailField} autoFocus={true} />
            </label>
            <p className="errors">{props.errors.email}</p>
            {signUpButton()} 
          </div> : null}
        {userData.existing === false ? 
          <div>
            <label>Pick an emoji that describes you: </label>
            <div id='emojiwrapper'>
              {emojiChoices(signUpEmojis)}
            </div>
            <button onClick={handleSubmit}>Submit</button>
          </div> : null}
      </form>
    </div>
  )
}

export default connect(mSTP, mDTP)(SessionForm)