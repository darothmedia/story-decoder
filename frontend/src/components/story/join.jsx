import React, {useState} from "react";
import { Link } from "react-router-dom";
import { findStory } from "../../util/story_api_util";

const JoinStory = props => {
  const [storyID, setStoryID] = useState("")
  const handleSubmit = e => {
    e.preventDefault()
    findStory(storyID)
    console.log(`submitted: ${storyID}`)
  }

  const handleChange = e => {
    e.preventDefault()
    setStoryID(e.target.value)
  }

  return(
    <div className="wrapper" id="formwrapper">
      <form onSubmit={handleSubmit}>
        <label>Enter a Story Code:
          <input onChange={handleChange} value={storyID} type="text" />
        </label>
      </form>
    
      <Link to="/"><button>Home</button></Link>
    </div>
    
  )
}

export default JoinStory