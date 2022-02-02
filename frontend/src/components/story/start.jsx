import React, {useState} from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { emojiChoices, signUpEmojis } from "../../util/emoji_util";
import { editStory } from "../../actions/story_actions";

const mSTP = state => ({

})

const mDTP = dispatch => ({
  editStory: (storyData) => dispatch(editStory(storyData))
})

const StartStory = props => {
  const params = useParams()
  const {editStory} = props
  const {storyID} = params
  const [codedStory, setCodedStory] = useState({
    storyID: storyID,
    emojis: [],
    selected: ""
  })

  const handleChange = e => {
    setCodedStory({...codedStory, selected: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(codedStory)
    editStory(codedStory)
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
      </form>
    </div>
  )
}

export default connect(mSTP, mDTP)(StartStory)