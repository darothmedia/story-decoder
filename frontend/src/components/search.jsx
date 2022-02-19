import React, {useState} from "react";
import { connect } from "react-redux";
import { searchEmojis } from "../actions/emoji_actions";

const mSTP = state => ({
  emojis: state.entities.emojis
})

const mDTP = dispatch => ({
  searchEmojis: searchTerm => dispatch(searchEmojis(searchTerm))
})

const Search = props => {
  const {emojis, searchEmojis} = props
  const [searchTerm, setSearchTerm] = useState("")
  const [lastSearched, setLastSearched] = useState("")

  const changeSearch = e => {
    setSearchTerm(e.target.value)
  }

  const submitSearch = e => {
    e.preventDefault()
    setLastSearched(searchTerm)
    searchEmojis(searchTerm)
  }

  const searchedEmojis = () => {
    if (emojis[lastSearched]) {
      return(
        <div id='codedstorywrapper'>
          {Array.isArray(emojis[lastSearched]) ? 
        emojis[lastSearched].map((emoji, j) => (<p key={j}>{emoji.character}</p>))
          : (<p>No emojis found</p>)}
        </div>
      )
    }
  }

  return(
    <div className='wrapper' id='searchwrapper'>
      <h2>Search for Emojis</h2>
      <form onSubmit={submitSearch}>
        <input type="text" onChange={changeSearch} />
        <button onClick={submitSearch}>Submit</button>
      </form>
        {searchedEmojis()}
    </div>
  )
}

export default connect(mSTP, mDTP)(Search)