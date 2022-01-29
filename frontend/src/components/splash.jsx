import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeStories } from "../actions/story_actions";
import { checkCurrent } from "../actions/session_actions";

const mSTP = state => ({})
const mDTP = dispatch => ({
  removeStories: () => dispatch(removeStories())
})


const Splash = props => {
  const {removeStories} = props
  useEffect(() => {
    removeStories()
  }, [removeStories])

  return(
    <div className="wrapper" id='splashwrapper'>
      <h1>Story Decoder</h1>
      <Link to='/create'><button>Create A Story</button></Link>
      <Link to='/join'><button>Continue A Story</button></Link>
    </div>
  )
}

export default connect(mSTP, mDTP)(Splash)