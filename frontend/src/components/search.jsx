import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { searchEmojis, getCategories, searchByCategory } from "../actions/emoji_actions";

const mSTP = state => ({
  emojis: state.entities.emojis,
  categories: state.entities.categories
})

const mDTP = dispatch => ({
  searchEmojis: searchTerm => dispatch(searchEmojis(searchTerm)),
  getCategories: () => dispatch(getCategories()),
  searchByCategory: category => dispatch(searchByCategory(category))
})

const Search = props => {
  const {emojis, searchEmojis, getCategories, categories, searchByCategory} = props
  const [searchTerm, setSearchTerm] = useState("")
  const [lastSearched, setLastSearched] = useState("")

  useEffect(() => {
    getCategories()
  }, [getCategories])

  const changeSearch = e => {
    setSearchTerm(e.target.value)
  }

  const submitSearch = e => {
    e.preventDefault()
    setLastSearched(searchTerm)
    searchEmojis(searchTerm)
  }

  const changeCat = e => {
    e.preventDefault()
    setLastSearched(e.target.value)
    if (!emojis[e.target.value]) {
      searchByCategory(e.target.value)
    }
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

  const categoryFill = () => {
    if (categories.length > 0) {
      return(
        <select name="emojicat" id="emojicat" onChange={changeCat}>
          <option defaultValue="" >Select</option>
          {categories.map((category, i) => (
            <option value={category} key={i}>{category}</option>
          ))}
        </select>
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
      <h2>Or Search By Category</h2>
      <form>
        {categoryFill()}
      </form>
        {searchedEmojis()}
    </div>
  )
}

export default connect(mSTP, mDTP)(Search)