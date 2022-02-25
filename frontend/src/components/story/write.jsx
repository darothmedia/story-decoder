import React, {useState, useEffect} from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { emojiChoices, signUpEmojis } from "../../util/emoji_util";
import { editStory, findStory} from "../../actions/story_actions";
import { searchEmojis } from "../../actions/emoji_actions";

const mSTP = state => ({
  stories: state.entities.stories,
  emojis: state.entities.emojis
})

const mDTP = dispatch => ({
  editStory: (storyData) => dispatch(editStory(storyData)),
  findStory: (storyID) => dispatch(findStory(storyID)),
  searchEmojis: (searchTerm) => dispatch(searchEmojis(searchTerm))
})

const WriteStory = props => {
  const {editStory, findStory, stories} = props
  const {storyID} = useParams()
  const [codedStory, setCodedStory] = useState({
    storyID: storyID,
    emojis: [],
    selected: ""
  })

  useEffect(() => {
    if (!stories[storyID]) {
      findStory(storyID)
    }
  }, [stories, findStory, storyID])

  const handleChange = e => {
    setCodedStory({...codedStory, selected: e.target.value})
  }

  const handleSubmit = e => {
    e.preventDefault()
    editStory(codedStory)
  }

  if (!stories[storyID]) {
    return null
  }

  return(
    <div className="wrapper" id='startwrapper'>
      {stories[storyID].codedStory.length === 0 ? <div>
        <h1>LETS BEGIN</h1>
        <p>Our story begins, like many other stories, once upon a time...</p>
      </div> : <div>
        <h1>LETS CONTINUE</h1>
        <p>Where did we leave off? Oh yes...</p>
      </div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="addemoji">What comes next?</label>
        <div id='emojiwrapper'>
          {emojiChoices(signUpEmojis, codedStory, handleChange)}
        </div>
        {codedStory.selected ? <button onClick={handleSubmit}>Submit</button> : null}
      </form>
      {stories[storyID].codedStory ?
        <div id='codedstorywrapper'>
          {stories[storyID].codedStory.map((emoji, i) => {
            return (
              <p key={i}>{emoji}</p>
            )
          })}
        </div> : null}
    </div>
  )
}

export default connect(mSTP, mDTP)(WriteStory)