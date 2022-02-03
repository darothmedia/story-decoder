import React, {useState, useEffect} from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { emojiChoices, signUpEmojis } from "../../util/emoji_util";
import { editStory, findStory} from "../../actions/story_actions";
import { Link } from "react-router-dom";

const mSTP = state => ({
  currentStory: state.entities.stories.currentStory
})

const mDTP = dispatch => ({
  editStory: (storyData) => dispatch(editStory(storyData)),
  findStory: (storyID) => dispatch(findStory(storyID))
})

const StartStory = props => {
  const params = useParams()
  const {editStory, currentStory, findStory} = props
  const {storyID} = params
  const [codedStory, setCodedStory] = useState({
    storyID: storyID,
    emojis: [],
    selected: ""
  })

  useEffect(() => {
    if (!currentStory) {
      findStory(storyID)
    }
  }, [currentStory, findStory, storyID])

  const handleChange = e => {
    setCodedStory({...codedStory, selected: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    editStory(codedStory)
  }

  if (!currentStory) {
    return null
  }

  return(
    <div className="wrapper" id='startwrapper'>
      <h1>LETS BEGIN</h1>
      <p>Our story begins, like many other stories, once upon a time...</p>
      <form action="">
        <label htmlFor="addemoji">What comes next?</label>
        <div id='emojiwrapper'>
          {emojiChoices(signUpEmojis, codedStory, handleChange)}
        </div>
        {codedStory.selected ? <button onClick={handleSubmit}>Submit</button> : null}
        <h4>The story so far:</h4>
        {currentStory.codedStory ? 
          <div id='codedstorywrapper'>
            {currentStory.codedStory.map((emoji, i) => {
              return(
                <p key={i}>{emoji}</p>
              )
            })}
          </div> : null}
      </form>
    </div>
  )
}

export default connect(mSTP, mDTP)(StartStory)