import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { Navigate } from "react-router";

const mSTP = state => ({
  currentUser: state.session.currentUser
})

const mDTP = dispatch => ({

})

const Profile = props => {
  const params = useParams()
  const {currentUser} = props
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