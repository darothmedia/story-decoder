import React, { useState, useEffect } from "react";
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
    existing: null,
    emojis: []
  })

  const handleChange = e => {
    // e.preventDefault()
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

  const printEmoji = code => String.fromCodePoint('0x' + code)

  const emojiList = [
    //Alien
    '1F47D',
    //Poop
    '1F4A9',
    //Crown 
    '1F451',
    //Sparkle Heart
    '1F496',
    //Dog
    '1F436',
    //Fox
    '1F98A',
    //Cat
    '1F431',
    //Unicorn
    '1F984',
    //Penguin
    '1F427',
    //Sun
    '1F31E',
    //Snowman
    '26C4'
  ]

  const emojiChoices = (emojiList) => {
    let choices = []

    while (userData.emojis.length < 5) {
      let emojiIDX = Math.floor(Math.random() * (emojiList.length - 1))
      if (!userData.emojis.includes(emojiList[emojiIDX])) {
        userData.emojis.push(emojiList[emojiIDX])
      }
    }

    return userData.emojis.map((choice, idx) => (
      <>
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
      </>
    ))
  }

  return(
    <div className="wrapper" id="formwrapper">
      <h1>Let's get started! {printEmoji('1F600')}</h1>
      <div id='buttonwrapper'>
        <button id='new' onClick={handleClick}>I'm new {printEmoji('1F64B')}</button>
        <button id='existing' onClick={handleClick}>I've been here before {printEmoji('1F481')}</button>
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
              {emojiChoices(emojiList)}
            </div>
            
            
          </div> : null}
        {userData.existing !== null ?
          <button onClick={handleSubmit}>Submit</button> : null}
      </form>
    </div>
  )
}

export default connect(mSTP, mDTP)(SessionForm)