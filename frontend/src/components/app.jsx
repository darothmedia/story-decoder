import { Route, Routes } from "react-router-dom"
import Splash from "./splash";
import CreateStory from "./story/create";
import JoinStory from "./story/join";
import NavBar from "./navbar";
import StoryInfoPage from "./story/story_info";
import SessionForm from "./session/session_form";
import StartStory from "./story/start";
import ContinueStory from "./story/continue";
import React, {useEffect} from "react";
import { checkCurrent } from "../actions/session_actions";
import { connect } from "react-redux";

const mSTP = state => ({})
const mDTP = dispatch => ({
  userCheck: () => dispatch(checkCurrent())
})

const App = props => {
  const {userCheck} = props
  useEffect(() => {userCheck()}, [userCheck])
  
  return(
    <div className="outerwrap">
      <NavBar />
      <div className="bodywrap">
        <Routes>
          <Route path='/' element={<Splash />} />
          <Route path='/create' element={<CreateStory />} />
          <Route path='/join' element={<JoinStory />} />
          <Route path='/story/:storyID' element={<StoryInfoPage />} />
          <Route path='/story/:storyID/start' element={<StartStory />} />
          <Route path='/story/:storyID/continue' element={<ContinueStory />} />
          <Route path='/login' element={<SessionForm />} />
        </Routes>
      </div>
    </div>
  )
}
export default connect(mSTP, mDTP)(App)