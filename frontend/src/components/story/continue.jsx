import React from "react";
import { connect } from "react-redux";

const mSTP = state => ({

})

const mDTP = dispatch => ({

})

const ContinueStory = props => {
  const handleSubmit = e => {
    e.preventDefault()
  }
  return(
    <div className="wrapper" id='continuewrapper'>
      LETS CONTINUE
      <p>Where did we leave off? Oh yes...</p>
      <form onSubmit={handleSubmit}>

      </form>
    </div>
  )
}

export default connect(mSTP, mDTP)(ContinueStory)