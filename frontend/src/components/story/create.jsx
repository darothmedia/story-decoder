import React, {useState} from "react";
import { Link, Navigate } from "react-router-dom";
import { createStory, removeStories } from '../../actions/story_actions'
import { connect } from "react-redux";
import { createID } from "../../util/code_util";
import SessionForm from "../session/session_form";

const mSTP = state => ({
  signedIn: state.session.isSignedIn,
  currentUser: state.session.currentUser,
  currentStory: state.entities.stories.currentStory,
  stories: state.entities.stories
})

const mDTP = dispatch => ({
  submitStory: storyConfig => dispatch(createStory(storyConfig)),
  removeStories: () => dispatch(removeStories())
})

const CreateStory = props => {
  const [storyData, setStoryData] = useState({
    numWriters: 1,
    writers: []
  })

  const handleSubmit = e => {
    storyData.writers.push(props.currentUser.email)
    storyData.creator = props.currentUser.email
    storyData.storyID = createID(5)
    for (let i=0; i<storyData.numWriters - 1; i++){
      let idx = `writer${i}`
      if (storyData[idx]) {storyData.writers.push(storyData[idx])}
      delete storyData[idx]
    }
    props.submitStory(storyData)
  }

  const handleChange = e => {
    e.preventDefault()
    let value = e.target.value
    if (e.target.type === "number") {value = parseInt(e.target.value)}
    setStoryData({ ...storyData, [e.target.id]: value })
  }

  const writerFields = () => {
    let fields = []
    for(let i=0; i<storyData.numWriters - 1; i++){
      fields.push(
        React.createElement('input', { 
          id: `writer${i}`, 
          key: `writer${i}`,
          onChange: handleChange
        }))
    }
    return fields
  }

  if (!props.signedIn) {
    return(
      <SessionForm />
    )
  } 

  if (props.currentStory) {
    return(
      <Navigate to={`/story/${storyData.storyID}`} />
    )
  } 
  else {
    return(
      <div className="wrapper" id="formwrapper">
        <div>
        <form>
          <h1>Hello {props.currentUser.emoji}!</h1>
          <h2>Story Info</h2>
          <label>Title:
            <input type="text" id='title' onChange={handleChange} />
          </label>
          <div id='writerwrapper'>
            <h2>Writers</h2>
            <label>Number of Writers:
              <input 
                type="number" 
                min='1' 
                max='10'
                id ='numWriters' 
                onChange={handleChange} 
                value={storyData.numWriters}
              />
            </label>
              <p>Writers:</p> 
              {props.currentUser.email}
            <label>
              {writerFields()}
            </label>
          </div>
          <button onClick={handleSubmit}>Submit</button>
        </form>
        
        <br />
        Have a story code? <Link to="/join">Join a Story</Link>
        </div>
      </div>
    )
  }
}

export default connect(mSTP, mDTP)(CreateStory)