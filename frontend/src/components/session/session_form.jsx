import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { login, signup } from "../../actions/session_actions";
import { signUpEmojis, printEmoji } from "../../util/emoji_util";

const mSTP = state => ({
  signedIn: state.session.isSignedIn,
  currentUser: state.session.currentUser
})
const mDTP = dispatch => ({
  submitUser: userData => dispatch(signup(userData)),
  loginUser: userData => dispatch(login(userData))
})

const SessionForm = props => {
  const [userData, setUserData] = useState({
    existing: null,
    emojis: []
  })

  const signUpRef = useRef()
  const loginRef = useRef()

  const handleChange = e => {
    setUserData({...userData, [e.target.className]: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    userData.existing ? props.loginUser(userData) : props.submitUser(userData)
  }

  const handleClick = e => {
    e.preventDefault()
    e.target.focus()
    if (e.target.id === 'new') {
      setUserData({...userData, existing: false})
      signUpRef.current.className = 'active'
      loginRef.current.className = 'inactive'
    } else if (e.target.id === 'existing') {
      setUserData({ ...userData, existing: true })
      loginRef.current.className = 'active'
      signUpRef.current.className = 'inactive'
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
        {userData.existing !== null ? <label>Enter your email:
          <input type="text" onChange={handleChange} className="email" />
        </label> : null}
        {userData.existing === false ? 
          <div>
            <label>What's your name?
              <input type="text" onChange={handleChange} className="name" />
            </label>
            <h3>Pick an Emoji that describes you: </h3>
            <div id='emojiwrapper'>
              {emojiChoices(signUpEmojis)}
            </div>
            
            
          </div> : null}
        {userData.existing !== null ?
          <button onClick={handleSubmit}>Submit</button> : null}
      </form>
    </div>
  )
}

export default connect(mSTP, mDTP)(SessionForm)