import React, {useState} from "react";
import { Link } from "react-router-dom";

const CreateStory = props => {
  const [storyData, setStoryData] = useState({
    title: "",
    writers: [],
    numWriters: 1
  })

  const handleSubmit = e => {
    e.preventDefault()
    console.log(`submitted: ${storyData.title}`)
  }

  const titleChange = (e) => {
    e.preventDefault()
    setStoryData({...storyData, title: e.target.value})
    console.log(storyData.title)
  }

  const numChange = (e) => {
    e.preventDefault()
    setStoryData({ ...storyData, numWriters: e.target.value })
    console.log(storyData.numWriters)
  }

  // const addWriter = e => {
  //   e.preventDefault()
  //   // setStoryData({...storyData, writers})
  // }

  const writerFields = () => {
    let fields = []
    for(let i=0;i<storyData.numWriters;i++){
      fields.push(React.createElement('input', { id: 'writerfield', key: `field${i}`}))
    }
    return fields
  }

  return(
    <div className="wrapper" id="createwrapper">
      <form>
        <label>Start with a title for your story:
          <input type="text" onChange={titleChange} />
        </label>
        <div id='writers'>
          <label>Number of Writers:
            <input type="number" min='1' max='10' onChange={numChange} value={storyData.numWriters}/>
          </label>
          <label>
            Writers:
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