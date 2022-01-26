import React, { useState } from "react";
import { connect } from "react-redux";

const mSTP = state => ({})
const mDTP = dispatch => ({})

const SessionForm = props => {
  const [contact, setContact] = useState("")

  const handleChange = e => {
    setContact(e.target.value)
  }

  const handleSubmit = e => {
    props.setStoryData({...props.storyData, 
      creator: contact,
      contact: true
    })
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