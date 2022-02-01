import React, {useEffect} from "react";
import StoryInfo from "../../util/story_info";
import { connect } from "react-redux";
import { useParams, Navigate } from "react-router";
import { findStory } from "../../actions/story_actions";
import ContinueStory from "./continue";
import StartStory from "./start";

const mSTP = (state) => ({
  currentStory: state.entities.stories.currentStory,
  signedIn: state.session.isSignedIn
})

const mDTP = dispatch => ({
  findStory: (storyID) => dispatch(findStory(storyID))
})

const StoryInfoPage = props => {
  const params = useParams()
  const {currentStory, findStory, signedIn} = props
  const {storyID} = params

  // if (!signedIn) {
  //   <Navigate to='/' />
  // }

  useEffect(() => {
    if (!currentStory) {
      findStory(storyID)
    }
  }, [currentStory, findStory, storyID])

  const handleClick = e => {
    if (e.target.id === 'start') {
      return(
        <Navigate to={`/`} />
      )
    }
  }

  if (!currentStory) {
    return null
  }

  return(
    <div className="wrapper" id='storyinfowrapper'>
        <div>
          {StoryInfo(currentStory)} 
          {currentStory.codedStory.length === 0 ? 
            <button onClick={handleClick} id='start'>Start</button>
            : <button onClick={handleClick} id='continue'>Continue</button>
          }
        </div>
    </div>
  )
}

export default connect(mSTP, mDTP)(StoryInfoPage)
