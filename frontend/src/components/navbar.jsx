import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/session_actions";

const mSTP = state => ({
  signedIn: state.session.isSignedIn
})
const mDTP = dispatch => ({
  logout: () => dispatch(logout())
})

const NavBar = props => {
  return(
    <div>
      <Link to="/"><button>Home</button></Link>
      {props.signedIn ? <button onClick={props.logout}>Logout</button> : null}
    </div>
  )
}

export default connect(mSTP, mDTP)(NavBar)