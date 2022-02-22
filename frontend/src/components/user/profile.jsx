import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { Navigate } from "react-router";
import { findByUser } from "../../actions/story_actions";

const mSTP = state => ({
  currentUser: state.session.currentUser
})

const mDTP = dispatch => ({
  findUserStories: userID => dispatch(findByUser(userID))
})

const Profile = props => {
  const params = useParams()
  const {currentUser, findUserStories} = props
  useEffect(() => {
    findUserStories(params.userID)
  }, [])

  if (!currentUser.id) {
    return(
      <Navigate to='/' />
    )
  }
  
  return(
    <div>
      <h1>Hello, {currentUser.emoji}</h1>
    </div>
  )
}

export default connect(mSTP, mDTP)(Profile)