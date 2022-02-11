import React, {useEffect} from "react";
import StoryInfo from "../../util/story_info";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { findStory } from "../../actions/story_actions";
import { Link } from "react-router-dom";

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

  if (!currentStory) {
    return null
  }

  return(
    <div className="wrapper" id='storyinfowrapper'>
        <div>
          {StoryInfo(currentStory)} 
           
          <Link to={`/story/${currentStory.storyID}/write`}>
            {currentStory.codedStory.length === 0 ?
              <button id='start'>Start</button> : 
              <button id='continue'>Continue</button> }
            </Link>
        </div>
    </div>
  )
}

export default connect(mSTP, mDTP)(StoryInfoPage)
