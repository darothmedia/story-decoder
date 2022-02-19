import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/session_actions";

const mSTP = state => ({
  signedIn: state.session.isSignedIn,
  currentUser: state.session.currentUser
})
const mDTP = dispatch => ({
  logout: () => dispatch(logout())
})

const NavBar = props => {
  const signedInLinks = () => {
    let nav = []
    if (props.signedIn) {
      nav.push(
        <button key='userEmoji' id='emojibutton'>{props.currentUser.emoji}</button>,
        <button onClick={props.logout} key='logout'>Log Out</button>
      )
    } else {
      nav.push(
        <Link to='/login' key='login'><button >Sign Up / Log In</button></Link>
      )
    };
    return nav
  }

  return(
    <div id="navbarwrapper">
      <section id='leftlinks'>
          <Link to="/"><button>Home</button></Link>
          <Link to='/search'><button>Search</button></Link>
      </section>
      <section id='rightlinks'>
          {signedInLinks()}
      </section>
    </div>
  )
}

export default connect(mSTP, mDTP)(NavBar)