import React, {useEffect} from "react";
import StoryInfo from "../../util/story_info";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { findStory } from "../../actions/story_actions";

const mSTP = (state, ownProps) => ({
  currentStory: state.session.currentStory
})

const mDTP = dispatch => ({
  findStory: (storyID) => dispatch(findStory(storyID))
})

const StoryInfoPage = props => {
  const params = useParams()
  const {currentStory, findStory} = props
  const {storyID} = params

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
