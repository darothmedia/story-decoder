import React, {useEffect} from "react";
import StoryInfo from "../../util/story_info";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { findStory } from "../../actions/story_actions";
import { Link } from "react-router-dom";
import { Navigate } from "react-router";

const mSTP = (state) => ({
  stories: state.entities.stories,
  signedIn: state.session.isSignedIn
})

const mDTP = dispatch => ({
  findStory: (storyID) => dispatch(findStory(storyID))
})

const StoryInfoPage = props => {
  const {stories, findStory, signedIn} = props
  const {storyID} = useParams()

  useEffect(() => {
    if (!stories[storyID]) {
      findStory(storyID)
    }
  }, [stories, findStory, storyID])

  if (signedIn === false) {
    return(
      <Navigate to='/' />
    )
  }

  if (!stories[storyID]) {
    return null
  }

  return(
    <div className="wrapper" id='storyinfowrapper'>
        <div>
          {StoryInfo(stories[storyID])} 
          <Link to={`/story/${storyID}/write`}>
            {stories[storyID].codedStory.length === 0 ?
              <button id='start'>Start</button> : 
              <button id='continue'>Continue</button> }
            </Link>
        </div>
    </div>
  )
}

export default connect(mSTP, mDTP)(StoryInfoPage)
