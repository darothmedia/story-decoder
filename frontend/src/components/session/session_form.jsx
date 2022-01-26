import React, { useState } from "react";
import { connect } from "react-redux";
import { submit } from "../../actions/session_actions";

const mSTP = state => ({})
const mDTP = dispatch => ({
  submitUser: user => dispatch(submit(user))
})

const SessionForm = props => {
  const [contact, setContact] = useState("")

  const handleChange = e => {
    e.preventDefault()
    setContact(e.target.value)
  }

  const handleSubmit = e => {
    e.preventDefault()
    props.submitUser(contact)
    props.setStoryData({...props.storyData, 
      currentUser: contact,
      contact: true
    })
    console.log(props.storyData)
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