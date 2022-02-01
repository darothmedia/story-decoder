import React, {useEffect} from "react";
import StoryInfo from "../../util/story_info";
import { connect } from "react-redux";
import { useParams, Navigate } from "react-router";
import { findStory } from "../../actions/story_actions";

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

  return(
    <div className="wrapper" id='storyinfowrapper'>
      {props.currentStory ? StoryInfo(props.currentStory) : null}
    </div>
  )
}

export default connect(mSTP, mDTP)(StoryInfoPage)
