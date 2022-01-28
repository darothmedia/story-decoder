import React, {useEffect} from "react";
import StoryInfo from "../../util/story_info";
import { connect } from "react-redux";
import { useParams } from "react-router";

const mSTP = (state, ownProps) => ({
  stories: state.entities.stories
})

const mDTP = dispatch => ({})

const StoryInfoPage = props => {
  const params = useParams()
  return(
    <div className="wrapper" id='storyinfowrapper'>
      {StoryInfo(props.stories[params.id])}
    </div>
  )
}

export default connect(mSTP, mDTP)(StoryInfoPage)
