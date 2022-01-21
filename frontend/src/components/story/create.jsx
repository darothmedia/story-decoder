import React, {useState} from "react";
import { Link } from "react-router-dom";
// import { createStory } from '../../actions/story_actions'

const CreateStory = props => {
  const [storyData, setStoryData] = useState({
    title: "",
    numWriters: 1,
    writers: []
  })

  const handleSubmit = e => {
    e.preventDefault()
    for (let i=0; i<storyData.numWriters - 1; i++){
      let idx = `writer${i}`
      storyData.writers.push(storyData[idx])
      delete storyData[idx]
    }
    console.log(storyData)
  }

  const handleChange = e => {
    e.preventDefault()
    setStoryData({ ...storyData, [e.target.id]: e.target.value })
    // console.log(storyData)
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

  return(
    <div className="wrapper" id="formwrapper">
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
              id = 'numWriters' 
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
      <Link to="/"><button>Home</button></Link>
    </div>
  )
}

export default CreateStory