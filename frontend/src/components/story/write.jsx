import React, {useState, useEffect} from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import { emojiChoices, signUpEmojis } from "../../util/emoji_util";
import { editStory, findStory} from "../../actions/story_actions";
import { searchEmojis } from "../../actions/emoji_actions";

const mSTP = state => ({
  currentStory: state.entities.stories.currentStory,
  emojis: state.entities.emojis
})

const mDTP = dispatch => ({
  editStory: (storyData) => dispatch(editStory(storyData)),
  findStory: (storyID) => dispatch(findStory(storyID)),
  searchEmojis: (searchTerm) => dispatch(searchEmojis(searchTerm))
})

const WriteStory = props => {
  const params = useParams()
  const {editStory, currentStory, findStory, searchEmojis, emojis} = props
  const {storyID} = params
  const [codedStory, setCodedStory] = useState({
    storyID: storyID,
    emojis: [],
    selected: ""
  })
  const [searchTerm, setSearchTerm] = useState("")

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

  const changeSearch = e => {
    setSearchTerm(e.target.value)
  }

  const submitSearch = e => {
    e.preventDefault()
    searchEmojis(searchTerm)
  }

  if (!currentStory) {
    return null
  }

  return(
    <div className="wrapper" id='startwrapper'>
      {currentStory.codedStory.length === 0 ? <div>
        <h1>LETS BEGIN</h1>
        <p>Our story begins, like many other stories, once upon a time...</p>
      </div> : <div>
        <h1>LETS CONTINUE</h1>
        <p>Where did we leave off? Oh yes...</p>
      </div>}
      <h2>Search</h2>
      <form onSubmit={submitSearch}>
        <input type="text" onChange={changeSearch} />
      </form>
      <div id='codedstorywrapper'>
        {emojis[searchTerm] ? emojis[searchTerm].map((emoji, j) => (<p key={j}>{emoji.character}</p>)) : null}
      </div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="addemoji">What comes next?</label>
        <div id='emojiwrapper'>
          {emojiChoices(signUpEmojis, codedStory, handleChange)}
        </div>
        {codedStory.selected ? <button onClick={handleSubmit}>Submit</button> : null}
      </form>
      {currentStory.codedStory ?
        <div id='codedstorywrapper'>
          {currentStory.codedStory.map((emoji, i) => {
            return (
              <p key={i}>{emoji}</p>
            )
          })}
        </div> : null}
    </div>
  )
}

export default connect(mSTP, mDTP)(WriteStory)