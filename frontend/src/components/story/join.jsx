import React, {useState} from "react";
import { Link, Navigate } from "react-router-dom";
import { findStory } from '../../actions/story_actions'
import { connect } from 'react-redux'

const mSTP = state => ({
  stories: state.entities.stories
})

const mDTP = dispatch => ({
  findStoryByID: storyID => dispatch(findStory(storyID))
})

const JoinStory = props => {
  const [storyID, setStoryID] = useState("")
  
  const handleSubmit = e => {
    e.preventDefault()
    props.findStoryByID(storyID)
  }

  const handleChange = e => {
    e.preventDefault()
    setStoryID(e.target.value)
  }

  if (props.stories[storyID]) {
    return(
      <Navigate to={`/story/${storyID}`} />
    )
  }

  return(
    <div className="wrapper" id="formwrapper">
      <form onSubmit={handleSubmit}>
        <label>Enter a Story Code:
          <input onChange={handleChange} value={storyID} type="text" />
        </label>
        <button onClick={handleSubmit}>Submit</button>
      </form>
      <br />
      Want to create a new story? <Link to="/create">Create a Story</Link>
    </div>
    
  )
}

// export default JoinStory
export default connect(mSTP, mDTP)(JoinStory)