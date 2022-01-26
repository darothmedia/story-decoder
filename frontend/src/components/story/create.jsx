import React, {useState} from "react";
import { Link } from "react-router-dom";
import { createStory } from '../../actions/story_actions'
import { connect } from "react-redux";
import { createID } from "../../util/code_util";
import StoryInfo from "../../util/story_info";
import SessionForm from "../session/session_form";

const mSTP = state => ({})

const mDTP = dispatch => ({
  submitStory: storyConfig => dispatch(createStory(storyConfig))
})

const CreateStory = props => {
  const [storyData, setStoryData] = useState({
    title: "",
    numWriters: 1,
    writers: [],
    storyID: createID(5),
    currentUser: null,
    submitted: false,
    contact: false
  })

  const handleSubmit = e => {
    e.preventDefault()
    for (let i=0; i<storyData.numWriters - 1; i++){
      let idx = `writer${i}`
      if (storyData[idx]) {storyData.writers.push(storyData[idx])}
      delete storyData[idx]
    }
    props.submitStory(storyData)
    setStoryData({...storyData,
      submitted: true
      })
    console.log(storyData)
  }

  const handleChange = e => {
    e.preventDefault()
    if (e.target.type === "number") {
      setStoryData({ ...storyData, [e.target.id]: parseInt(e.target.value) })
    } else {
      setStoryData({ ...storyData, [e.target.id]: e.target.value })
    }
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

  if (!storyData.contact) {
    return(
      <SessionForm
        storyData={storyData}
        setStoryData={setStoryData} />
    )
  } else if (storyData.submitted) {
    return(
      StoryInfo(storyData)
    )
  } else {
    return(
      <div className="wrapper" id="formwrapper">
        <div>
        <form>
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
            <p>Creator: You</p>
            <label>
              {storyData.numWriters > 1 ? "Contributors:" : ""}
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