import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { Navigate } from "react-router";
import { findByUser } from "../../actions/story_actions";
import { Link } from "react-router-dom";

const mSTP = state => ({
  currentUser: state.session.currentUser,
  stories: state.entities.stories
})

const mDTP = dispatch => ({
  findUserStories: userID => dispatch(findByUser(userID))
})

const Profile = props => {
  const params = useParams()
  const {currentUser, findUserStories, stories} = props
  useEffect(() => {
    findUserStories(params.userID)
  }, [])

  if (!currentUser.id) {
    return(
      <Navigate to='/' />
    )
  }

  return(
    <div className="wrapper" id='profilewrapper'>
      <h1>Hello, {currentUser.emoji}</h1>
      <h2>Your Stories:</h2>
      {stories[params.userID] ? stories[params.userID].map((story, i) => (
        <Link to={`/story/${story.storyID}`} key={i}><button>{story.title}</button></Link>
      )) : null}
    </div>
  )
}

export default connect(mSTP, mDTP)(Profile)