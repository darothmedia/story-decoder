import React, {useState} from "react";
import { Link } from "react-router-dom";

const CreateStory = props => {
  const [storyData, setStoryData] = useState({
    title: "",
    numWriters: 1
  })
  const [writers, setWriters] = useState([])

  const handleSubmit = e => {
    e.preventDefault()
    console.log(`submitted: ${storyData.title}`)
  }

  const handleChange = e => {
    e.preventDefault()
    let key

    if (e.target.type === "text") {key = "title"}
    else {key = "numWriters"}

    setStoryData({ ...storyData, [key]: e.target.value })
    console.log(storyData)
  }

  const writerFields = () => {
    let fields = []
    for(let i=0; i<storyData.numWriters - 1; i++){
      fields.push(
        React.createElement('input', { 
          id: 'writerfield', 
          key: `field${i}`
        }))
    }
    return fields
  }

  return(
    <div className="wrapper" id="formwrapper">
      <form>
        <h2>Story Info</h2>
        <label>Title:
          <input type="text" onChange={handleChange} />
        </label>
        <div id='writers'>
          <h2>Writers</h2>
          <label>Number of Writers:
            <input 
              type="number" 
              min='1' 
              max='10' 
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